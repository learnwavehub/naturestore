"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { ProductType, UserType } from "@/lib/types"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

const Wishlist = () => {
  const { user, isSignedIn, isLoaded } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<ProductType[]>([])

  const getUser = async () => {
    try {
      const res = await fetch("/api/users",{
        method:"GET",
        credentials:"include"
      })
      
      if (!res.ok) {
        if (res.status === 401) {
          console.log("User not authenticated")
          setSignedInUser(null)
          setWishlist([])
        } else {
          console.error("Failed to get user:", res.status)
        }
        setLoading(false)
        return
      }
      
      const data = await res.json()
      setSignedInUser(data)
    } catch (err) {
      console.log("[users_GET]", err)
      setSignedInUser(null)
      setWishlist([])
    } finally {
      setLoading(false)
    }
  }

  const getWishlistProducts = async () => {
    if (!signedInUser) {
      setWishlist([])
      return
    }

    // ✅ FIXED: Safe array access with optional chaining
    const wishlistArray = signedInUser?.wishlist as string[] || []

    // Handle empty wishlist
    if (wishlistArray.length === 0) {
      setWishlist([])
      return
    }

    try {
      const wishlistProducts = await Promise.all(
        wishlistArray.map(async (productId) => {
          const res = await getProductDetails(productId)
          return res
        })
      )

      // ✅ FIXED: Filter out any null/undefined products
      const validProducts = wishlistProducts.filter((product): product is ProductType => 
        product !== null && product !== undefined
      )
      
      setWishlist(validProducts)
    } catch (err) {
      console.log("[getWishlistProducts] Error:", err)
      setWishlist([])
    }
  }

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        getUser()
      } else {
        setSignedInUser(null)
        setWishlist([])
        setLoading(false)
      }
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }

  // Show loading while checking auth
  if (!isLoaded || loading) {
    return <Loader />
  }

  // Show message if not signed in
  if (!isSignedIn) {
    return (
      <div className="px-10 py-5">
        <p className="text-heading3-bold my-10">Your Wishlist</p>
        <p className="text-center text-gray-500">Please sign in to view your wishlist</p>
      </div>
    )
  }

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No items in your wishlist</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {wishlist.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              updateSignedInUser={updateSignedInUser} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const dynamic = "force-dynamic"

export default Wishlist
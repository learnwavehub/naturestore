"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { 
  CircleUserRound, 
  Menu, 
  Search, 
  ShoppingCart, 
  Phone, 
  Mail, 
  Home, 
  Layers, 
  Heart, 
  Package, 
  X,
  ChevronDown,
  MenuIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <>
      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 shadow-xl backdrop-blur-sm bg-opacity-95">
        
        {/* Top Row: Logo, Contact, Search, Cart */}
        <div className="py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="relative">
              <Image 
                src='/bestlogo.jpg' 
                alt="miona Tech Logo" 
                width={50} 
                height={50} 
                className="rounded-full object-cover border-2 border-white shadow-md" 
                priority
              />
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                ⚡
              </div>
            </div>
            <span className="hidden md:inline text-white font-bold text-xl">Miona autospares</span>
          </Link>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="tel:0700141499" 
              className="flex items-center gap-2 text-white hover:text-blue-100 transition-all duration-300 hover:scale-105 group"
            >
              <div className="p-2 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-blue-100">Call Us</span>
                <span className="font-semibold">0715 584 225</span>
              </div>
            </a>
            
            <a 
              href="mailto:naomygeorge08@gmail.com" 
              className="flex items-center gap-2 text-white hover:text-blue-100 transition-all duration-300 hover:scale-105 group"
            >
              <div className="p-2 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-blue-100">Email</span>
                <span className="font-semibold text-sm">Contact Us</span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                className="w-full pl-10 pr-12 py-3 border-2 border-transparent rounded-xl bg-white/90 backdrop-blur-sm shadow-sm focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none transition-all duration-300"
                placeholder="Search products, brands, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && query.trim() !== '') {
                    router.push(`/search/${query.trim()}`);
                  }
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Desktop Cart */}
            <Link
              href="/cart"
              className="hidden lg:flex items-center gap-3 bg-white text-blue-700 rounded-xl px-4 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 group relative"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cart.cartItems.length}
                  </span>
                )}
              </div>
              <span className="font-bold">Cart</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-3/4 transition-all duration-300"></div>
            </Link>

            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="lg:hidden relative p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cart.cartItems.length}
                </span>
              )}
            </Link>

            {/* Profile / Sign-in */}
            <div className="relative">
              {user ? (
                <div className="rounded-full overflow-hidden border-2 border-white hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <Link 
                  href="/sign-in"
                  className="flex items-center gap-2 bg-white/20 text-white hover:bg-white/30 px-3 py-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  <CircleUserRound className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
              onClick={() => setDropdownMenu(!dropdownMenu)}
              aria-label="Toggle menu"
            >
              {dropdownMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Row (for tablets and below) */}
        <div className="relative border-t border-blue-400/30 lg:hidden">
          {/* Left Scroll Button */}
          {showLeftScroll && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-700 text-white p-1 rounded-r-lg shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable Navigation */}
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-hide"
            onScroll={checkScroll}
          >
            <Link
              href="/"
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${pathname === "/" ? "bg-white text-blue-700 shadow-md" : "text-white hover:bg-blue-700 hover:shadow-md"}`}
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>

            <Link 
              href="/allcollections" 
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300 group"
            >
              <Layers className="h-4 w-4" />
              <span className="font-medium">Categories</span>
              <ChevronDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${pathname === "/wishlist" ? "bg-white text-blue-700 shadow-md" : "text-white hover:bg-blue-700 hover:shadow-md"}`}
            >
              <Heart className="h-4 w-4" />
              <span className="font-medium">Wishlist</span>
            </Link>

            <Link
              href={user ? "/orders" : "/sign-in"}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${pathname === "/orders" ? "bg-white text-blue-700 shadow-md" : "text-white hover:bg-blue-700 hover:shadow-md"}`}
            >
              <Package className="h-4 w-4" />
              <span className="font-medium">Orders</span>
            </Link>

            {/* Mobile Contact Items in Scroll */}
            <a 
              href="tel:0700141499" 
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">Call</span>
            </a>

            <a 
              href="mailto:kaceymwangi@gmail.com" 
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300"
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email</span>
            </a>
          </div>

          {/* Right Scroll Button */}
          {showRightScroll && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-700 text-white p-1 rounded-l-lg shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Desktop Navigation (Full Width) */}
        <div className="hidden lg:flex items-center justify-center gap-1 border-t border-blue-400/30 px-8 py-2">
          <Link
            href="/"
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${pathname === "/" ? "bg-white text-blue-700 shadow-md" : "text-white hover:bg-blue-700 hover:shadow-md"}`}
          >
            <Home className="h-4 w-4" />
            <span className="font-medium">Home</span>
          </Link>

          <Link 
            href="/allcollections" 
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300 group"
          >
            <Layers className="h-4 w-4" />
            <span className="font-medium">Categories</span>
            <ChevronDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href={user ? "/wishlist" : "/sign-in"}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${pathname === "/wishlist" ? "bg-white text-blue-700 shadow-md" : "text-white hover:bg-blue-700 hover:shadow-md"}`}
          >
            <Heart className="h-4 w-4" />
            <span className="font-medium">Wishlist</span>
          </Link>

          <Link
            href={user ? "/orders" : "/sign-in"}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${pathname === "/orders" ? "bg-white text-blue-700 shadow-md" : "text-white hover:bg-blue-700 hover:shadow-md"}`}
          >
            <Package className="h-4 w-4" />
            <span className="font-medium">Orders</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white hover:bg-blue-700 hover:shadow-md transition-all duration-300"
          >
            <span className="font-medium">All Products</span>
          </Link>

        
        </div>
      </nav>

      {/* Spacer div to prevent content from going under navbar */}
      <div className="h-28 lg:h-24"></div>

      {/* Mobile Dropdown Menu */}
      {dropdownMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-[10000] animate-in fade-in"
            onClick={() => setDropdownMenu(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-600 to-blue-800 shadow-2xl border-l border-blue-400 p-6 flex flex-col lg:hidden z-[10001] animate-in slide-in-from-right duration-300">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Image 
                  src='/bestlogo.jpg' 
                  alt="Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-full border-2 border-white"
                />
                <span className="text-white font-bold text-xl">Menu</span>
              </div>
              <button
                onClick={() => setDropdownMenu(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="mb-6 space-y-4">
              <a 
                href="tel:0700141499" 
                className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
                onClick={() => setDropdownMenu(false)}
              >
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-100">Call Us</p>
                  <p className="font-semibold">0715 584 225</p>
                </div>
              </a>
              
              <a 
                href="mailto:kaceymwangi@gmail.com" 
                className="flex items-center gap-3 p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
                onClick={() => setDropdownMenu(false)}
              >
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-100">Email</p>
                  <p className="font-semibold">naomygeorge08@gmail.com</p>
                </div>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 space-y-2">
              <Link
                href="/"
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${pathname === "/" ? "bg-white text-blue-700" : "text-white hover:bg-white/10"}`}
                onClick={() => setDropdownMenu(false)}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                href="/allcollections"
                className="flex items-center gap-3 p-4 rounded-xl text-white hover:bg-white/10 transition-all"
                onClick={() => setDropdownMenu(false)}
              >
                <Layers className="h-5 w-5" />
                <span className="font-medium">Categories</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Link>

              <Link
                href={user ? "/wishlist" : "/sign-in"}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${pathname === "/wishlist" ? "bg-white text-blue-700" : "text-white hover:bg-white/10"}`}
                onClick={() => setDropdownMenu(false)}
              >
                <Heart className="h-5 w-5" />
                <span className="font-medium">Wishlist</span>
              </Link>

              <Link
                href={user ? "/orders" : "/sign-in"}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${pathname === "/orders" ? "bg-white text-blue-700" : "text-white hover:bg-white/10"}`}
                onClick={() => setDropdownMenu(false)}
              >
                <Package className="h-5 w-5" />
                <span className="font-medium">Orders</span>
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all mt-4"
                onClick={() => setDropdownMenu(false)}
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.cartItems.length}
                    </span>
                  )}
                </div>
                <span className="font-medium">View Cart</span>
                <span className="ml-auto font-bold">{cart.cartItems.length} items</span>
              </Link>
            </div>

            {/* Sign In/Out */}
            <div className="pt-6 border-t border-white/20">
              {user ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <CircleUserRound className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{user.fullName}</p>
                    <p className="text-blue-200 text-sm">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-2 p-4 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                  onClick={() => setDropdownMenu(false)}
                >
                  <CircleUserRound className="h-5 w-5" />
                  Sign In to Your Account
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Paymentinfo from "@/components/Payment-details";

// ✅ Validation schemas using Zod
const billingDetailsSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  companyName: z.string().optional(),
  townCity: z.string().min(3, "Town/City is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  orderNotes: z.string().optional(),
});

const shippingDetailsSchema = z.object({
  shippingMethod: z.string().min(1, "Please select a shipping method"),
});

const mpesaPaymentSchema = z.object({
  mpesaName: z.string().min(1, "Mpesa Name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  transactionCode: z.string().min(1, "Transaction code is required"),
});

// ✅ Combine schemas
const checkoutSchema = billingDetailsSchema
  .merge(shippingDetailsSchema)
  .merge(mpesaPaymentSchema);

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  // ✅ useForm setup with Zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const shippingRates: { [key: string]: number } = {
    "Wells Fargo Nairobi": 320,
    "Wells Fargo Nairobi Outskirts": 330,
    "Matatu Courier Mt. Kenya Region": 250,
    "Ena Coach Western Kenya": 300,
    "Pick up from shop": 0,
    "Matatu Courier Eldoret": 250,
    "Super Metro Juja": 150,
    "Matatu Courier Coastal Region": 300,
  };

  const handleShippingMethodChange = (value: string) => {
    setValue("shippingMethod", value);
    setShippingCost(shippingRates[value] || 0);
  };

  const handleCheckout = async (checkoutData: CheckoutFormData) => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const payload = {
          customer,
          cartItems: cart.cartItems,
          billingDetails: {
            firstName: checkoutData.firstName,
            lastName: checkoutData.lastName,
            companyName: checkoutData.companyName,
            townCity: checkoutData.townCity,
            phoneNumber: checkoutData.phoneNumber,
            orderNotes: checkoutData.orderNotes,
          },
          shippingDetails: {
            shippingMethod: checkoutData.shippingMethod,
            shippingCost,
          },
          paymentDetails: {
            mpesaName: checkoutData.mpesaName,
            mobileNumber: checkoutData.mobileNumber,
            transactionCode: checkoutData.transactionCode,
          },
          totalAmount: totalRounded + shippingCost,
        };

        console.log("Data being sent to the backend:", payload);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.log("Checkout successful:", data);
          router.push("/payment_success");
        }
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    setIsSubmitting(true);
    await handleCheckout(data);
    setIsSubmitting(false);
  };

  const renderError = (fieldError: any) =>
    fieldError?.message ? (
      <span className="text-red-500 text-sm">{fieldError.message}</span>
    ) : null;

  const handleCheckoutClick = () => {
    if (!user) {
      router.push("sign-in");
    } else {
      setShowCheckoutForm(true);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      {/* 🛒 Cart Items Section */}
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">
                      ksh {cartItem.item.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className={`hover:text-red-1 cursor-pointer ${
                      cartItem.quantity <= 1
                        ? "text-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      cartItem.quantity > 1 &&
                      cart.decreaseQuantity(cartItem.item._id)
                    }
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 💰 Summary Section */}
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>
            ({cart.cartItems.length}{" "}
            {cart.cartItems.length > 1 ? "items" : "item"})
          </span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>ksh {totalRounded}</span>
        </div>

        <button
          className={`border rounded-lg text-body-bold py-3 w-full ${
            showCheckoutForm
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-white hover:bg-black hover:text-white"
          }`}
          onClick={handleCheckoutClick}
          disabled={showCheckoutForm}
        >
          {showCheckoutForm ? "place ordser" : "Proceed to Checkout"}
        </button>

        {/* 📞 Custom Order Info */}
        {showCheckoutForm && (
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">
              Call us to place your order:
            </p>
            <p className="text-2xl font-bold text-green-600">0715584225</p>
          </div>
        )}

        {/* The full form is commented out but ready for use */}
        {/* Uncomment to enable form checkout */}
      </div>
    </div>
  );
};

export default Cart;

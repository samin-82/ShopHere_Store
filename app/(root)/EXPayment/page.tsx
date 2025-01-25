"use client";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ExPayment = () => {
  // const { user:USER } = useUser();
  const router = useRouter();
  const user = {
    id: "user_2pkDIq3QnmsJtN8G0u7JzBMN5PA",
    emailAddress: "bang1smn1bang@gmail.com",
    fullName: "samin asgary",
  };
    // const user = {
    //   id: USER?.id,
    //   emailAddress: USER?.emailAddresses[0].emailAddress,
    //   // email: USER?.emailAddress,
    //   fullName: USER?.fullName,
    // };
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    // email: user?.emailAddresses[0].emailAddress,
    email: user?.emailAddress,
    name: user?.fullName,
  };

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(cart.cartItems);
    const shippingAddress = {
      street,
      city,
      state,
      postalCode,
      country,
    };

    const orderItems = cart.cartItems?.map((item: any) => {
      return {
        product: item.item.id,
        color: item.color || "N/A",
        size: item.size || "N/A",
        quantity: item.quantity,
      };
    });
    console.log("orderItemsNNNNEEW");
    console.log(orderItems);

    ///////////////////

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/EXPayment`, {
        // mode: "no-cors",

        method: "POST",
        body: JSON.stringify({ orderItems, shippingAddress, customer, total }),
        // body: JSON.stringify({ customer:'samin',cartItems:'banana' }),
      });
      if (res.ok) {
        console.log("posted successfuly");
        // setLoading(false);
        toast.success(" order created");
        window.location.href = "/payment_success"; //make sure data is updated
        router.push("/payment_success");
      }
      // const data = await res.json();
      // console.log(data);
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
    ////////////////////

    // alert(`The name you entered was: ${name}`);
  };

  // const shippingAddress = {
  //   street: session?.shipping_details?.address?.line1,
  //   city: session?.shipping_details?.address?.city,
  //   state: session?.shipping_details?.address?.state,
  //   postalCode: session?.shipping_details?.address?.postal_code,
  //   country: session?.shipping_details?.address?.country,
  // };
  return (
    <div>
      <div>
        <div>{customer.clerkId}</div>
        <div>{customer.name}</div>
        <div>{customer.email}</div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-10 flex flex-col gap-3 items-start"
      >
        <label>
          Enter your street:
          <input
            className="ml-2 border-2 border-black border-spacing-2 "
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </label>
        <label>
          Enter your city:
          <input
            className="ml-2 border-2 border-black border-spacing-2 "
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Enter your state:
          <input
            className="ml-2 border-2 border-black border-spacing-2 "
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Enter your postalCode:
          <input
            className="ml-2 border-2 border-black border-spacing-2 "
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </label>
        <label>
          Enter your country:
          <input
            className="ml-2 border-2 border-black border-spacing-2 "
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-300 px-20 rounded-xl"
        >
          PAY
        </button>
      </form>
    </div>
  );
};

export default ExPayment;

'use client'

import { useEffect } from "react";
import Checkout from "../Checkout/page";
import { convertToSubcurrency } from "../helpers";
import useGetEventDetails from "../hooks/useGetEventDetails";
import useGetVenueDetails from "../hooks/useGetVenueDetails";
import getStripe from "../stripe/get-stripe";
import { queryObj } from "../types";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";



export default function Payment(queryObj : queryObj) {

    if(!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY){
        throw Error("Missing stripe publishable name");
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    const { venueDetails } = useGetVenueDetails(queryObj.searchParams.venueId);

    if(venueDetails){
        console.log('ven details', venueDetails);
    }

    return(
        <Elements 
        stripe={stripePromise}
        options={{
            mode: 'payment',
            amount: convertToSubcurrency(41.00),
            currency: 'usd'
        }}>
            <Checkout amount={100}/>
        </Elements>
    )
}
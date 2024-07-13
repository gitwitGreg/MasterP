'use client'

import { useEffect } from "react";
import Checkout from "../Checkout/page";
import { convertToSubcurrency } from "../helpers";
import getStripe from "../stripe/get-stripe";
import { queryObj } from "../types";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";



if(!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY){
    throw Error("Missing stripe publishable name");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function Payment(queryObj : queryObj) {

    useEffect(() => {

        const logStripe = async () => {

            try {

                const stripe = await stripePromise;

                console.log('Stripe Object:', stripe);

            } catch (error) {

                console.error('Error loading Stripe:', error);

            }

        };

        logStripe();
        
    }, [stripePromise]);

    return(
        <section className="h-auto w-full p-10 tiems-center flex justify-center">
            <Elements 
            stripe={stripePromise}
            options={{
                mode:  'payment',
                amount: convertToSubcurrency(10.00),
                currency: 'usd',
                
            }}>
                <Checkout amount={100} eventId={queryObj.searchParams.eventId}/>
            </Elements>
        </section>
    )
}
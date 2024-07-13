'use client'

import React, { useEffect, useState} from "react"

import {
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js'

import { convertToSubcurrency } from "../helpers"
import { error } from "console";
import Button from "@mui/material/Button";
import { TailSpin } from "react-loader-spinner";

export default function Checkout({amount, eventId}: {amount: number, eventId: string}) {

    console.log('from q obj: ', eventId);

    const stripe = useStripe();

    const elements = useElements();

    const [err, setErr] = useState<string>();

    const [clientSecret, setClientsecret] = useState('');


    const [loading, setLoading] = useState(false);

    const makePaymentIntent = async() => {

        try{

            const response = await fetch('/api/payment', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
    
                body: JSON.stringify({
                    amount: convertToSubcurrency(amount)
                })
            })

            if(!response.ok){
                const error = await response.json();

                console.log(error);

                return;
            }

            const resObj = await response.json();

            setClientsecret(resObj.clientSecret);

        }catch(error){

            console.log(error);

        }

    }

    useEffect(() => {

        makePaymentIntent()

    },[])

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try{

            if(!stripe || !elements){
                return;
            }
    
            setLoading(true);

    
            const {error: submitError } = await elements.submit();

            console.log(submitError?.message);


            if(submitError){

                setErr(submitError.message);

                setLoading(false);

                return;
            }


            const {error: confirmError} = await stripe.confirmPayment({

                elements,

                clientSecret,

                confirmParams: {

                    return_url: `http://www.localhost:3000/Review?amount=${amount}&eventId=${eventId}`
                }

            });

            if(confirmError){

                console.log('confirm error: ', confirmError?.message);

                console.log('error confirming order');

                setErr(confirmError.message);

            }else{

                setLoading(false);

            }

        }catch(error){

            console.log(error);

            setErr('There was a problem with the payment. Please try again');

        }
    }


    if(!stripe || !elements || !clientSecret){

        return (
            
            <div className="h-screen w-full items-center flex justify-center">

                <TailSpin
                height="200"
                width="200"
                color="orange"
                ariaLabel="loading"
                />

            </div>

        )

    }

    return (

        <form 
        className="w-full bg-black p-14 p-auto overflow-y-auto rounded-xl flex flex-col gap-6 text-black"
        onSubmit={handleSubmit}>

            {clientSecret && <PaymentElement/>}

            <Button
            disabled={!stripe || loading} 
            type="submit"
            style={{background: 'white'}}>
                {!loading? `pay $${amount}` : 'Proccessing'}
            </Button>

        </form>

    )
}
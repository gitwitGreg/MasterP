'use client'

import { useEffect, useState} from "react"

import {
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js'

import { convertToSubcurrency } from "../helpers"

export default function Checkout({amount}: {amount: number}) {

    const stripe = useStripe();

    const elements = useElements();

    const [err, setErr] = useState<string>();

    const [clientSecret, setClientsecret] = useState('');

    const [loading, setIsLoading] = useState(false);

    const makePaymentIntent = async() => {

        try{

            const response = await fetch('/api/payment', {

                headers: {
                    'Content-Type': 'application/json'
                },
    
                body: JSON.stringify(/**amount*/ 1)
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

    },[/**amount */])

    return (
        <form>
            {clientSecret && <PaymentElement/>}
        </form>
    )
}
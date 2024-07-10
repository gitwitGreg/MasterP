'use client'

import { useEffect, useState} from "react"

import {
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js'

import { convertToSubcurrency } from "../helpers"

export default function Checkout({amount}: {amount: number}) {

    console.log(amount);

    const stripe = useStripe();

    const elements = useElements();

    const [err, setErr] = useState<string>();

    const [clientSecret, setClientsecret] = useState('');

    const [loading, setIsLoading] = useState(false);

    const makePaymentIntent = async() => {

        console.log("making api call");

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

                console.log('we had a problem!!!!');

                console.log(error);

                return;
            }

            const resObj = await response.json();

            console.log('we made it to success block')

            setClientsecret(resObj.clientSecret);

        }catch(error){

            console.log(error);

        }

    }

    useEffect(() => {

        console.log("tryint to make payment internt");

        makePaymentIntent()

    },[/**amount */])

    return (
        <form>
            {clientSecret && <PaymentElement />}
        </form>
    )
}
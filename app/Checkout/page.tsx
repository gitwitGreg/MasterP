import React, { useEffect} from "react"
import { checkoutObj } from "../types";
import CheckComp from "../components/CheckComp";



export default function Checkout({amount, eventId} : checkoutObj) {
    

    return (

        <CheckComp 
        amount={amount}
        eventId={eventId}
        />

    )
}
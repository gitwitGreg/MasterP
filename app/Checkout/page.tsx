import React, { useEffect} from "react"
import { checkoutObj } from "../types";
import CheckComp from "../components/CheckComp";



interface CheckoutProps {
    checkoutObj: checkoutObj
}



export default function Checkout( {checkoutObj} : CheckoutProps) {
    

    return (

        <CheckComp 
        amount={checkoutObj.amount}
        eventId={checkoutObj.eventId}
        />

    )
}
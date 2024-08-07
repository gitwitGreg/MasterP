'use client'
import React, { useEffect} from "react"
import CheckComp from "../components/CheckComp";
import { useSearchParams } from 'next/navigation'
import { TailSpin } from "react-loader-spinner";

export default function Checkout() {

    const search = useSearchParams();

    const eventId = search.get('eventId');

    const amount = Number(search.get('amount'));
    


    if(!amount || !eventId){
        
        return( 
            <div className="h-screen w-full items-center flex justify-center">

            <TailSpin height="200" width="200" ariaLabel="loading" />
    
          </div>
        )

    }


    return (
    

        <CheckComp 
        amount={amount}
        eventId={eventId}
        />

    )
    
}
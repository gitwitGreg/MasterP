'use client'

import { useState, useEffect } from "react"

export default function useGetVenueDetails(venueId: string) {

    const [venueDetails, setvenueDetails] = useState();

    const fetchVenueDetails = async() => {
    
        try{ 

            const response = await fetch('/api/fetchVenueDetails', {

                method: 'POST',

                headers: {
                    'Content-Type' : 'application/json'
                },

                body: JSON.stringify(venueId)

            });

            if(!response.ok){

                const errorObj: {error: {cause: string}} = await response.json();

                console.log(errorObj.error.cause);

                return;

            }

            const eventObj = await response.json();

            setvenueDetails(eventObj);

        }catch(error){

            console.log(error);

        }

    }

    useEffect(() => {
        fetchVenueDetails();
    },[venueId])

    return{venueDetails}

}
'use client'

import useGetVenueDetails from "../hooks/useGetVenueDetails";
import { queryObj } from "../types";



export default function Payment(queryObj : queryObj) {

    const { venueDetails } = useGetVenueDetails(queryObj.searchParams.venueId);

    if(venueDetails){
        console.log('ven details', venueDetails);
    }

    return(
        <div>
            Heyy
        </div>
    )
}
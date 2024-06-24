'use client'

import useGetVenueDetails from "../hooks/useGetVenueDetails";
import { queryObj } from "../types";



export default function Payment(queryObj : queryObj) {

    const { venueDetails } = useGetVenueDetails(queryObj.searchParams.venueId);

    return(
        <div>
            Heyy
        </div>
    )
}
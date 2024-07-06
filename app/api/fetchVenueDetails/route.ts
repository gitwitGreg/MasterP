import { NextResponse, NextRequest } from "next/server";

/**
 * 
 * @param req string object with event id
 * @returns  - json object with event details
 */

export async function POST (req: NextRequest) {

    /** Convert request to json */
    const body = await req.json();

    /** Get api key */
    const key = process.env.TICKET_MASTER_CONSUMER_KEY;

    try{ 

        /** Make api call to venue endpoint */
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/venues/${body}.json?apikey=${key}`);

        /** Handle bad requests */
        if(!response.ok){

            const error = await response.json();

            console.log(error.detail);

            return NextResponse.json({error: error.detail});
        }

        /** Convert resposne to json object */
        const venueDetails = await response.json();

        /** Return object */
        return NextResponse.json(venueDetails);

    }catch(error){
        /** Handle any errors */
        return NextResponse.json({error: error});

    }

}
import { NextResponse, NextRequest } from "next/server";

/**
 * 
 * @param req string of event id
 * @returns json object with event details
 */

export async function POST (req: NextRequest) {

    /** Convert request to json */
    const body = await req.json();

    /** Get api key */
    const key = process.env.TICKET_MASTER_CONSUMER_KEY

    try{

        /** Make api call to event details end point */
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${body}.json?apikey=${key}`);

        /** Handle request errors */
        if(!response.ok){

            const error = await response.json();

            console.log(error);

            return NextResponse.json({error: error, status: 500});

        }

        /** Conveert endpoint response to json */
        const eventDetails = await response.json();

        /** Return results to client */
        return NextResponse.json(eventDetails);

    }catch(error){

        /** Handle any errors */
        console.log(error);

        return NextResponse.json({error: error})
    }

}
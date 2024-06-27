import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req string of user search input
 * @returns - array of events in json format
 */

export async function POST(req: NextRequest){

    const body = await req.json();

    const key = process.env.TICKET_MASTER_CONSUMER_KEY

    try{

        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${body}&apikey=${key}`);

        if(!response.ok){

            const error = await response.json();

            console.log(error);
        }

        const respObj = await response.json();

        const events = respObj._embedded.events;


        return NextResponse.redirect()

    }catch(error){

        console.log(error);

        return NextResponse.json({error: error});
    }

}
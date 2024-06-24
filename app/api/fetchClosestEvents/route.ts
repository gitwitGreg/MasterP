import { NextResponse, NextRequest } from "next/server";

/**
 * 
 * @param req strinigified object with latitude and longitude
 * @returns array of ticket master events
 */

export async function POST (req: NextRequest) {

    /** Convert request to json object */
    const body: {lat:number, lng: number} = await req.json();

    /** Get api key */
    const key = process.env.TICKET_MASTER_CONSUMER_KEY;

    try{

        /** Construct uri for api call */
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&latlong=${body.lat},${body.lng}`,{
            method: 'GET',

            headers: {
                'Content-Type': 'application/json'
            },
        })

        /** Handle any errors from apic call */
        if(!response.ok){

            const error = await response.json();

            console.log(error);

            return NextResponse.json({error: error, status: 500});

        }

        /** Convert respons to json object */
        const eventsObj = await response.json();

        /** Access eventd proprety form event object */
        const events = eventsObj._embedded

        return NextResponse.json(events);


    }catch(error){

        /** Handle erros that occur */
        console.log(error);

        return NextResponse.json({error: error},{status: 500});
    }
}
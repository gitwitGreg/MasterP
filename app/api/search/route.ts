import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param req string of user search input
 * @returns - array of events in json format
 */

export async function POST(req: NextRequest){

    /** Convert request to json*/
    const body = await req.json();

    /** Get api key */
    const key = process.env.TICKET_MASTER_CONSUMER_KEY

    try{

        /** Construct uri for api call */
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${body}&apikey=${key}`);

        /** Handle instances where search is invalid */
        if(!response.ok){

            const error = await response.json();

            console.log(error);

            return NextResponse.json({error: error})
        }

        /** Convert response to json */
        const respObj = await response.json();

        /** Handle cases where there is no event list */
        if(!respObj._embedded){

            console.log('missing embedded info')

            return NextResponse.json({error: 'missing embedded info'});
        }

        /** Acess events of response */
        const events = respObj._embedded.events;

        /** Return array of events */
        return NextResponse.json(events);

    }catch(error){

        /** Hadle any errors */

        return NextResponse.json({error: error});
    }

}
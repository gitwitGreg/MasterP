import { NextResponse } from "next/server";

/**
 * 
 * @returns json object with 
 */


export async function GET() {

    /** Get api key */
    const key = process.env.TICKET_MASTER_CONSUMER_KEY;

    try{

        /*** Construct uri for api call */
        const response = await 
        fetch(`http://app.ticketmaster.com/discovery/v2/suggest.json?&apikey=${key}`);
    
        /** Handle bad responses from api */
        if(!response.ok){
    
            return NextResponse.json(

                {error: 'internal error finding treding events'},

                {status: 400}

            )
        
        } 
    
        /** Convert response to json */
        const resObj = await response.json();

        /** Return json object */
        return NextResponse.json(resObj);

    }catch(error){

        /** Handle any errors */
        return NextResponse.json({error: error});

    }     

}
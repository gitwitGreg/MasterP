import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connectToDb } from "@/app/mongo";

/**
 * 
 * @param req -Stringified object with event id client secret and cost of event
 * @returns json object with success message and status
 */

export async function POST(req: NextRequest) {

    console.log('api pahgeefdknslkanf')

    /** Convert request to json */
    const body = await req.json();

    /** Deconstruct needed propreties  */
    const { eventId, clientSecret, amount } = body;

    console.log(eventId, clientSecret, amount);

    /** Connect to database */
    await connectToDb();

    /** Create new prisma instance */
    const prisma = new PrismaClient;

    try{

        const duplicate = await prisma.purchasedEvent.findFirst({

            where: {

                eventId: eventId,

                stipeClientSecret: clientSecret,

                amount: Number(amount)


            }
        });
        
        /** Handle duplication if user reloads review page */
        if(duplicate){

            return NextResponse.json({
                message: 'duplicate found in database'
            });

        }

        /** Create new purchase event document with provided feilds */
        const purchasedEvent = await prisma.purchasedEvent.create({

            data : {

                eventId: eventId,

                stipeClientSecret: clientSecret,

                amount: Number(amount)

            }

        });

        /** Handle any saving errors */
        if(!purchasedEvent){

            console.log('Error while trying to save purchased event');

            return NextResponse.json({error: 'Error while trying to save purchased event'}, {status: 401})

        }

        /** Return success object to client */
        return NextResponse.json({message: 'Purchased event saved'}, {status: 201});

    }catch(error){

        /** Handle any errors */
        console.log(error);

        return NextResponse.json({error: error}, {status: 400});

    }

}
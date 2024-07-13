import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/app/mongo";
import { PrismaClient } from '@prisma/client'
import { currentUser } from "@clerk/nextjs/server";


/**
 * 
 * @param req - stringified object of event details
 * @returns  json object with success message
 */

export async function POST (req: NextRequest) {

    /** Convert request to json */
    const body = await req.json();

    /** Get current user id */
    const user = await currentUser();

    if(!user){

        console.log('missing user');

        return NextResponse.json({error: 'Missing user ID'})
    }

    const userId = user.id

    /** Deconstrunct from body */
    const { eventId, name, date, address, promoter, venue, isBeingFavorited } = body;

    /** Connect to database */
    await connectToDb();

    /** Create prisma instance */
    const prisma = new PrismaClient;

    /** Wait for prisma connection */
    await  prisma.$connect();    

    try{

        /** Check if event is already saved in database */
        const exsistingEvent = await prisma.favoritedEvent.findFirst({
            where: {
                eventId: eventId
            }
        });

        /** If event exsist remove event */
        if(exsistingEvent){

            const deleted = await prisma.favoritedEvent.delete({
                where: {
                    id: exsistingEvent.id
                }
            });

            if(!deleted){
                return NextResponse.json({message: 'Error removing event'})
            }

            return NextResponse.json({message: 'Event Removed from favorites'});
            
        }
        
        /** Create new event in database */
        const savedEvent = await prisma.favoritedEvent.create({
            data : {
                eventId: eventId,
                name: name,
                date: date,
                promoter: promoter,
                address: address,
                venue: venue,
                userId: userId
            }
        })
    
        /** If error storing return error object */
        if(!savedEvent){
    
            console.log('error storing event in database');
    
            return NextResponse.json({message: 'Error storing event in database'});
        }

        console.log('event stored');

        /** Return resource created status code on success */
        return NextResponse.json({message: 'Event saved', isAlreadySaved: false});

    }catch(error){

        /** Handle any errors */

        console.log(error);

        return NextResponse.json({message: error});

    }


}
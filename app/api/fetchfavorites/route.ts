import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connectToDb } from "@/app/mongo";
import { currentUser } from "@clerk/nextjs/server";


export async function GET () {

    /** Get current user */
    const user = await currentUser();

    /** Connect to database */
    await connectToDb();

    /** return error if problem finding user */
    if(!user){

        console.log('Error finding user');
        
        return NextResponse.json({error: 'Error finding user'})

    }

    /** Get user Id */
    const userId = user.id;

    /** Create a new prisma instance */
    const prisma = new PrismaClient;

    try{

        /** Query for user's favorite events */
        const favoritedEvents = await prisma.favoritedEvent.findMany({
            where: {
                userId: userId
            }
        });

        /** Return Empty array if user has no favorite events */
        if(!favoritedEvents){

            return NextResponse.json([]);

        }2

        /** Return array of favorite events */
        return NextResponse.json(favoritedEvents)

    }catch(error){

        /** Handle any errors */
        console.log(error);

        return NextResponse.json({error: error})

    }
}
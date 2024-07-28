import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * 
 * @returns Array of purchased events
 */

export async function GET () {

    /** Find current user */
    const user = await currentUser();

    /** Handle any errors while finding user */
    if(!user){
        return NextResponse.json({error: 'Error finding user'});
    }

    try{

        /** Create prisma instance */
        const prisma = new PrismaClient();

        /** Find all events the user has purchased */
        const purchsedEvents = await prisma.purchasedEvent.findMany({
            where: {
                user: user.id
            }
        });

        /** Return empty array if user has no events purchased */
        if(!purchsedEvents){
            return NextResponse.json([]);
        }
        

        /** Return users purchased events */
        return NextResponse.json(purchsedEvents);

    }catch(error){

        /** Handle any erros */
        console.log(error);

    }

}
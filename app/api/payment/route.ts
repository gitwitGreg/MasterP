import { NextResponse, NextRequest } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * 
 * @param req -stringified object with payment amount
 * @returns string with the stripe client secret
 */

export async function POST (req: NextRequest) {

    try{

        /** Convert request to json */
        const { amount } = await req.json();

        /** Create payment intent isntance */
        const paymentIntent = await stripe.paymentIntents.create({

            amount: amount,

            currency: 'usd',

            automatic_payment_methods: {enabled: true},

        });

        /** Return client secret */
        return NextResponse.json({clientSecret: paymentIntent.client_secret});

    }catch(error){

        /** Handle any errors */
        return NextResponse.json(

            {error: `Internal server error: ${error}`},

            {status: 500}

        );

    }

}




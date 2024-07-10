import { NextResponse, NextRequest } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST (req: NextRequest) {

    try{

        console.log('made it to api');

        const { amount } = await req.json();

        console.log(amount);

        const paymentIntent = await stripe.paymentIntents.create({

            amount: amount,

            currency: 'usd',

            automatic_payment_methods: {enabled: true},

        });

        return NextResponse.json({clientSecret: paymentIntent});

    }catch(error){

        console.log('Internal server error: ', error);

        return NextResponse.json(

            {error: `Internal server error: ${error}`},

            {status: 500}

        );

    }

}




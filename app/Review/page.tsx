'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useUser } from '@clerk/nextjs';
import useGetEventDetails from '../hooks/useGetEventDetails';
import { TailSpin } from 'react-loader-spinner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Review() {

  const [savedInDb, setSavedInDb] = useState<boolean>(false);

  const search = useSearchParams();

  const amount = search.get('amount');

  const eventId = search.get('eventId');

  const { eventDetails } = useGetEventDetails(eventId as string);

  const clientSecret = search.get('payment_intent_client_secret');

  const user = useUser().user;

  const saveToDb = async (eventId: string) => {

    if(!eventDetails){

      console.log('Missing event details');

      return;

    }

    try {

      const response = await fetch('/api/savePuchasedEvent', {

        method: 'POST',

        headers: {
        'Content-Type': 'application/json',
        },

        body: JSON.stringify({

          eventId: eventId,

          clientSecret: clientSecret,

          amount: amount,

          name: eventDetails.name,

          price: eventDetails.priceRanges[0].max,

          location: eventDetails._embedded.venues[0].address.line1,

          date: eventDetails.dates.start.localDate

          }),

        });

        if (!response.ok) {

          const error: { message: string } = await response.json();

          console.log(error);

          return;
          
        }

        const resObj = await response.json();

        console.log('setting to true after saving');

        setSavedInDb(true);

        return;

    } catch (error) {

      console.log(error);

      return;
    }

  };

  useEffect(() => {

    if(!savedInDb && eventDetails){

      saveToDb(eventId as string);

    }
    
  },[eventDetails]);

  if (!eventDetails) {

    return (

      <div className="h-screen w-full items-center flex justify-center">

        <TailSpin height="200" width="200" ariaLabel="loading" />

      </div>

    );

  }

  return (

    <div className="bg-black h-screen w-full flex flex-col justify-center p-10">

      <div className="bg-white h-full p-10 rounded-xl w-full flex flex-col items-center">

        <h1 className="text-4xl flex gap-2 font-sans">

          <p className="text-4xl underline underline-offset-4">Order </p>{' '}

          successful

        </h1>

        <div className="bg-green-400 text-white h-auto w-full gap-5 mt-4 rounded-xl p-5 flex items-center flex-col border-black border-2">

          <p>

            {' '}

            Thank you for your purhase <CheckIcon className="text-white" />

          </p>

          <p> You can find your order details under you upcomming events tab</p>

        </div>

        <div className="bg-black text-white h-auto w-full gap-5 mt-4 rounded-xl p-5">

          <div className="flex items-center justify-center">

            <h1 className="text-2xl font-sans">Purchase details</h1>

          </div>

          <div className='flex flex-col gap-3'>

                <p> Ticket owner: {user?.fullName}</p>

                <p>Price: ${amount}</p>

                <p>Event Name: {eventDetails.name}</p>

                <p> Event Date: {eventDetails.dates.start.localDate || 'No start date yet'}</p>

                <p> Location: {eventDetails._embedded.venues[0].address.line1}</p>

          </div>

          <div className='flex h-auto w-full justify-between mt-10'>

            <Link href='/'>

                <Button className='bg-blue-600 rounded-xl'>

                    Home

                </Button>

            </Link>

            <Link href='/activeEvents'>

                <Button className='bg-red-600 rounded-xl text-black'>

                    Events

                </Button>
                
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

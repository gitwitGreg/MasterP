'use client'

import React, { useEffect, useState } from 'react'
import { Event, FavoritedEvent, FavoritedInfo } from '../types'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeIcon from '@mui/icons-material/NearMe';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import useGetFavoriteEvents from '../hooks/useGetFavoriteEvents';
import { convertTime } from '../helpers';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import useGetSeatMap from '../hooks/useGetSeatMap';
import { useToast } from '@/components/ui/use-toast';
import SellIcon from '@mui/icons-material/Sell';

const EventDetails = ({event}: {event: Event}) => {

    console.log(event);

    const { isFavorited }: FavoritedInfo = useGetFavoriteEvents(event.id);

    const [isFavorite, setIsFavorite] = useState<boolean | undefined>(isFavorited);

    const [err, setErr] = useState();

    const { seatmap } = useGetSeatMap(event.seatmap.staticUrl);

    const { toast } = useToast()


    useEffect(() => {
        setIsFavorite(isFavorited);
    },[isFavorited]);

    const unfavoriteEvent = async(event: FavoritedEvent | undefined) => {

        if(isFavorite){

            const response = await fetch('/api/storeFavoriteEvent', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(event)
            })

            if(!response.ok){

                const errorObj: {message: string} = await response.json();

                console.log(errorObj);

                if(errorObj.message === 'Event already saved'){

                    setIsFavorite(false);

                    console.log('unsaved');
                }

            }

            toast({

                variant: "destructive",

                title: "Event removed from favorites",

                description: 'Event successfully removed from favorites'

            })

            setIsFavorite(false);

        }
    }


    const faviorateEvent = async(event: FavoritedEvent | undefined) => {

        if(!event){

            console.log('missing event details after clicking favorite button');

            return;
        }

        if(isFavorite){

            await unfavoriteEvent(event);

            return;

        }

        try{

            const favObj = {
                ...event, 
                isBeingFavorited: true,
            }

            const response = await fetch('/api/storeFavoriteEvent', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(favObj)

            });

            if(!response.ok){

                const errorObj: {error: string} = await response.json();

                console.log(errorObj.error);

                return;
            }

            const respObj = await response.json();

            toast({

                variant: "default",

                title: 'Event added to favorites',

                description: 'Event successfully added to favorites'

            })

            setIsFavorite(true);

        }catch(error){

            console.log(error);

        }

    }

  return (

    <div className='w-full h-screen flex flex-col gap-2'>

        <div style={{ backgroundImage: `url(${event.images[0].url})` }} className='h-[40%] w-full p-16'>

            <p className='mb-4 text-sm text-white'>Home/Event/{event.name}</p>

            <div className='flex gap-4 w-auto h-auto'>

                <img src={event.images[1].url} className='h-[150px] w-[300px] object-fit' />

                <div className='flex flex-col gap-5 w-auto h-auto'>

                    <h1 className='text-2xl font-bold text-white mt-4 font-mono'>

                        {event.name}

                    </h1>

                    <div className='text-2xl'>

                        {isFavorite!= undefined && (
                            <button onClick={ () => faviorateEvent({
                                eventId: event.id,
                                name: event.name,
                                date: event.dates.start.localDate,
                                venue: event.name,
                                promoter: event.promoter.name,
                                address: event._embedded.venues[0].address.line1,
                            })}>
    
                                <FavoriteBorderIcon className={isFavorite? `'text-2xl cursor-pointer text-red-500`: `'text-2xl cursor-pointer text-white`}/>
    
                            </button>
                        )}

                    </div>

                </div>

            </div>
        
        </div>

        <div className='w-full h-[70px] shadow p-4 gap-10 flex items-center'>

            <p className='text-black text underline text-xl cursor-pointer'> Event</p>


        </div>

        <div className='h-screen w-full bg-gray-50 p-5 flex flex-col gap-8'>

            <h1 className='text-2xl font-bold text-black mt-4'>Events</h1>

            <h1>{}</h1>

            <div className='w-[70%] h-auto p-3 gap-2 bg-white border-gray-50 border rounded-md'>

                <div className='border p-4 flex gap-10 w-auto'>

                    <NearMeIcon />

                    <p>{event._embedded.venues[0].name}</p>

                </div>

                <div className='border p-4 flex gap-10 bg-white'>

                    <CalendarMonthIcon />

                    <div className='flex gap-4 flex-col'>

                        <div className='flex gap-2'>

                            <p>{event.dates.start.localDate}</p>

                            <p>{convertTime(event.dates.start.localTime)}</p>

                            <ErrorOutlineIcon />

                        </div>

                        <p className='font-bold'>{event.dates.timezone}</p>

                        <p className='text-gray-500'>{event.name}</p>

                    </div>
                    
                </div>

            </div>

            <div className='w-[90%] h-auto p-3 gap-2 bg-white border-gray-50 border rounded-md flex'>

                <div className='border flex  justify-between w-full p-5'>

                    <div className='flex gap-4'>
                        
                        <NearMeIcon />

                        <p>{event._embedded.venues[0].name}</p>

                    </div>

                    <div className='w-auto'>

                        <Link href={{

                            pathname: '/Payment',

                            query: {

                                eventId: event.id,

                                venueId: event._embedded.venues[0].id,

                            }

                        }}>
                            <ShoppingCartIcon />

                        </Link>

                    </div>

                </div>

                <div className='border p-4 flex gap-10 w-full items-center justify-center'>

                    <SellIcon/>

                    <p>${event.priceRanges[0].min} - ${event.priceRanges[0].max}</p>

                </div>

            </div>

            <div className=' bg-white w-full h-auto p-5 gap-5 flex flex-col overflow-scroll'>
                {event.products.map((varitation) => (
                    <Link href={varitation.url} key={varitation.id}>
                        <div className='w-full h-auto border p-5 flex flex-col' >
                            <p className='font-bold'>{varitation.name}</p>
                            <p className='text-gray-500'>{varitation.type}</p>
                            <p> Provider: Live nation</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>

        {seatmap && (
                    <div className='w-full h-auto bg-white p-5 border border-gray-200 rounded-md'>
                        <h2 className='text-xl font-bold mb-4'>Seat Map</h2>
                        <div className='flex justify-center'>
                            <img src={seatmap} alt='Seat Map' className='max-w-full h-auto' />
                        </div>
                    </div>
        )}

    </div>

  )

}

export default EventDetails

'use client'

import React, { useEffect, useState } from 'react'
import useFetchSuggested from '../hooks/useFetchSuggested';
import { TailSpin } from 'react-loader-spinner';
import { Button } from '@mui/material';
import Link from 'next/link';
import Favorites from './Favorites';

const Trending = () => {

    const { suggested } = useFetchSuggested();

    const [ranNum, setRanNum] = useState<number>();

    const getRanNum = () => {
      setRanNum((Math.floor(Math.random() * 4) + 1));
    }

    useEffect(() => {
        getRanNum();
    },[])

    if(!ranNum || !suggested){

        return(
            
            <div className="h-screen w-full items-center flex justify-center">

                <TailSpin
                height="200"
                width="200"
                color="orange"
                ariaLabel="loading"
                />

            </div>
        )
    }

  return (
    <div className="w-full h-auto gap-7 flex flex-col">
      <div
        style={{
          backgroundImage: `url(${
            suggested._embedded.events[1].images[0].url || ''
          })`,
        }}
        className="p-20 bg-cover bg-no-repeat"
      >
        <div className="flex flex-col mt-32 gap-3 ml-[-40px]">
          <h1 className="text-white text-xl font-sans font-bold">
            {suggested._embedded.attractions[3].name}
          </h1>
          <Link
            href={{
              pathname: 'Event',
              query: {
                eventId: suggested._embedded.events[1].id,
              },
            }}
          >
            <Button className="bg-blue-700 text-white h-[50px] w-[20%] font-bold ease-in hover:bg-blue-800">
              Find Tickets
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex p-16 w-full gap-10">

        <div className="grid gap-10 grid-cols-2 w-[80%]">

          {suggested._embedded.attractions.slice(0,4).map((attraction) => (

            <div className="relative flex flex-col gap-4 hover:underline underline-offset-2" key={attraction.id}>

              <div className="relative">

                    <img
                    src={attraction.images[0].url}
                    height={300}
                    width={900}
                    alt="Attraction image"
                    className="relative h-[300px] w-[900px] object-cover"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity hover: cursor-pointer"></div>

                </div>

                <h1 className='text-xl antialiased font-semibold'>{attraction.name}</h1>

            </div>

            ))}

            </div>

            <Favorites />

        </div>

        <hr className='w-[90%] p-10 mx-10'></hr>

    </div>

  );

}

export default Trending

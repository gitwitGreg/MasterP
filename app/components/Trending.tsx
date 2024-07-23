'use client'

import React, { useEffect, useState } from 'react'
import useFetchSuggested from '../hooks/useFetchSuggested';
import { TailSpin } from 'react-loader-spinner';
import { Button } from '@mui/material';
import Link from 'next/link';

const Trending = () => {

    const { suggested } = useFetchSuggested();

    const [ranNum, setRanNum] = useState<number>();

    const getRanNum = () => {
      setRanNum((Math.floor(Math.random() * 4) + 1));
    }

    useEffect(() => {
        getRanNum();
    },[])

    console.log(suggested);

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
    <div className='w-full h-auto gap-7 flex flex-col'>

      <div style={{
          backgroundImage: `url(${suggested._embedded.events[1].images[0].url || ''})`
        }}
        className="p-20 bg-cover bg-no-repeat">
            <div className='flex flex-col mt-32 gap-3 ml-[-40px]'>
                <h1 className='text-white text-xl font-sans font-bold'>{suggested._embedded.attractions[3].name}</h1>
                <Link href={{
                    pathname: 'Event',
                    query: {
                        eventId : suggested._embedded.events[1].id
                    }
                }}>
                    <Button className='bg-blue-700 text-white h-[50px] w-[20%] font-bold ease-in hover:bg-blue-800'>
                        Find Tickets
                    </Button>
                </Link>
            </div>
      </div>

      <div className='bg-red-500 flex p-16 w-full gap-10'>
        
        <div className='grid w-[40%] gap-10 grid-cols-2'>
            
            {suggested._embedded.attractions.map((attraction) => (

                <div className='flex flex-col'>
                    <img 
                    className='h-[200px] w-[300px]'
                    src={attraction.images[0].url}
                    height={80}
                    width={140}
                    alt='Attraction image'/> 
                </div>

            ))}
        </div>

        <div className='md:bg-blue-500 md:p-40'>
            Favorited event part!!!!
        </div>
      </div>

    </div>
  )
}

export default Trending

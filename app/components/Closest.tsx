'use client'

import { useEffect, useState } from 'react';
import useFindUserLocation from '../hooks/useFindUserLocation'
import { Coordinates, TMEvent } from '../types';
import { EventDisplay } from './EventDisplay';
import Planned from './Planned';

const Closest = () => {

  const [events, setEvents] = useState <TMEvent[] | undefined>()

  const {coordinates} = useFindUserLocation();

  const getClosestEvents = async(location: Coordinates | undefined) => {

    if(!location){

      console.log('trying to make api call with no coordinates');

      return;
    }

    try{

      const response = await fetch('/api/fetchClosestEvents', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body:  JSON.stringify(location),

      });

      if(!response.ok){

        const error = await response.json();

        console.log(error)

      }

      const events: {events: TMEvent[]} = await response.json();

      setEvents(events.events);

    }catch(error){

      console.log(error);

    }
  }

  useEffect(() => {
    getClosestEvents(coordinates);
  },[coordinates]);

  return (
    <div className='h-auto w-full flex gap-4'>
      <EventDisplay events={events}/>
    </div>
  )
}

export default Closest

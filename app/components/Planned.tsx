'use client'

import { User } from '@clerk/nextjs/server'
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" 
import useFetchPurchasedEvents from '../hooks/useFetchPurchasedEvents'
import { PurchasedEvent } from '@prisma/client'
import { calanderEvent } from '../types'




const Planned = () => {
  const [calEvent, setCalEnvent] = useState<calanderEvent[] | undefined>();

  const {purchasedEvents} = useFetchPurchasedEvents();

  console.log('purchased: ' , purchasedEvents);

  const convert = (events: PurchasedEvent[]) => {

    const evArr: calanderEvent[] | undefined = [];

    events.forEach((event) => {

      const evObj = {
        title: event.name,
        start: event.date? event.date as string: 'No event date yet',
        end: event.date? event.date as string: 'No event date yet',
        id: event.id
      }

      evArr.push(evObj);
    })

    setCalEnvent(evArr);

  }

  useEffect(() => {
    if(purchasedEvents){
      convert(purchasedEvents);
    }
  },[purchasedEvents]);

  console.log('c: ', calEvent);

  if(!calEvent){
    return(
      <div className='flex flex-center justify-center mb-5 w-auto h-auto'>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin,]}
          initialView="dayGridMonth"
        />
    </div>
    )
  }
  
  
  return (
    <div className='flex flex-center justify-center mb-5 w-auto h-auto'>
      <FullCalendar
      events={calEvent}
        plugins={[ dayGridPlugin, interactionPlugin,]}
        initialView="dayGridMonth"
      />
    </div>
  )
}

export default Planned

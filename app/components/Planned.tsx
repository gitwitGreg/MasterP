'use client'

import { User } from '@clerk/nextjs/server'
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { currentUser } from "@clerk/nextjs/server";
import interactionPlugin from "@fullcalendar/interaction" 
import useFetchPurchasedEvents from '../hooks/useFetchPurchasedEvents'

const Planned = () => {

  const {purchasedEvents} = useFetchPurchasedEvents();

  console.log('purchased: ' , purchasedEvents);
  
  return (
    <div className='flex flex-center justify-center mb-5 w-full h-auto'>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
      />
    </div>
  )
}

export default Planned

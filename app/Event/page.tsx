'use client'

import { useSearchParams } from "next/navigation";
import useGetEventDetails from "../hooks/useGetEventDetails";
import EventDetails from "../components/EventDetails";
import { TailSpin } from "react-loader-spinner";

export default function Event() {

    const search  = useSearchParams();

    const eventId = search.get('eventId');

    const { eventDetails } = useGetEventDetails(eventId as string);

    if(!eventDetails){

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

    return(
        <EventDetails event={eventDetails}/>
    )

}
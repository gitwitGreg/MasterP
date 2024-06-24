import { useState, useEffect } from "react";

export default function useGetEventDetails(eventId: string) {

    const [eventDetails, setEventDetails] = useState();

    const getEventDetails = async () => {

        if(!eventId){

            console.log('no event id');

            return;
        }

        try{

            const response = await fetch('/api/fetchEventDetails', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(eventId)
            });

            if(!response.ok){

                const errorObj: {error: string} = await response.json();

                console.log(errorObj.error);
            }

            const events = await response.json();

            setEventDetails(events);

    
        }catch(error){

            console.log(error);
    
        }

    }

    useEffect(()=> {
        getEventDetails();
    },[eventId])

    return {eventDetails}

}
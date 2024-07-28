import { PurchasedEvent } from "@prisma/client";
import { useState , useEffect} from "react";


export default function useFetchPurchasedEvents () {

    const [purchasedEvents, setPurchasedEvents] = useState<PurchasedEvent[] | undefined>();
     
    const fetchPurchasedEvents = async()=> {

        try{

            const response = await fetch('/api/fetchPuchasedEvents', {

                method: 'GET',
    
                headers: {
                    'Content-Type': 'application/json'
                }
    
            });
    
            if(!response.ok){

                console.log('Error while retreiving purchased events');

                setPurchasedEvents(undefined);

                return;

            }

            const resObj = await response.json();

            setPurchasedEvents(resObj);

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPurchasedEvents()
    },[]);

    return{purchasedEvents}
}
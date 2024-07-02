'use client'

import { useData } from "../context/DataProvider"
import { useEffect, useState } from "react"

export default function useFetchSearchResults() {

    const [foundData, setFoundData] = useState<Event[] | undefined>(); 

    const { data } = useData();

    useEffect(() => {

        if(data){

            setFoundData(data);

        }else{

            setFoundData(undefined);
            
            console.log('unable to find passed search context');

        }

    },[data]);

    return {foundData}  

}
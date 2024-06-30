'use client'

import { useData } from "../context/DataProvider"
import { useEffect, useState } from "react"

export default function useFetchSearchResults() {

    const [foundData, setFoundData] = useState<Event[] | undefined>(); 

    const getSearchResults = () => {

        const { data } = useData();

        if(!data){

            console.log('we didnt pass the data before routing');

            return undefined;

        }

        setFoundData(data);
    }

    useEffect(() => {
        getSearchResults();
    },[])

    return {foundData}  
}
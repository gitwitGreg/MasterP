'use client'

import { useEffect, useState } from "react"
import { Suggested, TMEvent } from "../types";

export default function useFetchSuggested() {

    const [suggested, setSuggested] = useState<Suggested>();

    const fetchSuggested = async() => {

        try{

            const response = await fetch('/api/fetchSuggested', {

                method: 'GET',

                headers: {
                    'Content-Type': 'application/json'
                },

            });

            if(!response.ok){

                throw Error('error getting trending events');

            }

            const resObj = await response.json();

            setSuggested(resObj);

        }catch(error){

            console.log(error);

        }
        
    }

    useEffect(() => {
        fetchSuggested();
    },[])


    return {suggested}
}
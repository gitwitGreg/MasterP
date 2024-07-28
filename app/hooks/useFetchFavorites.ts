'use client'
import { headers } from "next/headers";
import { useEffect, useState } from "react"
import { FavoritedEvent } from "../types";

export default function useFetchFavorites() {

    const [favorites, setFavorites] = useState<FavoritedEvent[] | undefined>();

    const fetchFavorites = async() => {

        try{

            const response = await fetch('/api/fetchfavorites',{

                method: "GET",

                headers: {
                    'Content-Type': "application/json"
                },

            });

            if(!response.ok){
                setFavorites(undefined)
            }

            const resObj = await response.json();

            setFavorites(resObj);

        }catch(error){

            console.log(error);

        }

    }

    useEffect(() => {
        fetchFavorites();
    },[])

    return{favorites}

}
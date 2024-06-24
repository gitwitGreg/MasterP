import { useState, useEffect } from "react"
import { FavoritedEvent } from "../types";

export default function useGetFavoriteEvents (eventId: string) {

    const [favorites, setFavorites] = useState<FavoritedEvent[] | undefined>();
    
    const [isFavorited, setIsFavorited] = useState<boolean>();

    const fetchFavorites = async() => {

        try{

            const response = await fetch('/api/fetchfavorites',{

                method: 'GET',

                headers: {
                    'Content-Type': 'application/json'
                },
                
            });

            if(!response.ok){

                const errObj: {error: string} = await response.json();

                console.log(errObj.error);

                return;

            }

            const resObj = await response.json();

            setFavorites(resObj);



        }catch(error){

            console.log(error);

        }
    }

    const checkIfFavorited = () => {

        if (favorites) {

            const isFav = favorites.some(favorite => favorite.eventId === eventId);

            if(isFav){

                setIsFavorited(true);

            }else{

                setIsFavorited(false);

            }

        }

    }

    useEffect(() => {
        fetchFavorites();
    },[]);

    useEffect(() => {
        checkIfFavorited();
    },[favorites])

  return {favorites, isFavorited}

}


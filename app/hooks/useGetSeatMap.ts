'use client'

import { useState, useEffect } from "react"

export default function useGetSeatMap (seatMapUrl: string | undefined) {

    const [seatmap, setSeatmap] = useState<string>();

    const fetchSeatmap = async() => {

        if(seatMapUrl === undefined){

            console.log('no seatmap');

            setSeatmap('')

            return;

        }

        try{

            const response = await fetch(seatMapUrl); 

            if(!response.ok){

                const error = await response.json();

                console.log(error);

                return;

            }

            const mapBlob = await response.blob();

            const mapUrl = URL.createObjectURL(mapBlob);

            setSeatmap(mapUrl);

        }catch(error){

            console.log(error);

        }
    }

    useEffect(() =>  {
        fetchSeatmap();
    },[seatMapUrl])

    return {seatmap}

}
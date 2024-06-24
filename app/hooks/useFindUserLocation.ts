'use client'

import { useEffect, useState} from "react"
import { Coordinates } from "../types"

export default function useFindUserLocation() {

    const [coordinates, setCoordinates] = useState<Coordinates | undefined>()

    const getCurrentLocation = () => {

        if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition((position) => {

                const { latitude, longitude } =  position.coords;

                const locationObj = {
                    lat: latitude,
                    lng: longitude
                }

                setCoordinates(locationObj);

            },(error) => {

                console.log(error);

            })
        }        
    }

    useEffect(() => {
        getCurrentLocation();
    },[]);

    return {coordinates}

}
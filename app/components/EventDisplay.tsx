import { TMEvent } from "../types";
import { TailSpin } from 'react-loader-spinner';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import { shortenString } from "../helpers";
import Link from "next/link";
import Planned from "./Planned";
  


export const EventDisplay = ({events}: {events: TMEvent[] | undefined}) => {

    if(!events){
        
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

    return (

        <div className="h-auto w-full px-4 mb-4 items-center justify-center flex gap-20 overflow-auto">

            <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-xs"
            >
                
                <CarouselContent>

                    {events.map((event, index) => (

                    <CarouselItem key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2">

                        <div className="p-1">

                        <Link href={{

                            pathname: '/Event',

                            query: {

                                eventId: event.id,

                            },

                        }}>

                        <Card style={{ backgroundImage: `url(${event.images[0].url})` }} className="bg-cover mb-2 relative group hover:cursor-pointer">

                            <CardContent className="flex aspect-square items-center justify-center p-6">
            
                            </CardContent>

                            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                        </Card>

                        <span className=" text-base text-gray-500 font-semibold hover:underline cursor-pointer">{shortenString(event.name)}</span>

                        </Link>

                        </div>

                    </CarouselItem>

                    ))}

                </CarouselContent>

                <CarouselPrevious />

                <CarouselNext />

            </Carousel>

            <Planned />

        </div>
    )
}
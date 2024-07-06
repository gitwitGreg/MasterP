'use client'

import { Button } from "@mui/material";
import { useState } from "react"
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation'
import { useData } from "../context/DataProvider";
import { TMEvent } from "../types";

const Search = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');

  const types = ['Concerts', 'Sports', 'Arts', 'Theater&Comedy', 'Family'];

  const { toast } = useToast();

  const { setData } = useData();

  const router  = useRouter();

  const searchPreset = async(searchType: string) => {

    try{

      const response = await fetch('/api/search', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(searchType)

      });

      if(!response.ok){

        const errorObj: {error: string} = await response.json();

        console.log(errorObj.error);

        return;

      }

      const eventList: TMEvent[] | undefined = await response.json();

      setData(eventList);

      router.push('/SearchResults');

    }catch(error){

      console.log(error);

    }
    
  }

  const makeSearch = async() => {

    console.log('clicked');

    console.log(searchTerm);

    if(searchTerm === ''){
      console.log('No search term found');

      toast({

        variant: 'destructive',

        title: 'Error',

        description: 'No search term found. please enter an event into the search bar'

      })

      return;
    }

    try{

      const response = await fetch('/api/search', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(searchTerm)

      });

      if(!response.ok){

        const errorObj: {error: string} = await response.json();

        console.log(errorObj.error);

        toast({

          title: 'Error',

          description: errorObj.error

        });

        return;
      }

      const eventList: TMEvent[] | undefined = await response.json();

      if(!eventList?.length){

        toast({
          title: 'Error',
          description: 'Invalid search. Try again'
        });

        setSearchTerm("");

        return;
      }


      setData(eventList);

      router.push('/SearchResults');

    }catch(error){

      console.log(error);

    }
  
  }

  return (

    <div className="w-full bg-black px-4  pb-4 rounded-lg p-2 flex flex-col gap-4">
      
      <div className="flex gap-5 w-[70%] justify-between px-6">

        {types.map((eventType) => (

          <button 
          key={eventType}
          className="bg-transparent text-white hover:text-purple-400 ease-in gap-2"
          onClick={() => searchPreset(eventType)}>
            {eventType}
          </button>

        ))}

      </div>

      <div className="w-full h-auto flex gap-4">

        <input 
        className="w-[90%] bg-white p-5 rounded-xl"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}>
        </input>

        <Button onClick={()=> makeSearch()}className="bg-black text-white w-[140px] p-2 rounded-xl">Search</Button>

      </div>

    </div>

  )
}

export default Search

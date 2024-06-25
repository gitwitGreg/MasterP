'use client'

import { Button } from "@mui/material";
import { useState } from "react"

const Search = () => {

  const [searchTerm, setSearchTerm] = useState<string>();

  const types = ['Concerts', 'Sports', 'Arts', 'Theater&Comedy', 'Family'];

  const searchPreset = async() => {

  }

  const makeSearch = async(searchTerm: string) => {
  
  }

  return (
    <div className="w-full bg-purple-400 p-16 flex">
      
      <div className="flex gap-5 w-auto text-white">

        {types.map((eventType) => (

          <Button 
          className="bg-transparent text-white"
          onClick={searchPreset}>
            {eventType}
          </Button>

        ))}

      </div>

    </div>
  )
}

export default Search

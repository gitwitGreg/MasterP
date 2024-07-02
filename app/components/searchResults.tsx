'use client'

import { TailSpin } from 'react-loader-spinner';
import useFetchSearchResults from '../hooks/useFetchSearchResults';

const SearchResultsDisplay = () => {

  const { foundData } = useFetchSearchResults();

  if(foundData){
    console.log(foundData[0]);
  }

  if(!foundData){

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
    <section className='h-screen w-full flex flex-col'>
      <p>{foundData.length} for '{foundData[0].name}'</p>
    </section>
  )
}

export default SearchResultsDisplay

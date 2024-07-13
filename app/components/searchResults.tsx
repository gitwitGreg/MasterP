'use client'

import { TailSpin } from 'react-loader-spinner';
import useFetchSearchResults from '../hooks/useFetchSearchResults';
import { convertDate, convertTime } from '../helpers';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

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
        ariaLabel="loading"
        />

      </div>

    )

  }

  return (
    <section className='h-screen w-full flex flex-col'>

      <div className='w-full h-auto p-10 bg-gray-100 gap-5 flex flex-col'>

        <div className='bg-white w-full h-auto p-5 flex flex-col gap-5'>

          <h1 className='text-xl font-bold flex gap-1'>

            <p className='underline underline-offset-4'>Top</p>
            Result
            
          </h1>

          {foundData[0]?.images && (
            <img 
            src={foundData[0].images[5].url}
  
            alt={"Event performer image"}
            className='w-[150px] h-[100px]'/>
          )}

          <p>{}</p>

          <h2 className='font-bold'>{foundData[0]?.name}</h2>

        </div>

        <div className='bg-white w-full h-auto p-5 flex flex-col gap-5 items-center'>

          <h1 className='font-lg font-bold'><span className='underline underline-offset-4'>Eve</span>nts { foundData.length} <span className='font-lg font-normal font-sans'>Results</span></h1>

          <div className='flex flex-col w-full h-full gap-5 justify-center'>

            {foundData.map((event) => (

              <Link href={{
                pathname: '/Event',

                query: {
                  eventId: event.id,
                }

              }} className='flex items-center p-5'>

                <p className='font-semibold'>{convertDate(event.dates.start.localDate) || 'No local date yet'}</p>

                <div key={event.id} className='flex gap-4 border-b p-10 items-center w-full'>

                  

                  <div className='flex flex-col'>

                    <p className='text-gray-400'>{event.dates.start.localTime || "TBD"} <InfoIcon className='text-black'/></p>

                    <p className='text-lg'>{event.name}</p>


                    {event._embedded && (
                      <>

                      <p>{event._embedded.venues[0].city?.name || 'No city name yet'}</p>

                      <p className='text-gray-400'>{event._embedded.venues[0]?.address?.line1 || 'No city name yet'}</p>

                      <p className='text-gray-400'>{event._embedded.venues[0]?.name || 'No city name yet'}</p>

                      {event.dates.start.localTime && (
                        <p>{convertTime(event?.dates?.start?.localTime) || 'No Time yet'}</p>
                      )}

                      </>

                    )}

                    {!event._embedded && ((
                      <div>
                        <p>{'Missing adress details'}</p>

                        <p>{convertTime(event.dates.start.localTime) || 'No local time yet'}</p>

                        <p>{event.dates.timezone}</p>
                      </div>
                    ))}

                  </div>    

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>

  )

}

export default SearchResultsDisplay

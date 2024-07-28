import React from 'react'
import useFetchFavorites from '../hooks/useFetchFavorites'
import Link from 'next/link';

const Favorites = () => {

  const { favorites } = useFetchFavorites();

  if(!favorites){
    return(
      <div>
        No events favorites
      </div>
    )
  }

  return (

    <div className=' w-[40%] h-[85%] p-10 gap-8 flex flex-col border-2 bg-gray-100 overflow-auto'>

      <div className='flex flex-col items-center justify-center'>

        <h1 className='font-bold text-xl'>Favorites</h1>
        
      </div>

      {favorites.map((event) => (

        <Link 
        key={event.eventId}
        href={{
          pathname: '/Event',
          query: {
            eventId:  event.eventId
          }
        }}>
          
          <div className='p-10'>

            <h1 className='font-semibold'>{event.name}</h1>

            <p>{event.date}</p>

            <p>{event.promoter}</p>

            <p>{event.address}</p>

          </div>

        </Link>

      ))}

    </div>
  )
}

export default Favorites

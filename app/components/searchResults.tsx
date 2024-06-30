import React from 'react'
import useFetchSearchResults from '../hooks/useFetchSearchResults';

const SearchResultsDisplay = () => {

    const { foundData } = useFetchSearchResults();

    console.log(foundData);

  return (
    <div>
      hey
    </div>
  )
}

export default SearchResultsDisplay

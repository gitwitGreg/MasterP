'use client'

import { createContext, useState, useContext, ReactNode, SetStateAction, Dispatch } from 'react';
import { TMEvent } from '../types';


interface SearchEventContextType {
    data: TMEvent[] | undefined;
    setData: Dispatch<SetStateAction<TMEvent[] | undefined>>;
}

const searchEventContext = createContext<SearchEventContextType | undefined>(undefined);

export const DataProvider = ({children}: {children: ReactNode}) =>  {

    const [data, setData] = useState<TMEvent[] | undefined>(undefined);

    return(

        <searchEventContext.Provider value={{data, setData}}>
            {children}
        </searchEventContext.Provider>
        
    )
}

export const useData = () => {

    const context = useContext(searchEventContext);

    if(!context){
        throw Error('Event data must be used withing a provider')
    }

    return context
    
}
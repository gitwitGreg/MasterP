'use client'

import { createContext, useState, useContext, ReactNode, SetStateAction, Dispatch } from 'react';


interface SearchEventContextType {
    data: Event[] | undefined;
    setData: Dispatch<SetStateAction<Event[] | undefined>>;
}

const searchEventContext = createContext<SearchEventContextType | undefined>(undefined);

export function DataProvider({children}: {children: ReactNode}) {

    const [data, setData] = useState<Event[] | undefined>(undefined);

    return(

        <searchEventContext.Provider value={{data, setData}}>
            {children}
        </searchEventContext.Provider>
        
    )
}

export function useData(){

    const context = useContext(searchEventContext);

    if(!context){
        throw Error('Event data must be used withing a provider')
    }

    return context
    
}
import React, { createContext, ReactNode, useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId: string
  ) => void;
};

type SearchContextProps = {
    children: ReactNode
}

const SearchContext = createContext<SearchContext | undefined>(undefined)

export const SearchContextProvider = ({children}: SearchContextProps)=> {
    const [destination, setDestination] = useState<string>("")
    const [checkIn, setCheckIn] = useState<Date>(new Date())
    const [checkOut, setCheckOut] = useState<Date>(new Date())
    const [adultCount, setAdultCount] = useState<number>(1)
    const [childCount, setChildCount] = useState<number>(0)
    const [hotelId, setHotelId] = useState<string>("")

    const saveSearchValues = (destination: string, checkIn: Date, 
    checkOut: Date, adultCount:number, childCount:number, hotelId: string) => {
        setDestination(destination)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setAdultCount(adultCount)
        setChildCount(childCount)
        if(hotelId){
            setHotelId(hotelId)
        }
    }

    return (
        <SearchContext.Provider value={{destination, checkIn, checkOut, 
            adultCount, childCount, saveSearchValues, hotelId}}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = ()=>{
    const Context = useContext(SearchContext)

    return Context as SearchContext
}

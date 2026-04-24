import React from 'react'
import { useAppContext } from '../Context/AppContext'
import { useLocation } from 'react-router'
import { useEffect } from 'react'

const Loading = () => {
    const {navigate} = useAppContext()
    let {search} = useLocation()
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next');

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`${nextUrl}`)
            },5000)
        }
    },[nextUrl])

  return (
   <div class="flex items-center justify-center h-screen">
  <div class="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
</div>
  )
}

export default Loading

import React from 'react'
import MainBanner from '../Components/MainBanner'
import Categories from '../Components/Categories'
import BestSellers from '../Components/BestSellers'
import BottomBanner from '../Components/BottomBanner'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <BestSellers/>
      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home

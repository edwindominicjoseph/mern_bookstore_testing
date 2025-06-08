import React from 'react'
import Banner from './banner'
import Topsellers from './Topsellers'
import Recommended from './Recommended'
import News from './News'

const Home = () => {
  return (
    <>
      <Banner/>
      <Topsellers/>
      <Recommended/>
      <News/>
    </>
  )
} 

export default Home

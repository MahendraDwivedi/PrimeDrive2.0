import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import StatsChart from '../components/StatsChart'

const Home = () => {
  return (
    <>
      <Hero/>
      <FeaturedSection/>
      <StatsChart/>
      <Banner/>
      <Testimonials/>
      <Newsletter/>
    </>
  )
}

export default Home
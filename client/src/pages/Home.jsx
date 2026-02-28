import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import JobListing from '../components/JobListing'

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <Hero/>
        <JobListing className='flex-1' />
        <Footer/>
    </div>
  )
}

export default Home
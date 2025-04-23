import React from 'react'
import Navbar from './Landing Page/Navbar'
import HeroHeader from './Landing Page/HeroHeader'
import HeroSection from './Landing Page/HeroSection'
import Features from './Landing Page/Features'
import Testimonial from './Landing Page/Testimonial'
import Pricing from './Landing Page/Pricing'
const LandingPage = () => {
  return (
    <>
        <Navbar />
        <HeroHeader />
        <HeroSection />
        <Features />
        <Testimonial />
        <Pricing />
    </>
  )
}

export default LandingPage
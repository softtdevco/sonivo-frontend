import React from 'react'
import Navbar from './Landing Page/Navbar'
import HeroHeader from './Landing Page/HeroHeader'
import HeroSection from './Landing Page/HeroSection'
import Features from './Landing Page/Features'
import Testimonial from './Landing Page/Testimonial'
import Pricing from './Landing Page/Pricing'
import FAQ from './Landing Page/FAQ'
import Footer from './Landing Page/Footer'

const LandingPage = () => {
  return (
    <>
        <Navbar />
        <HeroHeader />
        <HeroSection />
        <div id="features">
          <Features />
        </div>
        <div id="testimonials">
          <Testimonial />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <Footer />
    </>
  )
}

export default LandingPage
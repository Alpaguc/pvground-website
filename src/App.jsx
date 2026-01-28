import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Solutions from './components/Solutions'
import About from './components/About'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import DemoRequest from './pages/DemoRequest'
import ReleaseNotes from './pages/ReleaseNotes'
import Pricing from './pages/Pricing'
import LegalNotice from './pages/LegalNotice'
import HowToUse from './pages/HowToUse'
import Login from './pages/Login'
import AdminUsers from './pages/AdminUsers'
import EnvTest from './pages/EnvTest'
import Dashboard from './pages/Dashboard'

function Home() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle hash links when coming from other pages or hash changes
  useEffect(() => {
    const hash = location.hash || window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          const offset = 80 // navbar height
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 300)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Features />
      <Solutions />
      <About />
      <Team />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoRequest />} />
        <Route path="/request-demo" element={<DemoRequest />} />
        <Route path="/release-notes" element={<ReleaseNotes />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/env-test" element={<EnvTest />} />
      </Routes>
    </Router>
  )
}

export default App


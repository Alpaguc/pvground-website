import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Pricing = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('pricing.description')}
            </p>
          </motion.div>

          {/* Free Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative rounded-xl p-6 md:p-7 bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-xl border-2 border-primary-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-solar-yellow text-gray-900 px-4 py-1 rounded-full text-xs font-semibold">
                  {t('pricing.free')}
                </span>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{t('pricing.freeTitle')}</h2>
                <p className="text-sm text-primary-100 mb-4 max-w-md mx-auto">
                  {t('pricing.freeDescription')}
                </p>
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold">$0</span>
                </div>
                <p className="text-xs md:text-sm text-primary-100 mb-4 max-w-md mx-auto leading-relaxed">
                  {t('pricing.mission')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {t('pricing.features', { returnObjects: true }).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-solar-yellow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-xs md:text-sm text-white leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link to="/demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 bg-white text-primary-600 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-md w-full"
                  >
                    {t('pricing.getStarted')}
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Early Access Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 max-w-2xl mx-auto mb-8"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-6 md:p-8 border-2 border-primary-500 text-center text-white shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-3">
                {t('pricing.earlyAccessTitle')}
              </h2>
              <p className="text-sm md:text-base text-primary-100 leading-relaxed max-w-xl mx-auto">
                {t('pricing.earlyAccessText')}
              </p>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50 to-solar-yellow/10 rounded-lg p-6 md:p-8 border border-primary-100 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {t('pricing.missionTitle')}
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
                {t('pricing.missionText')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Pricing


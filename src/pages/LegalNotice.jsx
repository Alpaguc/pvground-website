import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LegalNotice = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t('legalNotice.title')}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.section1.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('legalNotice.section1.content')}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.section2.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('legalNotice.section2.content')}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.section3.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('legalNotice.section3.content')}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.section4.title')}
                </h2>
                <p className="leading-relaxed">
                  {t('legalNotice.section4.content')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LegalNotice

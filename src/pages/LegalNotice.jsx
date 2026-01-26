import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LegalNotice = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    // URL'de hash varsa sadece o bölümü göster
    const updateActiveSection = () => {
      const hash = window.location.hash
      if (hash) {
        setActiveSection(hash.substring(1)) // # işaretini kaldır
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else {
        setActiveSection(null) // Hash yoksa tüm bölümleri göster
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    updateActiveSection()
    
    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', updateActiveSection)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('hashchange', updateActiveSection)
      window.removeEventListener('scroll', handleScroll)
    }
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

            <div className="prose prose-lg max-w-none text-gray-700 space-y-12">
              {/* Kullanım Koşulları */}
              {(activeSection === null || activeSection === 'terms') && (
              <div id="terms" className="space-y-6 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('legalNotice.termsOfService.title')}
                </h2>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.termsOfService.section1.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.termsOfService.section1.content')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.termsOfService.section2.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.termsOfService.section2.content')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.termsOfService.section3.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.termsOfService.section3.content')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.termsOfService.section4.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.termsOfService.section4.content')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.termsOfService.section5.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.termsOfService.section5.content')}
                  </p>
                </div>
              </div>
              )}

              {/* Gizlilik Politikası */}
              {(activeSection === null || activeSection === 'privacy') && (
              <div id="privacy" className="space-y-6 pt-8 border-t border-gray-200 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('legalNotice.privacyPolicy.title')}
                </h2>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.privacyPolicy.section1.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.privacyPolicy.section1.content')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.privacyPolicy.section2.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.privacyPolicy.section2.content')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('legalNotice.privacyPolicy.section3.title')}
                  </h3>
                  <p className="leading-relaxed whitespace-pre-line">
                    {t('legalNotice.privacyPolicy.section3.content')}
                  </p>
                </div>
              </div>
              )}

              {/* Çerez Politikası */}
              {(activeSection === null || activeSection === 'cookies') && (
              <div id="cookies" className="space-y-6 pt-8 border-t border-gray-200 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('legalNotice.cookiePolicy.title')}
                </h2>
                <p className="leading-relaxed whitespace-pre-line">
                  {t('legalNotice.cookiePolicy.content')}
                </p>
              </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LegalNotice

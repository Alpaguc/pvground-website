import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HowToUse = () => {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const categories = t('howToUse.categories', { returnObjects: true })

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('howToUse.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('howToUse.description')}
            </p>
          </motion.div>

          {/* Categories */}
          <div className="space-y-4">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {categoryIndex + 1}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 text-left">
                      {category.title}
                    </h2>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform ${
                      expandedCategory === categoryIndex ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Category Content */}
                {expandedCategory === categoryIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 border-t border-gray-100"
                  >
                    <div className="space-y-6">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                              <h3 className="text-gray-900 font-semibold text-lg mb-2">
                                {item.question}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Video */}
                          {item.video && (
                            <div className="mt-4 ml-8 w-full max-w-4xl">
                              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                                <video 
                                  src={item.video} 
                                  controls
                                  className="w-full h-auto"
                                  preload="metadata"
                                  playsInline
                                  muted
                                  style={{ minHeight: '400px' }}
                                >
                                  Tarayıcınız video oynatmayı desteklemiyor.
                                </video>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HowToUse

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ReleaseNotes = () => {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState('1.23')

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const releases = ['1.23', '1.22', '1.21', '1.2', '1.1', '1.0', '0.9', '0.8', '0.7']

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
              {t('releaseNotes.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('releaseNotes.description')}
            </p>
          </motion.div>

          {/* Version Selector */}
          <div className="mb-8 flex flex-wrap gap-3">
            {releases.map((version) => (
              <button
                key={version}
                onClick={() => setSelectedVersion(version)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedVersion === version
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('releaseNotes.version')} {version}
              </button>
            ))}
          </div>

          {/* Release Content */}
          <motion.div
            key={selectedVersion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {t('releaseNotes.version')} {selectedVersion}
                </h2>
                <span className="text-gray-500 text-sm md:text-base">
                  {t(`releaseNotes.releases.${selectedVersion}.date`)}
                </span>
              </div>
              <p className="text-lg text-gray-600">
                {t(`releaseNotes.releases.${selectedVersion}.description`)}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  {t('releaseNotes.newFeatures')}
                </h3>
                <ul className="space-y-6">
                  {t(`releaseNotes.releases.${selectedVersion}.features`, { returnObjects: true }).map((feature, index) => (
                    <li key={index} className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <span className="text-gray-700 font-medium">{typeof feature === 'string' ? feature : feature.title}</span>
                          {/* Açıklama desteği */}
                          {typeof feature === 'object' && feature.description && (
                            <div className="mt-2 text-gray-600 text-sm leading-relaxed">
                              {Array.isArray(feature.description) ? (
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                  {feature.description.map((desc, idx) => (
                                    <li key={idx}>{desc}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{feature.description}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Görsel/GIF/Video desteği */}
                      {typeof feature === 'object' && (feature.image || feature.video) && (
                        <div className="mt-4 -ml-8 w-full max-w-4xl">
                          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                            {feature.video ? (
                              <video 
                                src={feature.video} 
                                controls
                                className="w-full h-auto"
                                preload="metadata"
                                playsInline
                                muted
                                style={{ minHeight: '400px' }}
                              >
                                Tarayıcınız video oynatmayı desteklemiyor.
                              </video>
                            ) : feature.image && feature.image.endsWith('.gif') ? (
                              <img 
                                src={feature.image} 
                                alt={feature.title || 'Feature demonstration'} 
                                className="w-full h-auto"
                              />
                            ) : (
                              <img 
                                src={feature.image} 
                                alt={feature.title || 'Feature image'} 
                                className="w-full h-auto"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {t('releaseNotes.improvements')}
                </h3>
                <ul className="space-y-3">
                  {t(`releaseNotes.releases.${selectedVersion}.improvements`, { returnObjects: true }).map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bug Fixes */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  {t('releaseNotes.bugFixes')}
                </h3>
                <ul className="space-y-3">
                  {t(`releaseNotes.releases.${selectedVersion}.bugFixes`, { returnObjects: true }).map((fix, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ReleaseNotes


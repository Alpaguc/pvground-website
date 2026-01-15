import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const featureImages = [
  '/images/Özellik Görseli.png',
  '/images/Özellik Görseli-1.png',
  '/images/Özellik Görseli-2.png',
  '/images/Özellik Görseli-3.png',
  '/images/Özellik Görseli-4.png',
  '/images/Özellik Görseli-5.png',
  '/images/Özellik Görseli-6.png',
  '/images/Özellik Görseli-7.png',
  '/images/Özellik Görseli-8.png'
]

const Features = () => {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % featureImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + featureImages.length) % featureImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % featureImages.length)
  }

  const IconComponent = ({ iconType, className }) => {
    const icons = {
      shadowing: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      terrain: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      iteration: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      cabling: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      visualization: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
      ),
      reporting: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    }
    return icons[iconType] || null
  }

  const features = [
    {
      iconType: 'shadowing',
      key: 'shadowingAnalysis',
      color: 'from-primary-500 to-primary-600',
    },
    {
      iconType: 'terrain',
      key: 'terrainAnalysis',
      color: 'from-solar-orange to-solar-yellow',
    },
    {
      iconType: 'iteration',
      key: 'capacityIteration',
      color: 'from-primary-400 to-primary-500',
    },
    {
      iconType: 'cabling',
      key: 'dcAcHvCabling',
      color: 'from-solar-yellow to-solar-orange',
    },
    {
      iconType: 'visualization',
      key: 'visualization',
      color: 'from-primary-600 to-primary-700',
    },
    {
      iconType: 'reporting',
      key: 'reporting',
      color: 'from-solar-orange to-primary-600',
    },
  ]

  return (
    <section id="features" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('features.title')} <span className="text-gradient">{t('features.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-primary-100 transition-all duration-300">
                  <IconComponent iconType={feature.iconType} className="w-7 h-7 text-gray-700 group-hover:text-primary-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`features.items.${feature.key}.title`)}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{t(`features.items.${feature.key}.description`)}</p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Feature Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
            {featureImages.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt="PVGround Features"
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
              aria-label="Önceki görsel"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
              aria-label="Sonraki görsel"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featureImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Görsel ${index + 1}'e git`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features

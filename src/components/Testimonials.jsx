import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import TestimonialForm from './TestimonialForm'

const Testimonials = () => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [userMinimized, setUserMinimized] = useState(false) // Kullanıcı manuel küçülttü mü?
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  // Supabase'den yorumları çek
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true)
        
        // Supabase yoksa boş liste göster (localStorage kullanma - production'da her zaman Supabase kullanılmalı)
        if (!supabase) {
          console.warn('Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.')
          setTestimonials([])
          setLoading(false)
          return
        }
        
        // Supabase'den onaylı yorumları çek
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        // Veri formatını düzelt
        const formattedTestimonials = (data || []).map((t) => ({
          id: t.id,
          name: t.name,
          role: t.role || '',
          company: t.company || '',
          content: t.content,
          rating: t.rating || 5,
          created: t.created_at,
        }))

        setTestimonials(formattedTestimonials)
        if (formattedTestimonials.length > 0) {
          setCurrentIndex(0)
        }
      } catch (error) {
        console.error('Testimonials load error:', error)
        // Hata durumunda boş liste göster
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()

    // Supabase realtime subscription (yeni yorumlar için)
    if (supabase) {
      const channel = supabase
        .channel('testimonials-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'testimonials',
            filter: 'status=eq.approved',
          },
          () => {
            loadTestimonials()
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  // Carousel otomatik geçiş
  useEffect(() => {
    if (testimonials.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
          if (entry.isIntersecting && !hasShownPopup) {
            // İlk kez bölüme gelince popup'ı aç
            setTimeout(() => {
              setShowForm(true)
              setHasShownPopup(true)
              setIsMinimized(false)
              setUserMinimized(false)
            }, 2000)
          } else if (entry.isIntersecting && hasShownPopup && isMinimized && showForm && !userMinimized) {
            // Tekrar bölüme gelince ve minimized ise aç (sadece otomatik küçültülmüşse)
            setIsMinimized(false)
          } else if (!entry.isIntersecting && hasShownPopup && showForm && !isMinimized && !userMinimized) {
            // Bölümden çıkınca küçült (sadece açıkken ve kullanıcı manuel küçültmemişse)
            setIsMinimized(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasShownPopup, isMinimized, showForm, userMinimized])

  const handleTestimonialSubmit = async (newTestimonial) => {
    // Yeni testimonial eklendiğinde listeyi yenile
    try {
      if (!supabase) {
        console.warn('Supabase not configured. Cannot refresh testimonials.')
        return
      }
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (!error && data) {
        const formattedTestimonials = data.map((t) => ({
          id: t.id,
          name: t.name,
          role: t.role || '',
          company: t.company || '',
          content: t.content,
          rating: t.rating || 5,
          created: t.created_at,
        }))

        setTestimonials(formattedTestimonials)
        if (formattedTestimonials.length > 0) {
          setCurrentIndex(0)
        }
      }
    } catch (error) {
      console.error('Testimonials refresh error:', error)
    }
  }

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 bg-white relative">
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
            {t('testimonials.title')} <span className="text-gradient">{t('testimonials.titleHighlight')}</span>
          </h2>
          {t('testimonials.description') && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('testimonials.description')}
            </p>
          )}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {loading ? (
            <div className="bg-gradient-to-br from-primary-50 to-white p-12 rounded-2xl shadow-xl text-center">
              <p className="text-gray-600">{t('testimonials.loading') || 'Yorumlar yükleniyor...'}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="bg-gradient-to-br from-primary-50 to-white p-12 rounded-2xl shadow-xl text-center">
              <p className="text-gray-600">{t('testimonials.noTestimonials') || 'Henüz yorum bulunmuyor.'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-2xl">
                <motion.div
                  key={testimonials[currentIndex]?.id || currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-primary-50 to-white p-12 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-6 h-6 ${
                          i < (testimonials[currentIndex]?.rating || 0) 
                            ? 'text-solar-yellow' 
                            : 'text-gray-300'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    "{testimonials[currentIndex]?.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentIndex]?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonials[currentIndex]?.name}</div>
                      <div className="text-gray-600">
                        {testimonials[currentIndex]?.role && `${testimonials[currentIndex].role}`}
                        {testimonials[currentIndex]?.role && testimonials[currentIndex]?.company && ', '}
                        {testimonials[currentIndex]?.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Dots */}
              {testimonials.length > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={testimonials[index]?.id || index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {(() => {
            // Dinamik istatistikleri hesapla
            const totalTestimonials = testimonials.length
            const averageRating = testimonials.length > 0
              ? (testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length).toFixed(1)
              : '5.0'
            
            return [
              { value: `${totalTestimonials > 0 ? totalTestimonials : '21'}+`, key: 'customers' },
              { value: '7+', key: 'projects' },
              { value: '2+', key: 'countries' },
              { value: `${averageRating}/5`, key: 'rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{t(`testimonials.stats.${stat.key}`)}</div>
              </div>
            ))
          })()}
        </motion.div>
      </div>

      {/* Popup Form */}
      <TestimonialForm
        isOpen={showForm}
        isMinimized={isMinimized}
        onClose={() => {
          setShowForm(false)
          setIsMinimized(false)
          setUserMinimized(false)
        }}
        onMinimize={() => {
          setIsMinimized(true)
          setUserMinimized(true) // Kullanıcı manuel küçülttü
        }}
        onRestore={() => {
          setIsMinimized(false)
          setUserMinimized(false) // Kullanıcı geri açtı
        }}
        onSubmit={handleTestimonialSubmit}
      />
    </section>
  )
}

export default Testimonials

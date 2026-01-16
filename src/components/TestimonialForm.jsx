import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

const TestimonialForm = ({ isOpen, isMinimized, onClose, onMinimize, onRestore, onSubmit }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 0
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.content || !formData.rating) {
      alert(t('testimonialForm.validation.required') || 'Lütfen zorunlu alanları doldurun')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Supabase yoksa hata göster
      if (!supabase) {
        alert(t('testimonialForm.supabaseError') || 'Supabase yapılandırılmamış. Lütfen environment variables ekleyin.')
        setIsSubmitting(false)
        return
      }
      
      // Supabase'e kaydet
      const { data, error } = await supabase
        .from('testimonials')
        .insert([
          {
            name: formData.name,
            role: formData.role || '',
            company: formData.company || '',
            content: formData.content,
            rating: parseInt(formData.rating),
            status: 'approved', // Otomatik onaylı
          },
        ])
        .select()
        .single()

      if (error) {
        throw error
      }

      setSubmitted(true)
      if (onSubmit) {
        onSubmit(data)
      }
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', role: '', company: '', content: '', rating: 0 })
        setHoveredRating(0)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Testimonial submission error:', error)
      alert(t('testimonialForm.error') || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen && !isMinimized) return null

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize()
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
        {isMinimized ? (
          // Minimized Icon
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestore}
            className="w-14 h-14 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full shadow-2xl flex items-center justify-center pointer-events-auto relative group"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-solar-yellow rounded-full border-2 border-white"></span>
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t('testimonialForm.minimizedTooltip') || 'Bizi değerlendirin'}
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto border border-gray-200"
          >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {t('testimonialForm.title')}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleMinimize()
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={t('testimonialForm.minimize') || 'Küçült'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={t('testimonialForm.close') || 'Kapat'}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {t('testimonialForm.success')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating Stars */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('testimonialForm.rating')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || formData.rating)
                              ? 'text-solar-yellow'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                    {formData.rating > 0 && (
                      <span className="ml-2 text-sm text-gray-600">
                        {formData.rating} / 5
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('testimonialForm.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('testimonialForm.role')}
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('testimonialForm.rolePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('testimonialForm.company')}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('testimonialForm.companyPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('testimonialForm.comment')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    required
                    placeholder={t('testimonialForm.commentPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('testimonialForm.submitting') : t('testimonialForm.submit')}
                </button>
              </form>
            )}
          </div>
        </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}

export default TestimonialForm


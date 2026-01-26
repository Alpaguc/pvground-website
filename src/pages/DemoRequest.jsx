import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DemoRequest = () => {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phoneCountryCode: '+90',
    phone: '',
    jobTitle: '',
    message: '',
    acceptTerms: false,
    acceptCookies: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showCookiesModal, setShowCookiesModal] = useState(false)

  // Sanal e-posta servisleri listesi
  const blockedEmailDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'mail.com',
    'yandex.com',
    'protonmail.com',
    'icloud.com',
    'me.com',
    'mac.com',
    'live.com',
    'msn.com',
    'arugy.com',
    'airsworld.net',
    'protectsmail.net',
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
    'temp-mail.org',
    'getnada.com',
    'mohmal.com',
    'fakeinbox.com',
  ]

  // Genel/şirket e-posta adreslerini engelle (kişisel e-posta adresleri kabul edilir)
  const blockedEmailPrefixes = [
    'proje',
    'project',
    'sales',
    'satis',
    'satış',
    'info',
    'contact',
    'iletişim',
    'destek',
    'support',
    'genel',
    'general',
    'admin',
    'yönetim',
    'management',
    'noreply',
    'no-reply',
    'donotreply',
    'do-not-reply',
    'mail',
    'email',
    'e-posta',
    'eposta',
    'musteri',
    'müşteri',
    'customer',
    'client',
    'müşteri',
    'musteri',
  ]

  // Ülke kodları
  const countryCodes = [
    { code: '+90', country: 'Türkiye', flag: '🇹🇷' },
    { code: '+994', country: 'Azerbaycan', flag: '🇦🇿' },
    { code: '+374', country: 'Ermenistan', flag: '🇦🇲' },
    { code: '+995', country: 'Gürcistan', flag: '🇬🇪' },
    { code: '+1', country: 'ABD/Kanada', flag: '🇺🇸' },
    { code: '+44', country: 'İngiltere', flag: '🇬🇧' },
    { code: '+49', country: 'Almanya', flag: '🇩🇪' },
    { code: '+33', country: 'Fransa', flag: '🇫🇷' },
    { code: '+39', country: 'İtalya', flag: '🇮🇹' },
    { code: '+34', country: 'İspanya', flag: '🇪🇸' },
    { code: '+31', country: 'Hollanda', flag: '🇳🇱' },
    { code: '+32', country: 'Belçika', flag: '🇧🇪' },
    { code: '+41', country: 'İsviçre', flag: '🇨🇭' },
    { code: '+43', country: 'Avusturya', flag: '🇦🇹' },
    { code: '+46', country: 'İsveç', flag: '🇸🇪' },
    { code: '+47', country: 'Norveç', flag: '🇳🇴' },
    { code: '+45', country: 'Danimarka', flag: '🇩🇰' },
    { code: '+358', country: 'Finlandiya', flag: '🇫🇮' },
    { code: '+48', country: 'Polonya', flag: '🇵🇱' },
    { code: '+40', country: 'Romanya', flag: '🇷🇴' },
    { code: '+359', country: 'Bulgaristan', flag: '🇧🇬' },
    { code: '+30', country: 'Yunanistan', flag: '🇬🇷' },
    { code: '+385', country: 'Hırvatistan', flag: '🇭🇷' },
    { code: '+386', country: 'Slovenya', flag: '🇸🇮' },
    { code: '+420', country: 'Çekya', flag: '🇨🇿' },
    { code: '+421', country: 'Slovakya', flag: '🇸🇰' },
    { code: '+36', country: 'Macaristan', flag: '🇭🇺' },
    { code: '+380', country: 'Ukrayna', flag: '🇺🇦' },
    { code: '+7', country: 'Rusya/Kazakistan', flag: '🇷🇺' },
    { code: '+86', country: 'Çin', flag: '🇨🇳' },
    { code: '+81', country: 'Japonya', flag: '🇯🇵' },
    { code: '+82', country: 'Güney Kore', flag: '🇰🇷' },
    { code: '+91', country: 'Hindistan', flag: '🇮🇳' },
    { code: '+971', country: 'BAE', flag: '🇦🇪' },
    { code: '+966', country: 'Suudi Arabistan', flag: '🇸🇦' },
    { code: '+974', country: 'Katar', flag: '🇶🇦' },
    { code: '+965', country: 'Kuveyt', flag: '🇰🇼' },
    { code: '+973', country: 'Bahreyn', flag: '🇧🇭' },
    { code: '+968', country: 'Umman', flag: '🇴🇲' },
    { code: '+961', country: 'Lübnan', flag: '🇱🇧' },
    { code: '+962', country: 'Ürdün', flag: '🇯🇴' },
    { code: '+972', country: 'İsrail', flag: '🇮🇱' },
    { code: '+964', country: 'Irak', flag: '🇮🇶' },
    { code: '+98', country: 'İran', flag: '🇮🇷' },
    { code: '+20', country: 'Mısır', flag: '🇪🇬' },
    { code: '+27', country: 'Güney Afrika', flag: '🇿🇦' },
    { code: '+55', country: 'Brezilya', flag: '🇧🇷' },
    { code: '+52', country: 'Meksika', flag: '🇲🇽' },
    { code: '+61', country: 'Avustralya', flag: '🇦🇺' },
    { code: '+64', country: 'Yeni Zelanda', flag: '🇳🇿' },
    { code: '+65', country: 'Singapur', flag: '🇸🇬' },
    { code: '+60', country: 'Malezya', flag: '🇲🇾' },
    { code: '+66', country: 'Tayland', flag: '🇹🇭' },
    { code: '+62', country: 'Endonezya', flag: '🇮🇩' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+63', country: 'Filipinler', flag: '🇵🇭' },
  ]

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // ESC tuşu ile modal'ları kapat
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowTermsModal(false)
        setShowCookiesModal(false)
      }
    }
    if (showTermsModal || showCookiesModal) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showTermsModal, showCookiesModal])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateEmail = (email) => {
    if (!email) return t('demo.validation.emailRequired')
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return t('demo.validation.emailInvalid')
    }

    const domain = email.split('@')[1]?.toLowerCase()
    if (blockedEmailDomains.some(blocked => domain === blocked || domain?.endsWith('.' + blocked))) {
      return t('demo.validation.emailBlocked')
    }

    // Eğitim domain'lerini engelle (edu.tr, edu.com, edu.org, vb.)
    if (domain && (domain.includes('.edu') || domain.startsWith('edu.'))) {
      return t('demo.validation.emailEducationNotAllowed')
    }

    // Genel/şirket e-posta adreslerini engelle (kişisel e-posta adresleri kabul edilir)
    const localPart = email.split('@')[0]?.toLowerCase()
    if (localPart) {
      // Local part'ı noktalara göre böl ve her parçayı kontrol et
      const localParts = localPart.split('.')
      if (localParts.some(part => blockedEmailPrefixes.includes(part))) {
        return t('demo.validation.emailGenericNotAllowed')
      }
      // Tam eşleşmeyi de kontrol et
      if (blockedEmailPrefixes.includes(localPart)) {
        return t('demo.validation.emailGenericNotAllowed')
      }
    }

    return null
  }

  const validateForm = () => {
    const newErrors = {}

    // E-posta validasyonu
    const emailError = validateEmail(formData.email)
    if (emailError) {
      newErrors.email = emailError
    }

    // Mesaj validasyonu
    if (!formData.message || formData.message.trim().length === 0) {
      newErrors.message = t('demo.validation.messageRequired')
    }

    // Kullanım Koşulları kabulü
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('demo.validation.acceptTermsRequired')
    }

    // Çerez Politikası kabulü
    if (!formData.acceptCookies) {
      newErrors.acceptCookies = t('demo.validation.acceptCookiesRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Çift gönderimi engelle
    if (isSubmitting) {
      return
    }
    
    // Form validasyonu
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Web3Forms API Key
    const web3formsApiKey = import.meta.env.VITE_WEB3FORMS_API_KEY || 'adf2422d-2161-4a45-b63e-b3c92c317a95'

    // Telefon numarasını ülke kodu ile birleştir
    const fullPhone = formData.phone ? `${formData.phoneCountryCode} ${formData.phone}` : 'Belirtilmemiş'
    const fullName = `${formData.firstName} ${formData.lastName}`

    console.log('Form Gönderiliyor...', formData)

    try {
      // E-posta adresinin daha önce key talep edip etmediğini kontrol et
      // Netlify Function ile veritabanından kontrol ediyoruz
      let hasRequestedBefore = false
      
      try {
        const checkResponse = await fetch('/.netlify/functions/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email.toLowerCase() }),
        })
        
        if (checkResponse.ok) {
          const checkResult = await checkResponse.json()
          hasRequestedBefore = checkResult.exists || false
          console.log('E-posta kontrolü:', hasRequestedBefore ? 'Daha önce talep etmiş' : 'Yeni talep')
        }
      } catch (checkError) {
        console.warn('E-posta kontrolü başarısız (devam ediliyor):', checkError)
        // Hata durumunda devam et, kontrol edemedik ama formu gönder
      }
      
      // Admin'e e-posta gönder (info@pvground.com)
      const emailData = {
        access_key: web3formsApiKey,
        to_email: 'info@pvground.com', // E-postalar info@pvground.com adresine gönderilecek
        subject: hasRequestedBefore ? 'PVGround - TEKRAR Key Talebi (Dikkat!)' : 'PVGround - Yeni Key Talebi',
        from_name: fullName,
        email: formData.email, // Formu dolduran kişinin e-postası (bilgi amaçlı)
        message: `
${hasRequestedBefore ? '⚠️ TEKRAR KEY TALEBİ - Bu e-posta adresi daha önce key talep etmiş!' : 'Yeni bir key talebi alındı!'}

Ad Soyad: ${fullName}
E-posta: ${formData.email}
${hasRequestedBefore ? '⚠️ UYARI: Bu e-posta adresi daha önce key talep etmiş. Lütfen kontrol edin!' : ''}
Şirket: ${formData.company || 'Belirtilmemiş'}
Telefon: ${fullPhone}
Pozisyon: ${formData.jobTitle || 'Belirtilmemiş'}

Mesaj:
${formData.message}

---
Bu e-posta PVGround web sitesinden otomatik olarak gönderilmiştir.
Formu dolduran: ${fullName} (${formData.email})
${hasRequestedBefore ? '\n⚠️ NOT: Bu e-posta adresi daha önce key talep etmiş. Lütfen kayıtlarınızı kontrol edin.' : ''}
        `.trim(),
      }

      console.log('Web3Forms API\'ye gönderiliyor...', emailData)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      console.log('Web3Forms Response Status:', response.status)

      const result = await response.json()
      console.log('Web3Forms Response:', result)

      if (!result.success) {
        console.error('Web3Forms Hata:', result)
        throw new Error('E-posta gönderilemedi: ' + JSON.stringify(result))
      }

      console.log('✅ E-posta başarıyla gönderildi:', result)

      // Netlify Forms'a da gönder (backup - sadece production'da)
      // Localhost'ta çalışmaz, bu yüzden sadece production'da deniyoruz
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        try {
          const encode = (data) => {
            return Object.keys(data)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              .join('&')
          }
          
          await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
              'form-name': 'demo-request',
              ...formData,
            }),
          })
          console.log('✅ Netlify Forms backup gönderildi')
        } catch (netlifyError) {
          // Netlify hatası önemli değil
          console.log('⚠️ Netlify form backup gönderimi başarısız (normal)', netlifyError)
        }
      } else {
        console.log('ℹ️ Netlify Forms backup atlandı (localhost)')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('❌ Web3Forms Hata Detayları:', error)
      setIsSubmitting(false) // Hata durumunda tekrar denemeye izin ver
      alert(t('demo.error') || 'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan info@pvground.com adresine e-posta gönderin.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Navbar scrolled={scrolled} />
        <div className="pt-32 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('demo.success.title')}</h2>
              <p className="text-lg text-gray-600 mb-8">{t('demo.success.message')}</p>
              <Link to="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  {t('demo.success.back')}
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar scrolled={scrolled} />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('demo.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('demo.description')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <form 
                  name="demo-request" 
                  method="POST" 
                  data-netlify="true" 
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  {/* Netlify Bot Field (Spam koruması) */}
                  <input type="hidden" name="form-name" value="demo-request" />
                  <div className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('demo.form.firstName')} *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('demo.form.lastName')} *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('demo.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {t('demo.validation.emailNote')}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('demo.form.company')} *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('demo.form.phone')}
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="phoneCountryCode"
                        name="phoneCountryCode"
                        value={formData.phoneCountryCode}
                        onChange={handleChange}
                        className="w-28 sm:w-32 flex-shrink-0 px-2 sm:px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white text-xs sm:text-sm"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('demo.form.phonePlaceholder')}
                        className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('demo.form.jobTitle')}
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('demo.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Kullanım Koşulları ve Çerez Politikası */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">
                          {t('demo.form.acceptTerms.prefix')}{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowTermsModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-700 underline font-semibold"
                          >
                            {t('demo.form.acceptTerms.link')}
                          </button>
                          {' '}{t('demo.form.acceptTerms.suffix')}
                        </span>
                      </label>
                      {errors.acceptTerms && (
                        <p className="mt-1 ml-8 text-sm text-red-600">{errors.acceptTerms}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="acceptCookies"
                          checked={formData.acceptCookies}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">
                          {t('demo.form.acceptCookies.prefix')}{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowCookiesModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-700 underline font-semibold"
                          >
                            {t('demo.form.acceptCookies.link')}
                          </button>
                          {' '}{t('demo.form.acceptCookies.suffix')}
                        </span>
                      </label>
                      {errors.acceptCookies && (
                        <p className="mt-1 ml-8 text-sm text-red-600">{errors.acceptCookies}</p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? t('demo.form.submitting') || 'Gönderiliyor...' : t('demo.form.submit')}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar - Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('demo.trust.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">{t('demo.trust.item1.title')}</div>
                      <div className="text-sm text-gray-600">{t('demo.trust.item1.description')}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">{t('demo.trust.item2.title')}</div>
                      <div className="text-sm text-gray-600">{t('demo.trust.item2.description')}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">{t('demo.trust.item3.title')}</div>
                      <div className="text-sm text-gray-600">{t('demo.trust.item3.description')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-solar-yellow/10 rounded-2xl p-6 border border-primary-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">21+</div>
                    <div className="text-sm text-gray-600">{t('demo.stats.customers')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">2+</div>
                    <div className="text-sm text-gray-600">{t('demo.stats.countries')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">7+</div>
                    <div className="text-sm text-gray-600">{t('testimonials.stats.projects')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600 mb-1">5/5</div>
                    <div className="text-sm text-gray-600">{t('testimonials.stats.rating')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Kullanım Koşulları Modal */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowTermsModal(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('legalNotice.termsOfService.title')}
              </h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.termsOfService.section1.title')}
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {t('legalNotice.termsOfService.section1.content')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.termsOfService.section2.title')}
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {t('legalNotice.termsOfService.section2.content')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.termsOfService.section3.title')}
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {t('legalNotice.termsOfService.section3.content')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.termsOfService.section4.title')}
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {t('legalNotice.termsOfService.section4.content')}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('legalNotice.termsOfService.section5.title')}
                </h3>
                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {t('legalNotice.termsOfService.section5.content')}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('demo.modal.close') || 'Kapat'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Çerez Politikası Modal */}
      {showCookiesModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowCookiesModal(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('legalNotice.cookiePolicy.title')}
              </h2>
              <button
                onClick={() => setShowCookiesModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <p className="leading-relaxed whitespace-pre-line text-gray-700">
                {t('legalNotice.cookiePolicy.content')}
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowCookiesModal(false)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('demo.modal.close') || 'Kapat'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default DemoRequest


import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login')
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    acceptTerms: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Kullanıcı zaten giriş yapmışsa yönlendir
  useEffect(() => {
    const checkSession = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          navigate('/dashboard')
        }
      }
    }
    checkSession()
  }, [navigate])

  // Form validation
  const validateLogin = () => {
    if (!loginData.email) {
      setError(t('login.errors.emailRequired'))
      return false
    }
    if (!loginData.password) {
      setError(t('login.errors.passwordRequired'))
      return false
    }
    if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      setError(t('login.errors.invalidEmail'))
      return false
    }
    return true
  }

  const validateRegister = () => {
    if (!registerData.fullName) {
      setError(t('login.errors.fullNameRequired'))
      return false
    }
    if (!registerData.email) {
      setError(t('login.errors.emailRequired'))
      return false
    }
    if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      setError(t('login.errors.invalidEmail'))
      return false
    }
    if (!registerData.password) {
      setError(t('login.errors.passwordRequired'))
      return false
    }
    if (registerData.password.length < 6) {
      setError(t('login.errors.passwordMinLength'))
      return false
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError(t('login.errors.passwordMismatch'))
      return false
    }
    if (!registerData.acceptTerms) {
      setError(t('login.errors.acceptTerms'))
      return false
    }
    return true
  }

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateLogin()) return

    if (!supabase) {
      setError(t('login.errors.supabaseNotConfigured'))
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })

      if (authError) {
        setError(authError.message || t('login.errors.loginFailed'))
        return
      }

      if (data.user) {
        setSuccess(t('login.success.loginSuccess'))
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
    } catch (err) {
      setError(err.message || t('login.errors.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateRegister()) return

    if (!supabase) {
      setError(t('login.errors.supabaseNotConfigured'))
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            full_name: registerData.fullName,
          },
        },
      })

      if (authError) {
        setError(authError.message || t('login.errors.registerFailed'))
        return
      }

      if (data.user) {
        setSuccess(t('login.success.registerSuccess'))
        // Email doğrulama gerekebilir
        setTimeout(() => {
          setActiveTab('login')
          setRegisterData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            acceptTerms: false,
          })
        }, 2000)
      }
    } catch (err) {
      setError(err.message || t('login.errors.registerFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <Navbar scrolled={scrolled} />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Logo ve Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-solar-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">PV</span>
                </div>
                <span className="text-3xl font-bold text-gray-900">PVGround</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('login.title')}
            </h1>
            <p className="text-gray-600">
              {t('login.subtitle')}
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => {
                  setActiveTab('login')
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('login.tabs.login')}
              </button>
              <button
                onClick={() => {
                  setActiveTab('register')
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                  activeTab === 'register'
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t('login.tabs.register')}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* Login Form */}
                {activeTab === 'login' && (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                  >
                    {/* Error/Success Messages */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {success}
                      </motion.div>
                    )}

                    {/* Email */}
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('login.form.email')}
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder={t('login.form.emailPlaceholder')}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('login.form.password')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="login-password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-12"
                          placeholder={t('login.form.passwordPlaceholder')}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {t('login.form.rememberMe')}
                        </span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {t('login.form.forgotPassword')}
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary-600 to-solar-orange text-white py-3 px-6 rounded-lg font-medium hover:from-primary-700 hover:to-solar-orange/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {loading ? t('login.form.submitting') : t('login.form.loginButton')}
                    </button>
                  </motion.form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleRegister}
                    className="space-y-6"
                  >
                    {/* Error/Success Messages */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {success}
                      </motion.div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('login.form.fullName')}
                      </label>
                      <input
                        type="text"
                        id="register-name"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder={t('login.form.fullNamePlaceholder')}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('login.form.email')}
                      </label>
                      <input
                        type="email"
                        id="register-email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder={t('login.form.emailPlaceholder')}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('login.form.password')}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="register-password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-12"
                          placeholder={t('login.form.passwordPlaceholder')}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {t('login.form.passwordHint')}
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('login.form.confirmPassword')}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="register-confirm-password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-12"
                          placeholder={t('login.form.confirmPasswordPlaceholder')}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="accept-terms"
                        checked={registerData.acceptTerms}
                        onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        required
                      />
                      <label htmlFor="accept-terms" className="ml-2 text-sm text-gray-600">
                        {t('login.form.acceptTerms')}{' '}
                        <Link to="/legal-notice" className="text-primary-600 hover:text-primary-700 font-medium">
                          {t('login.form.termsLink')}
                        </Link>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary-600 to-solar-orange text-white py-3 px-6 rounded-lg font-medium hover:from-primary-700 hover:to-solar-orange/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {loading ? t('login.form.submitting') : t('login.form.registerButton')}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              {t('login.backToHome')}
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login

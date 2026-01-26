import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

const Navbar = ({ scrolled }) => {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'products', href: '/#features', isLink: true },
    { key: 'solutions', href: '/#solutions', isLink: true },
    { key: 'about', href: '/#about', isLink: true },
    { key: 'pricing', href: '/pricing', isLink: true },
    { key: 'howToUse', href: '/how-to-use', isLink: true },
    { key: 'releaseNotes', href: '/release-notes', isLink: true },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-solar-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PV</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">PVGround</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  // Handle hash links - scroll after navigation
                  if (item.href.includes('#')) {
                    const hash = item.href.split('#')[1]
                    setTimeout(() => {
                      const element = document.getElementById(hash)
                      if (element) {
                        const offset = 80 // navbar height
                        const elementPosition = element.getBoundingClientRect().top
                        const offsetPosition = elementPosition + window.pageYOffset - offset
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        })
                      }
                    }, 100)
                  }
                }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <LanguageSelector />
            <Link to="/demo">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                {t('nav.requestDemo')}
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    // Handle hash links - scroll after navigation
                    if (item.href.includes('#')) {
                      setTimeout(() => {
                        const hash = item.href.split('#')[1]
                        const element = document.getElementById(hash)
                        if (element) {
                          const offset = 80 // navbar height
                          const elementPosition = element.getBoundingClientRect().top
                          const offsetPosition = elementPosition + window.pageYOffset - offset
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          })
                        }
                      }, 100)
                    }
                  }}
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="py-2">
                <LanguageSelector />
              </div>
              <Link
                to="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold text-center"
              >
                {t('nav.requestDemo')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar


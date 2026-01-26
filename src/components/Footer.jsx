import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
  const { t } = useTranslation()

  const footerLinks = {
    product: ['features', 'pricing', 'updates'],
    solutions: ['layout', 'modeling', 'analysis'],
    company: ['about', 'blog', 'careers', 'contact'],
    resources: ['docs', 'help', 'api', 'training'],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-solar-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PV</span>
              </div>
              <span className="text-2xl font-bold text-white">PVGround</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.products')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#features" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.product.features')}
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.product.pricing')}
                </a>
              </li>
              <li>
                <a href="/release-notes" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.product.updates')}
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.solutions')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#solutions" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.solutions.layout')}
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.solutions.modeling')}
                </a>
              </li>
              <li>
                <a href="/#solutions" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.solutions.analysis')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">{t('nav.about')}</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a href="/#about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.company.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.company.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.company.careers')}
                </a>
              </li>
              <li>
                <a href={`mailto:info@pvground.com?subject=${encodeURIComponent(t('footer.feedback.subject'))}`} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.feedback.title')}
                </a>
              </li>
            </ul>
            <h3 className="text-white font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.resources.docs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.resources.help')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.resources.api')}
                </a>
              </li>
              <li>
                <Link to="/how-to-use" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  {t('footer.links.resources.training')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PVGround. {t('footer.copyright')}
          </p>
          <div className="flex space-x-6">
            <a href="/legal-notice#privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              {t('footer.legal.privacy')}
            </a>
            <a href="/legal-notice#terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              {t('footer.legal.terms')}
            </a>
            <a href="/legal-notice#cookies" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              {t('footer.legal.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

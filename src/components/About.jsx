import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  const advantages = [
    { key: 'faster', stat: '90%+' },
    { key: 'accurate', stat: '90%+' },
    { key: 'smarter', stat: '30%+' },
  ]

  return (
    <section id="advantages" className="py-24 bg-gradient-to-b from-white to-primary-50/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/Hakkımızda.png"
                alt="PVGround About"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-solar-yellow rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary-400 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('advantages.title')} <span className="text-gradient">{t('advantages.titleHighlight')}</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {t('advantages.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('advantages.description2')}
              </p>
            </div>

            {/* Advantages */}
            <div className="space-y-6 pt-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{advantage.stat}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`advantages.advantages.${advantage.key}.title`)}</h3>
                    <p className="text-gray-600">{t(`advantages.advantages.${advantage.key}.description`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
            >
              {t('advantages.cta')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

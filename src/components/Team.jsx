import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Team = () => {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            {t('team.title')}
          </h2>

          <div className="flex flex-col items-center space-y-8">
            {/* Profile Image */}
            <motion.a
              href="https://www.linkedin.com/in/%C5%9F%C3%BCkr%C3%BCyi%C4%9Fit/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative cursor-pointer"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img
                  src="/images/profile.jpg"
                  alt={t('team.name')}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.a>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 max-w-3xl"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('team.name')}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('team.role')}
                </p>
              </div>

              <div className="text-gray-700 leading-relaxed space-y-4 text-left">
                <p>{t('team.bio.paragraph1')}</p>
                <p>{t('team.bio.paragraph2')}</p>
                <p>{t('team.bio.paragraph3')}</p>
                {t('team.bio.paragraph4') && <p>{t('team.bio.paragraph4')}</p>}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team


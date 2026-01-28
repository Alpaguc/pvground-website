import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Tüm PVGround lisansları için geçerlilik tarihi (1 Nisan 2026)
const EXPIRY_DATE = new Date('2026-04-01T00:00:00Z')

const Dashboard = () => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const [activeProduct, setActiveProduct] = useState('pvground')
  const [keys, setKeys] = useState([])
  const [loadingKeys, setLoadingKeys] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Kullanıcı oturumunu kontrol et
  useEffect(() => {
    const loadUser = async () => {
      if (!supabase) {
        navigate('/login')
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login')
        return
      }
      setUser(session.user)
    }

    loadUser()
  }, [navigate])

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    ''

  const getRemainingDays = () => {
    const now = new Date()
    const diffMs = EXPIRY_DATE.getTime() - now.getTime()
    if (diffMs <= 0) return 0
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  }

  const expiryDateText = EXPIRY_DATE.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Kullanıcının lisanslarını çek
  useEffect(() => {
    const loadKeys = async () => {
      if (!supabase || !user?.email) {
        setLoadingKeys(false)
        return
      }

      try {
        setLoadingKeys(true)
        setError('')

        // Email üzerinden eşleştiriyoruz (user_keys.email)
        // ilike → büyük/küçük harf duyarsız arama
        const { data, error: queryError } = await supabase
          .from('user_keys')
          .select('name,license_key,hwid,download_url')
          .ilike('email', user.email)

        if (queryError) {
          throw queryError
        }

        setKeys(data || [])
      } catch (err) {
        console.error('user_keys yüklenemedi:', err)
        setError('Lisans verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.')
      } finally {
        setLoadingKeys(false)
      }
    }

    loadKeys()
  }, [fullName])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrolled={scrolled} />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Hoş geldin{fullName ? `, ${fullName}` : ''} 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Buradan PVGround ve PVRoof lisanslarını ve indirme bağlantılarını yöneteceksin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sol Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Ürünler
              </h2>
              <button
                type="button"
                onClick={() => setActiveProduct('pvground')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeProduct === 'pvground'
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                PVGround
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct('pvroof')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeProduct === 'pvroof'
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                PVRoof
              </button>
            </motion.aside>

            {/* Sağ İçerik */}
            <motion.section
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {activeProduct === 'pvground' ? 'PVGround Lisansların' : 'PVRoof Lisansların'}
              </h2>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {activeProduct === 'pvground' ? (
                <>
                  {loadingKeys ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-600" />
                    </div>
                  ) : keys.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                      <p className="text-sm text-gray-600">
                        Bu hesap için kayıtlı PVGround lisansı bulunamadı.
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        Supabase üzerindeki <code className="rounded bg-gray-100 px-1">user_keys</code>{' '}
                        tablosunda <code className="rounded bg-gray-100 px-1">email</code> alanının
                        bu hesapta giriş yaptığın e-posta adresiyle aynı olduğundan emin olun.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {keys.map((key) => (
                        <div
                          key={key.license_key}
                          className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                              Lisans Key
                            </div>
                            <div className="mt-1 font-mono text-sm text-gray-900">
                              {key.license_key}
                            </div>
                            <div className="mt-3 text-xs text-gray-600 space-y-1">
                              <p>
                                <span className="font-semibold">Son geçerlilik tarihi:</span>{' '}
                                {expiryDateText}
                              </p>
                              <p>
                                <span className="font-semibold">Kalan süre:</span>{' '}
                                {getRemainingDays()} gün
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-stretch md:items-end gap-2">
                            <a
                              href={key.download_url || 'https://pvground.com/downloads/pvground-setup'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700"
                            >
                              PVGround Setup İndir
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                  <p className="text-sm text-gray-600">
                    PVRoof için henüz lisans sistemi eklenmedi. Hazır olduğunda burada
                    görüntülenecek.
                  </p>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard


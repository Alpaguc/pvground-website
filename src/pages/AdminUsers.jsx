import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AdminUsers = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterConfirmed, setFilterConfirmed] = useState('all')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Kullanıcı giriş kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setError('Supabase yapılandırılmamış')
        setLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/login')
        return
      }

      setCurrentUser(session.user)
      loadUsers()
    }

    checkAuth()
  }, [navigate])

  // Kullanıcıları yükle
  const loadUsers = async () => {
    if (!supabase) return

    try {
      setLoading(true)
      setError('')

      // Supabase Admin API kullanarak kullanıcıları çek
      // Not: Bu için service_role key gerekir, frontend'de anon key ile yapılamaz
      // Alternatif: Backend API endpoint'i oluşturmalısınız
      
      // Şimdilik sadece mevcut kullanıcıyı gösterelim
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUsers([{
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          email_confirmed_at: user.email_confirmed_at,
          user_metadata: user.user_metadata || {}
        }])
      }
    } catch (err) {
      setError(err.message || 'Kullanıcılar yüklenemedi')
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filtrelenmiş kullanıcılar
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.user_metadata?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterConfirmed === 'all' ||
                         (filterConfirmed === 'confirmed' && user.email_confirmed_at) ||
                         (filterConfirmed === 'unconfirmed' && !user.email_confirmed_at)
    
    return matchesSearch && matchesFilter
  })

  // Tarih formatla
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Çıkış yap
  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar scrolled={scrolled} />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrolled={scrolled} />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kullanıcı Yönetimi
            </h1>
            <p className="text-gray-600">
              Kayıtlı kullanıcıları görüntüleyin ve yönetin
            </p>
          </motion.div>

          {/* Bilgi Kutusu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-blue-900 font-medium mb-1">Önemli Not</h3>
                <p className="text-blue-800 text-sm">
                  Tüm kullanıcıları görmek için Supabase Dashboard'u kullanmanız gerekiyor. 
                  Bu sayfa sadece demo amaçlıdır. Tüm kullanıcıları görmek için: 
                  <a 
                    href="https://app.supabase.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline ml-1 font-medium"
                  >
                    Supabase Dashboard → Authentication → Users
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hata Mesajı */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Filtreler ve Arama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Arama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Ara
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Email veya ad soyad ile ara..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filtre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Doğrulama Durumu
                </label>
                <select
                  value={filterConfirmed}
                  onChange={(e) => setFilterConfirmed(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">Tümü</option>
                  <option value="confirmed">Doğrulanmış</option>
                  <option value="unconfirmed">Doğrulanmamış</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Kullanıcı Listesi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kullanıcı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kayıt Tarihi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Son Giriş
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        {loading ? 'Yükleniyor...' : 'Kullanıcı bulunamadı'}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.user_metadata?.full_name || 'İsimsiz'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.last_sign_in_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email_confirmed_at ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Doğrulanmış
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Beklemede
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-600 mb-1">Toplam Kullanıcı</div>
              <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-600 mb-1">Doğrulanmış</div>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.email_confirmed_at).length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-600 mb-1">Beklemede</div>
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => !u.email_confirmed_at).length}
              </div>
            </div>
          </motion.div>

          {/* Çıkış Butonu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Çıkış Yap
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminUsers

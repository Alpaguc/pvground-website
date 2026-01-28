import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const EnvTest = () => {
  const [envVars, setEnvVars] = useState({})
  const [supabaseStatus, setSupabaseStatus] = useState('')

  useEffect(() => {
    // Environment variables'ları kontrol et
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    setEnvVars({
      url: supabaseUrl || '❌ EKSIK',
      key: supabaseKey ? (supabaseKey.substring(0, 20) + '...') : '❌ EKSIK',
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseKey?.length || 0,
    })

    // Supabase client durumunu kontrol et
    if (supabase) {
      setSupabaseStatus('✅ Supabase client oluşturuldu')
    } else {
      setSupabaseStatus('❌ Supabase client oluşturulamadı')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Environment Variables Test</h1>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="font-semibold mb-2">VITE_SUPABASE_URL</h2>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm break-all">{envVars.url}</p>
              <p className="text-xs text-gray-500 mt-1">Uzunluk: {envVars.urlLength}</p>
            </div>
            {envVars.url === '❌ EKSIK' && (
              <p className="text-red-600 text-sm mt-2">
                ⚠️ Bu değişken eksik! .env dosyasına ekleyin.
              </p>
            )}
            {envVars.url?.includes('xxxxx') && (
              <p className="text-yellow-600 text-sm mt-2">
                ⚠️ Placeholder değer kullanılıyor! Gerçek Supabase URL'inizi ekleyin.
              </p>
            )}
          </div>

          <div className="border-b pb-4">
            <h2 className="font-semibold mb-2">VITE_SUPABASE_ANON_KEY</h2>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm break-all">{envVars.key}</p>
              <p className="text-xs text-gray-500 mt-1">Uzunluk: {envVars.keyLength}</p>
            </div>
            {envVars.key === '❌ EKSIK' && (
              <p className="text-red-600 text-sm mt-2">
                ⚠️ Bu değişken eksik! .env dosyasına ekleyin.
              </p>
            )}
            {envVars.key?.includes('your-anon-key') && (
              <p className="text-yellow-600 text-sm mt-2">
                ⚠️ Placeholder değer kullanılıyor! Gerçek Supabase key'inizi ekleyin.
              </p>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Supabase Client Durumu</h2>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm">{supabaseStatus}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Nasıl Düzeltilir?</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Supabase Dashboard → Settings → API</li>
              <li>Project URL ve anon public key'i kopyalayın</li>
              <li>Proje kök dizinindeki .env dosyasını açın</li>
              <li>Placeholder değerleri gerçek değerlerle değiştirin</li>
              <li>Dev sunucusunu yeniden başlatın (Ctrl+C, sonra npm run dev)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnvTest

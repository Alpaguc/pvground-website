// Supabase client oluştur
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Placeholder değerleri kontrol et
const isPlaceholder = 
  supabaseUrl.includes('xxxxx') || 
  supabaseAnonKey.includes('your-anon-key') ||
  supabaseAnonKey.includes('xxxxx')

// Supabase varsa ve placeholder değilse client oluştur
export const supabase = (supabaseUrl && supabaseAnonKey && !isPlaceholder) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Debug için (sadece development'ta)
if (import.meta.env.DEV) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables eksik!')
    console.warn('VITE_SUPABASE_URL:', supabaseUrl || 'EKSIK')
    console.warn('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Var' : 'EKSIK')
  } else if (isPlaceholder) {
    console.warn('⚠️ Supabase environment variables placeholder değerler içeriyor!')
    console.warn('.env dosyasını gerçek Supabase bilgileriyle güncelleyin.')
  } else {
    console.log('✅ Supabase client başarıyla oluşturuldu')
  }
}

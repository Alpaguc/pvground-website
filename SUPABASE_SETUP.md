# Supabase Kurulumu - Yorumlar için SQL Veritabanı

Netlify Functions serverless olduğu için SQLite kullanamayız. Supabase (PostgreSQL) kullanarak yorumları kalıcı olarak saklayabiliriz.

## 1. Supabase Hesabı Oluştur

1. https://supabase.com → Sign up (ücretsiz)
2. Yeni bir proje oluştur
3. Proje adı: "PVGround"
4. Database password belirle (kaydet!)

## 2. Veritabanı Tablosu Oluştur

Supabase Dashboard → SQL Editor → New Query:

```sql
-- Testimonials tablosu oluştur
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index oluştur (hızlı sorgular için)
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);

-- RLS (Row Level Security) ayarla - Herkes okuyabilsin, sadece authenticated yazabilsin
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Herkes onaylı yorumları okuyabilsin
CREATE POLICY "Anyone can read approved testimonials"
  ON testimonials FOR SELECT
  USING (status = 'approved');

-- Herkes yorum ekleyebilsin (anon key ile)
CREATE POLICY "Anyone can insert testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (true);
```

## 3. API Keys Al

1. Supabase Dashboard → Settings → API
2. **Project URL**'i kopyala (örn: `https://xxxxx.supabase.co`)
3. **anon/public key**'i kopyala (Frontend'de kullanılacak)
4. **service_role key**'i kopyala (Backend'de kullanılacak - GİZLİ!)

## 4. Environment Variables Ekle

Netlify Dashboard → Site settings → Environment variables:

- `SUPABASE_URL` = Project URL
- `SUPABASE_ANON_KEY` = anon/public key (Frontend için)
- `SUPABASE_SERVICE_KEY` = service_role key (Backend için - GİZLİ!)

## 5. Package.json'a Supabase Ekle

```bash
npm install @supabase/supabase-js
```

## 6. Test

1. Formu doldurup gönderin
2. Supabase Dashboard → Table Editor → testimonials
3. Yeni yorum görünmeli

## Notlar

- **Ücretsiz Plan:** 500MB veritabanı, 2GB bandwidth/ay
- **RLS:** Row Level Security aktif - güvenli
- **Otomatik Onay:** Yorumlar otomatik olarak `approved` durumunda kaydedilir
- **Dinamik İstatistikler:** Yorum sayısı ve yıldız ortalaması otomatik hesaplanır

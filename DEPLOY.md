# PVGround Web Sitesi - Yayınlama Rehberi

## Hosting Seçenekleri

### 1. Vercel (Önerilen - Ücretsiz)
**Avantajlar:**
- Ücretsiz plan
- Otomatik SSL sertifikası
- Otomatik build ve deploy
- CDN dahil
- Domain bağlama çok kolay
- GitHub entegrasyonu

**Adımlar:**
1. https://vercel.com adresine git
2. GitHub hesabınla giriş yap
3. Projeyi GitHub'a yükle (git push)
4. Vercel'de "New Project" tıkla
5. GitHub repo'nu seç
6. Build ayarları otomatik algılanır (Vite)
7. Domain'i bağla (Settings > Domains)

### 2. Netlify (Alternatif - Ücretsiz)
**Avantajlar:**
- Ücretsiz plan
- Otomatik SSL
- Drag & drop deploy seçeneği
- Form handling özellikleri

**Adımlar:**
1. https://netlify.com adresine git
2. Hesap oluştur
3. "Add new site" > "Deploy manually" veya GitHub bağla
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Domain'i bağla (Site settings > Domain management)

### 3. Cloudflare Pages (Ücretsiz)
**Avantajlar:**
- Ücretsiz plan
- Hızlı CDN
- Otomatik SSL
- GitHub entegrasyonu

### 4. VPS/Cloud Hosting (Ücretli)
**Seçenekler:**
- DigitalOcean ($6/ay)
- AWS Lightsail ($5/ay)
- Linode ($5/ay)
- Türkiye: Turhost, Natro, vs.

**Not:** VPS için Nginx kurulumu gerekir (daha teknik)

## Önerilen: Vercel

### Vercel ile Yayınlama Adımları

#### 1. Projeyi GitHub'a Yükle

```bash
# Git'i başlat (eğer yoksa)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit"

# GitHub'da yeni repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI_ADI/pvground-website.git
git branch -M main
git push -u origin main
```

#### 2. Vercel'e Bağla

1. https://vercel.com → Sign up (GitHub ile)
2. "Add New Project"
3. GitHub repo'nu seç
4. Framework Preset: **Vite** (otomatik algılanır)
5. Build Command: `npm run build` (otomatik)
6. Output Directory: `dist` (otomatik)
7. "Deploy" tıkla

#### 3. Domain Bağlama

1. Vercel Dashboard → Proje → Settings → Domains
2. Domain adını gir (örn: pvground.com)
3. DNS kayıtlarını ekle:
   - **A Record:** @ → 76.76.21.21
   - **CNAME:** www → cname.vercel-dns.com
4. Domain sağlayıcında DNS ayarlarını yap
5. SSL otomatik aktif olur (5-10 dakika)

## Domain DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vs.) şunları yapın:

### Vercel için:
- **A Record:** @ → 76.76.21.21
- **CNAME:** www → cname.vercel-dns.com

### Netlify için:
- **A Record:** @ → 75.2.60.5
- **CNAME:** www → your-site.netlify.app

## Build ve Deploy Komutları

### Lokal Test:
```bash
npm run build
npm run preview
```

### Production Build:
```bash
npm run build
# dist/ klasörü oluşur, bu klasörü hosting'e yükle
```

## Önemli Notlar

1. **SSL Sertifikası:** Vercel/Netlify otomatik verir (ücretsiz)
2. **CDN:** Otomatik dahil (hızlı yükleme)
3. **Otomatik Deploy:** GitHub'a push yapınca otomatik deploy
4. **Environment Variables:** Gerekirse Vercel'de ayarla

## Maliyet

- **Vercel/Netlify:** Ücretsiz (yeterli)
- **Domain:** ~$10-15/yıl
- **Toplam:** Sadece domain ücreti

## Sorun Giderme

### Build Hatası:
- `package.json` kontrol et
- Node.js versiyonu (18+ önerilir)

### Domain Bağlanmıyor:
- DNS propagasyonu 24-48 saat sürebilir
- DNS checker ile kontrol et: https://dnschecker.org

### SSL Sertifikası:
- Vercel/Netlify otomatik verir
- Manuel ayar gerekmez


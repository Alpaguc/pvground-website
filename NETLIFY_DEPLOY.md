# Netlify ile Yayınlama Rehberi

## Adım 1: Projeyi GitHub'a Yükle

```bash
# Git başlat (eğer yoksa)
git init

# Dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit"

# GitHub'da yeni repo oluştur (github.com'da)
# Sonra şu komutları çalıştır:
git remote add origin https://github.com/KULLANICI_ADI/pvground-website.git
git branch -M main
git push -u origin main
```

## Adım 2: Netlify'a Bağla

### Yöntem 1: GitHub ile (Önerilen)

1. https://app.netlify.com → Giriş yap
2. "Add new site" → "Import an existing project"
3. "Deploy with GitHub" tıkla
4. GitHub hesabını bağla (izin ver)
5. Repo'yu seç: `pvground-website`
6. Build ayarları otomatik algılanır:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. "Deploy site" tıkla

### Yöntem 2: Manuel Drag & Drop

1. Önce build yap:
```bash
npm run build
```

2. Netlify → "Add new site" → "Deploy manually"
3. `dist` klasörünü sürükle-bırak
4. Site yayınlanır

**Not:** Manuel yöntemde her değişiklikte tekrar yüklemen gerekir. GitHub yöntemi otomatik.

## Adım 3: Domain Bağlama

1. Netlify Dashboard → Site → **Site settings**
2. **Domain management** sekmesi
3. **Add custom domain** tıkla
4. Domain adını gir (örn: pvground.com)
5. DNS ayarlarını yap:

### DNS Kayıtları (Domain sağlayıcında)

Domain sağlayıcınızda (GoDaddy, Namecheap, vs.) şu kayıtları ekle:

**A Record:**
- **Name:** @ (veya boş)
- **Value:** 75.2.60.5
- **TTL:** 3600

**CNAME Record:**
- **Name:** www
- **Value:** your-site-name.netlify.app
- **TTL:** 3600

**Not:** Netlify size tam DNS adresini gösterecek.

### Netlify DNS Kullanma (Alternatif)

1. Netlify → Domain settings → **Use Netlify DNS**
2. Netlify size nameserver'ları verir (örn: dns1.p01.nsone.net)
3. Domain sağlayıcında nameserver'ları değiştir
4. Netlify otomatik DNS yönetir

## Adım 4: SSL Sertifikası

- Netlify **otomatik** SSL verir (Let's Encrypt)
- 5-10 dakika içinde aktif olur
- HTTPS otomatik çalışır

## Otomatik Deploy

GitHub'a her push yaptığında:
- Netlify otomatik build yapar
- Yeni versiyonu yayınlar
- Email bildirimi gönderir (isteğe bağlı)

## Önemli Dosyalar

- `netlify.toml` - Netlify ayarları (zaten hazır)
- `package.json` - Build komutları
- `dist/` - Build çıktısı (otomatik oluşur)

## Sorun Giderme

### Build Hatası:
- Netlify → Deploys → Build log kontrol et
- Node.js versiyonu: Netlify otomatik 18 kullanır
- Gerekirse: Site settings → Build & deploy → Environment → NODE_VERSION = 18

### Domain Bağlanmıyor:
- DNS propagasyonu 24-48 saat sürebilir
- https://dnschecker.org ile kontrol et
- Netlify DNS kullanırsan daha hızlı olur

### 404 Hatası:
- `netlify.toml` dosyası doğru mu kontrol et
- Redirects ayarları doğru olmalı

## Netlify Özellikleri

✅ **Ücretsiz Plan:**
- 100 GB bandwidth/ay
- 300 build dakikası/ay
- SSL sertifikası
- Form handling (100 submission/ay)
- Branch previews

✅ **Otomatik:**
- Build ve deploy
- SSL sertifikası
- CDN
- HTTPS redirect

## Hızlı Test

1. `npm run build` → `dist` klasörü oluşur
2. Netlify → Deploy manually → `dist` klasörünü yükle
3. Site canlı olur!


# Lokal Geliştirme Rehberi

## Lokal Sunucuyu Başlatma

### 1. Geliştirme Sunucusu

```bash
npm run dev
```

Bu komut:
- Vite geliştirme sunucusunu başlatır
- Site `http://localhost:3000` adresinde açılır
- **Hot Reload** aktif - Dosyalarda değişiklik yaptığınızda otomatik yenilenir
- Tarayıcıda anında değişiklikleri görürsünüz

### 2. Build Test (Production)

Değişikliklerin production'da nasıl görüneceğini test etmek için:

```bash
npm run build
npm run preview
```

Bu komutlar:
- Production build oluşturur
- `dist/` klasörüne derlenmiş dosyaları yazar
- Preview sunucusunu başlatır
- Netlify'da nasıl görüneceğini gösterir

## Çalışma Akışı

### Geliştirme Aşaması

1. **Sunucuyu başlat:**
   ```bash
   npm run dev
   ```

2. **Tarayıcıda aç:**
   - `http://localhost:3000` adresine git
   - Değişiklikler anında görünür

3. **Kod değişiklikleri yap:**
   - Dosyaları düzenle
   - Kaydet (Ctrl+S)
   - Tarayıcı otomatik yenilenir

4. **Test et:**
   - Tüm özellikleri kontrol et
   - Farklı dilleri test et
   - Responsive tasarımı kontrol et

### Production Build Test

Hazır olduğunda production build'i test et:

```bash
npm run build
npm run preview
```

Bu, Netlify'da nasıl görüneceğini gösterir.

## Git Kullanımı (Hazır Olduğunda)

### İlk Kez Push

```bash
# Git başlat (eğer yoksa)
git init

# Tüm değişiklikleri ekle
git add .

# Commit yap
git commit -m "PVGround website - Complete implementation"

# GitHub'da repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI/pvground-website.git
git branch -M main
git push -u origin main
```

### Sonraki Değişiklikler

Hazır olduğunda tek seferde:

```bash
git add .
git commit -m "Yapılan değişikliklerin açıklaması"
git push
```

## Önemli Notlar

### Gitignore

`.gitignore` dosyası zaten hazır:
- `node_modules/` - Yüklenmez
- `dist/` - Yüklenmez (Netlify otomatik build yapar)
- `.env` - Hassas bilgiler yüklenmez

### Dosya Yapısı

```
PvGround Website/
├── src/              # Kaynak kodlar (push edilir)
├── public/           # Statik dosyalar (push edilir)
├── node_modules/     # Yüklenmez (gitignore)
├── dist/            # Build çıktısı (yüklenmez)
└── package.json      # Push edilir
```

### Netlify Otomatik Deploy

GitHub'a push yaptığınızda:
- Netlify otomatik build yapar
- `npm install` çalıştırır
- `npm run build` çalıştırır
- `dist/` klasörünü yayınlar

## Sorun Giderme

### Port Zaten Kullanılıyor

Eğer `npm run dev` hata verirse:

```bash
# Farklı port kullan
npm run dev -- --port 3001
```

### Cache Sorunu

```bash
# Node modules'ü temizle
rm -rf node_modules
npm install
```

### Build Hatası

```bash
# Build log'ları kontrol et
npm run build

# Hataları düzelt
# Tekrar build et
npm run build
```

## Önerilen Çalışma Sırası

1. ✅ Lokal sunucuyu başlat (`npm run dev`)
2. ✅ Tüm değişiklikleri yap ve test et
3. ✅ Production build test et (`npm run build && npm run preview`)
4. ✅ Her şey hazır olduğunda Git'e push et
5. ✅ Netlify otomatik deploy yapar

## Hızlı Komutlar

```bash
# Geliştirme
npm run dev              # Lokal sunucu (http://localhost:3000)

# Production Test
npm run build            # Build oluştur
npm run preview          # Preview sunucusu

# Git (Hazır olduğunda)
git add .                # Tüm değişiklikleri ekle
git commit -m "Mesaj"    # Commit yap
git push                 # Push et
```


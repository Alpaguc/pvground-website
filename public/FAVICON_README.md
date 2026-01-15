# Favicon Ekleme Rehberi

## Mevcut Durum

✅ SVG favicon eklendi (`favicon.svg`)
✅ `index.html` güncellendi
✅ Manifest dosyası hazır

## Eksik Dosyalar (PNG Formatında)

Aşağıdaki PNG dosyalarını oluşturup `public/` klasörüne ekleyin:

1. **favicon-16x16.png** - 16x16 piksel
2. **favicon-32x32.png** - 32x32 piksel  
3. **apple-touch-icon.png** - 180x180 piksel (iOS için)
4. **favicon-192x192.png** - 192x192 piksel (Android için)
5. **favicon-512x512.png** - 512x512 piksel (PWA için)

## Favicon Oluşturma Yöntemleri

### Yöntem 1: Online Araçlar (Önerilen)

1. **Favicon.io**: https://favicon.io/
   - Text → "PV" yazın
   - Gradient: #0ea5e9 → #f97316
   - Background: Gradient
   - Download edin

2. **RealFaviconGenerator**: https://realfavicongenerator.net/
   - SVG favicon'u yükleyin
   - Tüm boyutları otomatik oluşturur

### Yöntem 2: Manuel Oluşturma

1. `public/favicon-generator.html` dosyasını tarayıcıda açın
2. İstediğiniz boyutları indirin
3. Dosyaları `public/` klasörüne kopyalayın

### Yöntem 3: Tasarım Programı

- Figma, Photoshop, Canva gibi programlarda:
  - 512x512 canvas oluşturun
  - Gradient background: #0ea5e9 → #f97316
  - Beyaz "PV" yazısı ekleyin
  - Farklı boyutlarda export edin

## Dosya Yapısı

```
public/
├── favicon.svg          ✅ (Hazır)
├── favicon-16x16.png    ⏳ (Eklenecek)
├── favicon-32x32.png    ⏳ (Eklenecek)
├── apple-touch-icon.png ⏳ (Eklenecek)
├── favicon-192x192.png  ⏳ (Eklenecek)
├── favicon-512x512.png  ⏳ (Eklenecek)
└── site.webmanifest     ✅ (Hazır)
```

## Test Etme

1. Tarayıcıda siteyi açın
2. Sekme üzerinde favicon görünmeli
3. F12 → Network → "favicon" filtrele
4. Tüm favicon dosyaları yüklenmeli

## Öneriler

- **Renkler:** Mavi (#0ea5e9) ve Turuncu (#f97316) gradient
- **Yazı:** "PV" veya "PVG" kısaltması
- **Stil:** Modern, yuvarlatılmış köşeler
- **Boyut:** Minimum 512x512'den başlayın, küçük boyutlara scale edin


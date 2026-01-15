# Görseller

Bu klasöre aşağıdaki görselleri ekleyin:

## Gerekli Görseller

1. **hero-image.jpg/png** (1200x800 önerilir)
   - Hero bölümü için ana görsel
   - `src/components/Hero.jsx` dosyasında kullanılacak

2. **features-image.jpg/png** (1400x600 önerilir)
   - Özellikler bölümü için görsel
   - `src/components/Features.jsx` dosyasında kullanılacak

3. **about-image.jpg/png** (1200x800 önerilir)
   - Hakkımızda bölümü için görsel
   - `src/components/About.jsx` dosyasında kullanılacak

## Görsel Önerileri

- Yüksek kaliteli görseller kullanın (min. 1920px genişlik)
- WebP formatı önerilir (daha küçük dosya boyutu)
- Görselleri optimize edin (TinyPNG, Squoosh gibi araçlarla)
- Güneş panelleri, arazi, 3D modeller gibi konularla ilgili görseller seçin

## Görselleri Ekleme

Görselleri ekledikten sonra, ilgili bileşen dosyalarındaki placeholder alanlarını güncelleyin:

```jsx
// Örnek: Hero.jsx
<img 
  src="/images/hero-image.jpg" 
  alt="PVGround Hero" 
  className="w-full h-full object-cover"
/>
```


# SSL/Güvenlik Sorunu Çözüm Rehberi

## "Site Güvenli Değil" Hatası Çözümleri

### 1. Netlify'da SSL Kontrolü

**Netlify Dashboard'da:**
1. Site → **Site settings** → **Domain management**
2. Custom domain'in yanında SSL durumunu kontrol et
3. Eğer "Pending" ise, 5-10 dakika bekleyin
4. "Provisioning" ise, SSL aktif oluyor demektir

### 2. HTTPS Redirect Kontrolü

`netlify.toml` dosyasına HTTPS redirect eklendi. Şimdi:
- Tüm HTTP istekleri otomatik HTTPS'e yönlendirilir
- SSL sertifikası otomatik aktif olur

### 3. Domain DNS Ayarları

**Önemli:** Domain DNS ayarları tamamlanmadan SSL aktif olmaz!

**Netlify DNS kullanıyorsanız:**
1. Domain settings → **Use Netlify DNS**
2. Nameserver'ları domain sağlayıcıda güncelle
3. 24-48 saat içinde SSL aktif olur

**Kendi DNS kullanıyorsanız:**
- A Record: @ → 75.2.60.5
- CNAME: www → your-site.netlify.app
- DNS propagasyonu 24-48 saat sürebilir

### 4. SSL Sertifikası Yenileme

Eğer SSL hala aktif değilse:
1. Site settings → Domain management
2. Domain'in yanında "..." menüsü
3. "Renew certificate" seçeneğini tıkla
4. 5-10 dakika bekleyin

### 5. Mixed Content Kontrolü

Tarayıcı console'da (F12) kontrol edin:
- "Mixed Content" hatası var mı?
- HTTP ile yüklenen kaynak var mı?

**Çözüm:**
- Tüm external kaynaklar HTTPS olmalı
- `index.html`'deki Google Fonts zaten HTTPS

### 6. Tarayıcı Cache Temizleme

Bazı kullanıcılarda eski cache olabilir:
- Ctrl + Shift + Delete → Cache temizle
- Veya Incognito/Private mode'da test et

### 7. Güvenlik Header'ları

`netlify.toml` dosyasına güvenlik header'ları eklendi:
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security
- vs.

## Test Etme

1. **HTTPS Kontrolü:**
   ```
   https://your-domain.com
   ```

2. **HTTP Redirect:**
   ```
   http://your-domain.com → otomatik HTTPS'e yönlendirilmeli
   ```

3. **SSL Test:**
   - https://www.ssllabs.com/ssltest/
   - Domain'inizi test edin

## Yaygın Sorunlar

### Sorun: "NET::ERR_CERT_AUTHORITY_INVALID"
**Çözüm:** SSL sertifikası henüz aktif olmamış, 10-15 dakika bekleyin

### Sorun: "Mixed Content" hatası
**Çözüm:** Tüm kaynaklar HTTPS olmalı, kodda HTTP kullanımı yok

### Sorun: Bazı kullanıcılarda çalışıyor, bazılarında çalışmıyor
**Çözüm:** DNS propagasyonu veya cache sorunu, 24 saat bekleyin

## Netlify SSL Özellikleri

✅ **Otomatik SSL:** Let's Encrypt sertifikası otomatik verilir
✅ **Otomatik Yenileme:** Sertifikalar otomatik yenilenir
✅ **HTTPS Redirect:** HTTP otomatik HTTPS'e yönlendirilir
✅ **HSTS:** Strict Transport Security aktif

## İletişim

Eğer sorun devam ederse:
1. Netlify Support: support@netlify.com
2. Netlify Community: community.netlify.com


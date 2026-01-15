# Email Gönderme Kurulum Rehberi

## Seçenek 1: Netlify Forms (Önerilen - Ücretsiz)

Netlify kullandığınız için en kolay yöntem. **Ayrı email almanıza gerek yok!**

### Avantajlar:
- ✅ Ücretsiz (ayda 100 form submission)
- ✅ Ekstra email hesabı gerekmez
- ✅ Spam koruması otomatik
- ✅ Email bildirimleri otomatik
- ✅ Netlify dashboard'da görüntülenebilir

### Kurulum:

1. **Form'a `netlify` attribute ekle:**
   - `src/pages/DemoRequest.jsx` dosyasında form'a `data-netlify="true"` ekleyin
   - Zaten ekledim! ✅

2. **Netlify'da Email Ayarları:**
   - Netlify Dashboard → Site settings → Forms
   - "Form notifications" bölümüne git
   - "Add notification" → "Email notification"
   - Email adresi: `yt.sukru@gmail.com`
   - Kaydet

3. **Hazır!** Form gönderildiğinde otomatik email gelir.

---

## Seçenek 2: EmailJS (Alternatif - Ücretsiz)

Frontend'den direkt email gönderebilirsiniz.

### Avantajlar:
- ✅ Ücretsiz (ayda 200 email)
- ✅ Backend gerekmez
- ✅ Hızlı kurulum

### Kurulum:

1. **EmailJS Hesabı Oluştur:**
   - https://www.emailjs.com/ → Sign up (ücretsiz)

2. **Email Servisi Bağla:**
   - Dashboard → Email Services → Add New Service
   - Gmail seç (veya başka bir servis)
   - Gmail hesabınızı bağla

3. **Email Template Oluştur:**
   - Templates → Create New Template
   - Template ID'yi kopyala

4. **Public Key Al:**
   - Account → General → Public Key

5. **Kodu Güncelle:**
   - `src/pages/DemoRequest.jsx` dosyasındaki EmailJS kodunu güncelle
   - Service ID, Template ID ve Public Key'i ekle

---

## Seçenek 3: Kendi Domain Email'i (İsteğe Bağlı)

Eğer `info@pvground.com` gibi profesyonel bir email isterseniz:

### Seçenekler:
1. **Google Workspace** (~$6/ay)
2. **Zoho Mail** (ücretsiz plan var)
3. **Microsoft 365** (~$5/ay)

**Not:** Netlify Forms ile `yt.sukru@gmail.com` kullanabilirsiniz, ayrı email gerekmez!

---

## Önerilen: Netlify Forms

En kolay ve ücretsiz çözüm. Sadece Netlify dashboard'da email adresini ayarlayın, hazır!


# EmailJS Kurulum Rehberi

Form gönderimlerinin `yt.sukru@gmail.com` adresine e-posta olarak gelmesi için EmailJS kurulumu:

## Adım 1: EmailJS Hesabı Oluştur

1. https://www.emailjs.com/ adresine gidin
2. "Sign Up" ile ücretsiz hesap oluşturun
3. Gmail hesabınızla giriş yapabilirsiniz

## Adım 2: Email Servisi Bağla

1. EmailJS Dashboard → **Email Services** → **Add New Service**
2. **Gmail** seçin
3. Gmail hesabınızı bağlayın (`yt.sukru@gmail.com`)
4. **Service ID**'yi kopyalayın (örn: `service_xxxxx`)

## Adım 3: Email Template Oluştur

1. Dashboard → **Email Templates** → **Create New Template**
2. Template adı: "PVGround Key Request"
3. Aşağıdaki template'i kullanın:

```
Subject: PVGround - Key Talep Formu

Yeni bir key talebi alındı:

Ad Soyad: {{from_name}}
E-posta: {{from_email}}
Şirket: {{company}}
Telefon: {{phone}}
Pozisyon: {{job_title}}

Mesaj:
{{message}}

---
Bu e-posta PVGround web sitesinden otomatik olarak gönderilmiştir.
```

4. **Template ID**'yi kopyalayın (örn: `template_xxxxx`)

## Adım 4: Public Key Al

1. Dashboard → **Account** → **General**
2. **Public Key**'i kopyalayın

## Adım 5: Environment Variables Ekle

Proje root dizininde `.env` dosyası oluşturun (veya mevcut olanı güncelleyin):

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Önemli:** `.env` dosyasını `.gitignore`'a ekleyin (zaten ekli olmalı)

## Adım 6: Test Et

1. Formu doldurun ve gönderin
2. `yt.sukru@gmail.com` adresine e-posta gelmeli
3. Gelen kutunuzu kontrol edin

## Alternatif: Doğrudan Kod İçinde Ayarlama

Eğer environment variable kullanmak istemezseniz, `src/pages/DemoRequest.jsx` dosyasındaki şu satırları güncelleyin:

```javascript
const serviceId = 'service_xxxxx'  // EmailJS Service ID
const templateId = 'template_xxxxx'  // EmailJS Template ID
const publicKey = 'your_public_key'  // EmailJS Public Key
```

## Notlar

- EmailJS ücretsiz plan: Ayda 200 e-posta
- E-postalar anında gönderilir
- Localhost'ta da çalışır
- Spam koruması otomatik

## Sorun Giderme

- E-posta gelmiyorsa: Spam klasörünü kontrol edin
- Hata alıyorsanız: Service ID, Template ID ve Public Key'in doğru olduğundan emin olun
- Template'deki değişken isimlerinin doğru olduğundan emin olun


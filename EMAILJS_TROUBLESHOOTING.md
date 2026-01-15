# EmailJS Sorun Giderme Rehberi

E-posta gelmiyorsa aşağıdaki adımları kontrol edin:

## 1. EmailJS Template Ayarları

EmailJS Dashboard → Templates → `template_x1ow6of` → Edit

### Template İçeriği Şöyle Olmalı:

**Subject:**
```
PVGround - Key Talep Formu
```

**Content:**
```
Yeni bir key talebi alındı:

Ad Soyad: {{from_name}}
E-posta: {{from_email}}
Şirket: {{company}}
Telefon: {{phone}}
Pozisyon: {{job_title}}

Mesaj:
{{message}}
```

### ÖNEMLİ: Template Ayarları

1. **"To Email" Alanı:**
   - Template ayarlarında (Settings) "To Email" alanına `yt.sukru@gmail.com` yazın
   - VEYA template içinde `{{to_email}}` kullanın (kod zaten gönderiyor)

2. **"From Name" Alanı:**
   - `{{from_name}}` veya boş bırakın

3. **"Reply To" Alanı:**
   - `{{from_email}}` yazın (kullanıcının e-postasına cevap verebilmek için)

## 2. Email Service Ayarları

EmailJS Dashboard → Email Services → `service_i3sedon` → Edit

- Gmail hesabınızın (`yt.sukru@gmail.com`) bağlı olduğundan emin olun
- Service'in "Active" durumunda olduğundan emin olun

## 3. Browser Console Kontrolü

1. Formu gönderin
2. Browser'da F12 tuşuna basın → Console sekmesine gidin
3. Şu logları görmelisiniz:
   - `EmailJS Ayarları: { serviceId: '...', templateId: '...' }`
   - `Form Verileri: { ... }`
   - `EmailJS Başarılı: { ... }` VEYA `EmailJS Hata Detayları: ...`

## 4. Yaygın Hatalar

### Hata: "Invalid public key"
- Public Key'in doğru olduğundan emin olun
- `.env` dosyasında boşluk olmamalı

### Hata: "Template not found"
- Template ID'nin doğru olduğundan emin olun
- Template'in "Active" durumunda olduğundan emin olun

### Hata: "Service not found"
- Service ID'nin doğru olduğundan emin olun
- Service'in Gmail ile bağlı olduğundan emin olun

### E-posta geliyor ama spam klasöründe
- Gmail spam klasörünü kontrol edin
- EmailJS'den gelen e-postaları "Spam Değil" olarak işaretleyin

## 5. Test

1. Development server'ı yeniden başlatın:
   ```bash
   npm run dev
   ```

2. Formu doldurup gönderin

3. Console'da hata var mı kontrol edin

4. EmailJS Dashboard → Logs → Son gönderimleri kontrol edin

## 6. EmailJS Dashboard Logs

EmailJS Dashboard → Logs sekmesinde:
- Başarılı gönderimler yeşil ✓ işareti ile görünür
- Hatalı gönderimler kırmızı ✗ işareti ile görünür
- Hata mesajını buradan görebilirsiniz

## 7. Alternatif: Template'de To Email Sabit

Eğer template'de `{{to_email}}` çalışmıyorsa:

1. Template Settings → "To Email" alanına direkt `yt.sukru@gmail.com` yazın
2. Kodda `to_email` parametresini kaldırın (zaten template'de sabit)


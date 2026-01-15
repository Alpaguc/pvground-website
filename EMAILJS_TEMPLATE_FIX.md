# EmailJS Template Ayarları - Düzeltme

## Şu Anki Yanlış Ayarlar:
- **To Email**: `{{email}}` ❌
- **From Name**: `{{from_email}}` ❌
- **From Email**: `{{company}}` ❌ (Bu bir e-posta değil!)
- **Reply To**: `yt.sukru@gmail.com` ⚠️ (Sabit, ama `{{from_email}}` olmalı)

## Doğru Ayarlar:

### 1. To Email
**Değer:** `yt.sukru@gmail.com` (sabit olarak yazın)
VEYA
**Değer:** `{{to_email}}` (kod zaten gönderiyor)

**Önerilen:** `yt.sukru@gmail.com` (sabit yazın, daha güvenli)

### 2. From Name
**Değer:** `{{from_name}}`
(Bu, formdan gelen kullanıcının adı soyadı)

### 3. From Email
**Değer:** BOŞ BIRAKIN veya EmailJS servisinin varsayılan e-postasını kullanın
**VEYA** "Use Default Email Address" checkbox'ını işaretleyin

**ÖNEMLİ:** `{{company}}` YAZMAYIN! Bu bir e-posta adresi değil, şirket adı.

### 4. Reply To
**Değer:** `{{from_email}}`
(Bu, kullanıcının e-postasına cevap verebilmek için)

### 5. Subject
**Değer:** `PVGround - Key Talep Formu`
VEYA
**Değer:** `{{subject}}` (kod zaten gönderiyor)

## Template İçeriği (Content):

```
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

## Adım Adım:

1. EmailJS Dashboard → Templates → `template_x1ow6of` → Edit
2. **To Email** alanına: `yt.sukru@gmail.com` yazın
3. **From Name** alanına: `{{from_name}}` yazın
4. **From Email** alanını: BOŞ BIRAKIN veya "Use Default Email Address" işaretleyin
5. **Reply To** alanına: `{{from_email}}` yazın
6. **Subject** alanına: `PVGround - Key Talep Formu` yazın
7. **Content** (Template içeriği) alanına yukarıdaki template'i yazın
8. **Save** butonuna tıklayın

## Test:

1. Formu gönderin
2. `yt.sukru@gmail.com` adresine e-posta gelmeli
3. E-postayı açın ve "Reply" butonuna tıklayın
4. Reply To adresi kullanıcının e-postası olmalı ({{from_email}})


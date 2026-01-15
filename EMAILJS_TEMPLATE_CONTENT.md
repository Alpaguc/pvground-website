# EmailJS Template İçeriği - Doğru Ayarlar

## Template Settings (Ayarlar):

### To Email
`yt.sukru@gmail.com` (sabit)

### From Name
`{{from_name}}`

### From Email
Boş bırakın veya "Use Default Email Address" işaretleyin

### Reply To
`{{from_email}}`

### Subject
`PVGround - Key Talep Formu`

---

## Template Content (İçerik):

**ÖNEMLİ:** Template içeriğinde form bilgilerini gösterin:

```
Yeni bir key talebi alındı!

Ad Soyad: {{from_name}}
E-posta: {{from_email}}
Şirket: {{company}}
Telefon: {{phone}}
Pozisyon: {{job_title}}

Mesaj:
{{message}}

---
Bu e-posta PVGround web sitesinden otomatik olarak gönderilmiştir.
Formu dolduran: {{from_name}} ({{from_email}})
```

## HTML Versiyonu (Daha Güzel Görünüm İçin):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2563eb;">Yeni Bir Key Talebi Alındı!</h2>
  
  <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Ad Soyad:</strong> {{from_name}}</p>
    <p><strong>E-posta:</strong> {{from_email}}</p>
    <p><strong>Şirket:</strong> {{company}}</p>
    <p><strong>Telefon:</strong> {{phone}}</p>
    <p><strong>Pozisyon:</strong> {{job_title}}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="color: #2563eb;">Mesaj:</h3>
    <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
      {{message}}
    </p>
  </div>
  
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  
  <p style="color: #6b7280; font-size: 12px;">
    Bu e-posta PVGround web sitesinden otomatik olarak gönderilmiştir.<br>
    Formu dolduran: {{from_name}} ({{from_email}})
  </p>
</div>
```

## Adım Adım:

1. EmailJS Dashboard → Templates → `template_x1ow6of` → Edit
2. **Content** (Template içeriği) alanına yukarıdaki içeriği yapıştırın
3. **Save** butonuna tıklayın
4. Test edin - Form gönderildiğinde `yt.sukru@gmail.com` adresine form bilgileri gelecek


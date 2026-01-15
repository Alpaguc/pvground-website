# Formspree Kurulum Rehberi

Web3Forms'un ücretsiz planında kullanıcıya otomatik onay e-postası gönderme özelliği yok. Formspree'ye geçiyoruz.

## Formspree Avantajları

- ✅ Ücretsiz plan: Ayda 50 form submission
- ✅ İki ayrı e-posta gönderebilme (size ve kullanıcıya)
- ✅ Spam koruması otomatik
- ✅ Kolay kurulum

## Kurulum Adımları

1. **Formspree Hesabı Oluştur:**
   - https://formspree.io/ → Sign up (ücretsiz)

2. **Yeni Form Oluştur:**
   - Dashboard → New Form
   - Form adı: "PVGround Key Request"
   - Form endpoint'ini kopyala (örn: `https://formspree.io/f/xxxxx`)

3. **Auto Responder Ayarla:**
   - Form ayarları → Auto Responder
   - Enable Auto Responder
   - Subject: "PVGround - Talebiniz Alındı"
   - Message: Onay mesajını yaz

4. **API Key Al:**
   - Account → Settings → API Keys
   - Yeni API key oluştur

5. **Kodu Güncelle:**
   - `src/pages/DemoRequest.jsx` dosyasını Formspree API'sine göre güncelle

## Alternatif: Resend (Daha Fazla Ücretsiz Email)

Resend de kullanılabilir:
- Ücretsiz: Ayda 3000 e-posta
- Modern API
- İki ayrı e-posta gönderebilme

Hangisini tercih edersiniz?


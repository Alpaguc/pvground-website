# Airtable Kurulum Rehberi - Tekrar Key Talebi Kontrolü

Aynı e-posta adresi ile tekrar key talep edilip edilmediğini kontrol etmek için Airtable kullanıyoruz.

## Adım 1: Airtable Hesabı Oluştur

1. https://airtable.com/ → Sign up (ücretsiz)
2. Yeni bir Base oluştur
3. Base adı: "PVGround Key Requests"

## Adım 2: Tablo Oluştur

1. Tablo adı: "Key Requests"
2. Şu kolonları ekle:
   - **Email** (Single line text) - Primary field
   - **Name** (Single line text)
   - **Company** (Single line text)
   - **Request Date** (Date)

## Adım 3: API Key ve Base ID Al

1. https://airtable.com/api → API documentation
2. Base'i seç: "PVGround Key Requests"
3. **Base ID**'yi kopyala (örn: `appXXXXXXXXXXXXXX`)
4. https://airtable.com/account → Personal access tokens
5. Yeni token oluştur → **API Key**'i kopyala

## Adım 4: Netlify Environment Variables Ekle

1. Netlify Dashboard → Site settings → Environment variables
2. Şu değişkenleri ekle:
   - `AIRTABLE_API_KEY` = API Key'iniz
   - `AIRTABLE_BASE_ID` = Base ID'niz

## Adım 5: Test Et

1. Formu gönderin
2. Airtable'da kayıt görünmeli
3. Aynı e-posta ile tekrar gönderin
4. E-postada "TEKRAR KEY TALEBİ" uyarısı görünmeli

## Alternatif: Airtable Olmadan

Eğer Airtable kullanmak istemezseniz:
- Netlify Functions basit bir JSON dosyası kullanabilir
- Veya Web3Forms'un submission geçmişini manuel kontrol edebilirsiniz

## Not

Airtable ayarlanmamışsa, sistem çalışmaya devam eder ama tekrar kontrolü yapılmaz.


# Airtable Testimonials Kurulumu

## 1. Airtable Base Oluşturma

1. Airtable hesabınıza giriş yapın
2. Yeni bir base oluşturun veya mevcut base'i kullanın
3. Yeni bir tablo oluşturun: **"Testimonials"**

## 2. Tablo Alanları (Fields)

Testimonials tablosunda aşağıdaki alanları oluşturun:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Name | Single line text | - |
| Role | Single line text | - |
| Company | Single line text | - |
| Content | Long text | - |
| Rating | Number | Format: Integer (1-5) |
| Status | Single select | Options: `Pending`, `Approved`, `Rejected` |
| Created | Date | Include time: Yes |

## 3. Environment Variables

Netlify Dashboard'da environment variables ekleyin:

- `AIRTABLE_API_KEY`: Airtable API anahtarınız
- `AIRTABLE_BASE_ID`: Base ID'niz (Base URL'den alabilirsiniz)

## 4. Test

1. Testimonials bölümüne scroll yapın
2. 2 saniye sonra sağ altta popup görünecek
3. Formu doldurup gönderin
4. Yorumlar "Pending" durumunda kaydedilecek
5. Admin onayından sonra "Approved" yapılarak yayınlanacak

## 5. Yorumları Yayınlama

Yorumları yayınlamak için:
1. Airtable'da Testimonials tablosuna gidin
2. Yorumun Status alanını "Approved" olarak değiştirin
3. Yorumlar otomatik olarak sitede görünecek

## Not

- Yorumlar admin onayından sonra yayınlanır
- Status alanı "Approved" olan yorumlar görünür
- Yorumlar oluşturulma tarihine göre sıralanır (en yeni önce)


// Yorumları localStorage benzeri bir JSON dosyasına kaydet
// Not: Netlify Functions'da dosya sistemi geçici olduğu için
// gerçek bir veritabanı (Supabase, MongoDB, vb.) kullanmak daha iyi olur

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod === 'POST') {
    try {
      const { name, role, company, content, rating } = JSON.parse(event.body)

      if (!name || !content || !rating) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name, content, and rating are required' }),
        }
      }

      // Yeni yorum oluştur
      const newTestimonial = {
        id: Date.now().toString(),
        name,
        role: role || '',
        company: company || '',
        content,
        rating: parseInt(rating),
        created: new Date().toISOString(),
        status: 'approved', // Otomatik onaylı
      }

      // Başarılı döndür - Frontend localStorage'a kaydedecek
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, testimonial: newTestimonial }),
      }
    } catch (error) {
      console.error('Submit testimonial error:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to submit testimonial' }),
      }
    }
  }

  if (event.httpMethod === 'GET') {
    try {
      // Frontend localStorage'dan okuyacak, burada boş döndür
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, testimonials: [] }),
      }
    } catch (error) {
      console.error('Get testimonials error:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch testimonials' }),
      }
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  }
}

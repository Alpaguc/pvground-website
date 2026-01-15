// Yorumları localStorage'dan oku
// Not: Frontend localStorage kullanıyor, backend sadece proxy

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    // Frontend localStorage'dan okuyacak, burada boş döndür
    // Gerçek veritabanı için Supabase kullanılmalı
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


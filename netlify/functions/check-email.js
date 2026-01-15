// Netlify Function - E-posta adresinin daha önce key talep edip etmediğini kontrol eder
// Airtable kullanarak veritabanı kontrolü yapar

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // OPTIONS request için
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  // Sadece POST isteklerini kabul et
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { email } = JSON.parse(event.body)
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email is required' }),
      }
    }

    // Airtable API Key ve Base ID (environment variables'dan alınacak)
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_TABLE_NAME = 'Key Requests'

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      // Airtable ayarlanmamışsa, basit bir kontrol yap
      // Şimdilik false döndür (her zaman yeni kabul et)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          exists: false,
          message: 'Airtable not configured, accepting all requests'
        }),
      }
    }

    // Airtable'da e-posta adresini ara
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={Email}="${email}"`
    
    const response = await fetch(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    const exists = data.records && data.records.length > 0

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        exists,
        count: exists ? data.records.length : 0
      }),
    }
  } catch (error) {
    console.error('Error checking email:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}


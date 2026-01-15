// Netlify Function - E-posta adresini Airtable'a kaydeder

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
    const { email, name, company } = JSON.parse(event.body)
    
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
      // Airtable ayarlanmamışsa, başarılı döndür (kayıt yapmadan)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: 'Airtable not configured, skipping save'
        }),
      }
    }

    // Airtable'a kayıt ekle
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`
    
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{
          fields: {
            'Email': email,
            'Name': name || '',
            'Company': company || '',
            'Request Date': new Date().toISOString(),
          }
        }]
      }),
    })

    const data = await response.json()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        record: data
      }),
    }
  } catch (error) {
    console.error('Error saving email:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}


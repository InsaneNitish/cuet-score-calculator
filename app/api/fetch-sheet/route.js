import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { url } = await req.json();
    
    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL provided. Please provide a valid Digialm URL.' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch response sheet: ${response.status} ${response.statusText}` }, 
        { status: response.status }
      );
    }

    const htmlString = await response.text();
    
    // Return the raw HTML string
    return new NextResponse(htmlString, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while fetching the URL.' }, 
      { status: 500 }
    );
  }
}

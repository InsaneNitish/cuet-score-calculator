import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Create a fresh client per request to avoid stale connections
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) return null;
  
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
    },
  });
}

export async function GET(req) {
  try {
    const supabase = getSupabase();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase Database is not configured. Please add the .env.local variables.' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const paper = searchParams.get('paper');

    if (!paper) {
      return NextResponse.json({ error: 'Paper query parameter is required' }, { status: 400 });
    }

    // Fetch from Supabase sorted by score securely Server-Side
    const { data, error, count } = await supabase
      .from('leaderboard')
      .select('name, rollNo, score, paper', { count: 'exact' })
      .eq('paper', paper.trim())
      .order('score', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to fetch top ranks" }, { status: 500 });
    }

    console.log(`[Leaderboard API] Paper=${paper}, Records returned=${data?.length}, Count=${count}`);

    // Sanitize: Keep rollNo for client-side rank matching only, NOT displayed in UI
    const sanitizedData = (data || []).map(entry => ({
      score: entry.score,
      paper: entry.paper,
      rollNo: entry.rollNo,
    }));

    return NextResponse.json({ leaderboard: sanitizedData }, { status: 200 });
  } catch (error) {
    console.error('Fetch leaderboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

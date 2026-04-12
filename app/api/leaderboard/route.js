import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase Database is not configured. Please add the .env.local variables.' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const paper = searchParams.get('paper');

    if (!paper) {
      return NextResponse.json({ error: 'Paper query parameter is required' }, { status: 400 });
    }

    // Fetch from Supabase sorted by score securely Server-Side
    const { data, error } = await supabase
      .from('leaderboard')
      .select('name, rollNo, score, paper')
      .eq('paper', paper.trim())
      .order('score', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to fetch top ranks" }, { status: 500 });
    }

    return NextResponse.json({ leaderboard: data || [] }, { status: 200 });
  } catch (error) {
    console.error('Fetch leaderboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

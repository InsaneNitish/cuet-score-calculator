import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(req) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase Database is not configured. Please add the .env.local variables.' }, { status: 500 });
    }

    const body = await req.json();
    const { name, rollNo, paper, score } = body;

    if (!name || !rollNo || typeof score !== 'number' || !paper) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Step 1: Check if an entry already exists for this roll number and paper
    const { data: existingData, error: fetchError } = await supabase
      .from('leaderboard')
      .select('id')
      .eq('rollNo', rollNo)
      .eq('paper', paper)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the "0 rows returned" code
      console.error("Fetch Error:", fetchError);
      return NextResponse.json({ error: "Failed to query database." }, { status: 500 });
    }

    if (existingData) {
      // Step 2: Update existing submission
      const { error: updateError } = await supabase
        .from('leaderboard')
        .update({ score, name })
        .eq('id', existingData.id);
      
      if (updateError) throw updateError;
    } else {
      // Step 3: Insert new submission
      const { error: insertError } = await supabase
        .from('leaderboard')
        .insert([{ name, rollNo, paper, score }]);
      
      if (insertError) throw insertError;
    }

    return NextResponse.json({ message: 'Score saved securely to Supabase' }, { status: 200 });
  } catch (error) {
    console.error('Save score error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

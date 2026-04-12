import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(req) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase Database is not configured.' }, { status: 500 });
    }

    const body = await req.json();
    const { subject_code, subject_name, contributor_name, raw_text } = body;

    // Validation
    if (!subject_code || !subject_name || !raw_text) {
      return NextResponse.json({ error: 'Missing required fields (Code, Name, or Raw Text).' }, { status: 400 });
    }

    // Insert into DB securely
    const { data, error } = await supabase
      .from('contributed_keys')
      .insert([
        {
          subject_code: subject_code.trim().toUpperCase(),
          subject_name: subject_name.trim(),
          contributor_name: contributor_name?.trim() || null,
          raw_text: raw_text.trim()
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to submit answer key to database." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Contribution Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

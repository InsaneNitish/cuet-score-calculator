require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  // 1. Fetch ALL records (no filter)
  console.log("=== ALL RECORDS IN LEADERBOARD TABLE ===");
  const { data: allData, error: allError } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false });
  
  if (allError) {
    console.error("ERROR:", allError);
  } else {
    console.log(`Total records: ${allData.length}`);
    allData.forEach((r, i) => {
      console.log(`  [${i+1}] name=${r.name}, rollNo=${r.rollNo}, paper=${r.paper}, score=${r.score}`);
    });
  }

  // 2. Fetch only SCQP09
  console.log("\n=== SCQP09 RECORDS ===");
  const { data: scData, error: scError } = await supabase
    .from('leaderboard')
    .select('name, rollNo, score, paper')
    .eq('paper', 'SCQP09')
    .order('score', { ascending: false });
  
  if (scError) {
    console.error("ERROR:", scError);
  } else {
    console.log(`SCQP09 records: ${scData.length}`);
    scData.forEach((r, i) => console.log(`  [${i+1}] ${r.name} | ${r.rollNo} | ${r.score}`));
  }

  // 3. Fetch only MTQP04
  console.log("\n=== MTQP04 RECORDS ===");
  const { data: mtData, error: mtError } = await supabase
    .from('leaderboard')
    .select('name, rollNo, score, paper')
    .eq('paper', 'MTQP04')
    .order('score', { ascending: false });
  
  if (mtError) {
    console.error("ERROR:", mtError);
  } else {
    console.log(`MTQP04 records: ${mtData.length}`);
    mtData.forEach((r, i) => console.log(`  [${i+1}] ${r.name} | ${r.rollNo} | ${r.score}`));
  }

  // 4. Test the exact API response
  console.log("\n=== SIMULATING API CALL (SCQP09) ===");
  const { data: apiData, error: apiError } = await supabase
    .from('leaderboard')
    .select('name, rollNo, score, paper')
    .eq('paper', 'SCQP09'.trim())
    .order('score', { ascending: false });
  
  if (apiError) {
    console.error("API ERROR:", apiError);
  } else {
    console.log(`API would return ${apiData.length} records`);
  }
}

debug();

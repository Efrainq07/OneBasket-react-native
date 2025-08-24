// Debug the UPDATE policy behavior
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzdvrewtymkajlnbfdjr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHZyZXd0eW1rYWpsbmJmZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzI5NDgsImV4cCI6MjA3MTYwODk0OH0.I4hJY0ysSQb5FWwwtrgpqcAkpmkgQ6MG9_-w8UL6InY';

async function debugUpdatePolicy() {
  console.log('🔍 Debugging UPDATE policy behavior\n');
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Test update with specific wallet address
  console.log('Testing update on specific wallet address...');
  const testAddress = '0x853b34fd3b61c4fa8031a8513f245fb6207cad58'; // from previous test
  
  const { data: updateData, error: updateError } = await supabase
    .from('user_profiles')
    .update({
      questionnaire_completed: true
    })
    .eq('wallet_address', testAddress)
    .select();
  
  console.log('Update result:');
  console.log('Data:', updateData);
  console.log('Error:', updateError);
  console.log('Rows affected:', updateData?.length || 0);
  
  if (!updateError && (!updateData || updateData.length === 0)) {
    console.log('\n✅ UPDATE policy is working correctly!');
    console.log('No error returned, but no rows were updated (policy blocked the operation)');
  } else if (updateError) {
    console.log('\n✅ UPDATE policy blocked with error:', updateError.message);
  } else {
    console.log('\n❌ UPDATE policy may not be working correctly');
    console.log('Rows were actually updated:', updateData);
  }
  
  // Test update without WHERE clause
  console.log('\n\nTesting update without WHERE clause...');
  const { data: updateAllData, error: updateAllError } = await supabase
    .from('user_profiles')
    .update({
      risk_profile: 'test'
    })
    .select();
  
  console.log('Update all result:');
  console.log('Data:', updateAllData);
  console.log('Error:', updateAllError);
  console.log('Rows affected:', updateAllData?.length || 0);
}

debugUpdatePolicy().catch(console.error);
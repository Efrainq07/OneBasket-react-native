// Test script for Edge Function
import { supabase } from './supabaseClient.js';

// Sample test data (you'll need to replace with real signature)
const testData = {
  address: "0x1234567890123456789012345678901234567890", // Replace with your wallet address
  message: `onebasket.app wants you to sign in with your Ethereum account:
0x1234567890123456789012345678901234567890

Sign in to OneBasket with your wallet.

URI: https://onebasket.app
Version: 1
Chain ID: 1
Nonce: abc123def456
Issued At: ${new Date().toISOString()}
Expiration Time: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}`,
  signature: "0x..." // You'll need to sign the message with your wallet
};

async function testEdgeFunction() {
  console.log('Testing Edge Function...');
  console.log('Message to sign:');
  console.log(testData.message);
  console.log('\nYou need to:');
  console.log('1. Sign this message with your wallet');
  console.log('2. Replace the signature and address below');
  console.log('3. Run this test again');
  
  if (testData.signature === "0x...") {
    console.log('\n❌ Please update the signature and address in the test script first');
    return;
  }

  try {
    const { data, error } = await supabase.functions.invoke('wallet-auth', {
      body: {
        message: testData.message,
        signature: testData.signature,
        address: testData.address.toLowerCase(),
      },
    });

    if (error) {
      console.error('❌ Edge Function Error:', error);
    } else {
      console.log('✅ Edge Function Success:', data);
    }
  } catch (error) {
    console.error('❌ Test Error:', error);
  }
}

testEdgeFunction();
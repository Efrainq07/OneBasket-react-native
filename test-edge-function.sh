#!/bin/bash

# Test the Edge Function with curl
echo "Testing Edge Function with curl..."

# Test message with generated wallet
ADDRESS="0xeDC1f36CCe1b3aA35CcE87560d892fC440b395C0"
SIGNATURE="0x662a00ba0d7b4fc090830dc040e26115c937de8375a8e5219c4e653fe97b00c9086131a9002a44f0cc6bb2e2f021252376b99045f15f7689212d53f3dc1c96001c"

MESSAGE="onebasket.app wants you to sign in with your Ethereum account:
$ADDRESS

Sign in to OneBasket with your wallet.

URI: https://onebasket.app
Version: 1
Chain ID: 1
Nonce: abc123def456
Issued At: 2025-08-24T12:00:16.699Z
Expiration Time: 2025-08-25T12:00:16.700Z"

echo "Message that is being tested:"
echo "$MESSAGE"
echo ""

echo "Testing with generated wallet and signature..."
echo "Address: $ADDRESS"
echo ""

# Create JSON payload with proper escaping using python
JSON_PAYLOAD=$(python3 -c "
import json
message = '''$MESSAGE'''
payload = {
    'message': message,
    'signature': '$SIGNATURE',
    'address': '$ADDRESS'
}
print(json.dumps(payload))
")

echo "JSON Payload:"
echo "$JSON_PAYLOAD"
echo ""

# Test the function
curl -X POST \
  "https://pzdvrewtymkajlnbfdjr.supabase.co/functions/v1/wallet-auth" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHZyZXd0eW1rYWpsbmJmZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzI5NDgsImV4cCI6MjA3MTYwODk0OH0.I4hJY0ysSQb5FWwwtrgpqcAkpmkgQ6MG9_-w8UL6InY" \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHZyZXd0eW1rYWpsbmJmZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzI5NDgsImV4cCI6MjA3MTYwODk0OH0.I4hJY0ysSQb5FWwwtrgpqcAkpmkgQ6MG9_-w8UL6InY" \
  -d "$JSON_PAYLOAD"
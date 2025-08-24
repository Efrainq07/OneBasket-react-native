-- Fix RLS policies to check wallet_address from app_metadata
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON user_profiles;

-- Create updated policies that check app_metadata for wallet_address
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT
    USING (wallet_address = lower(auth.jwt() -> 'app_metadata' ->> 'wallet_address'));

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE
    USING (wallet_address = lower(auth.jwt() -> 'app_metadata' ->> 'wallet_address'));

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT
    WITH CHECK (wallet_address = lower(auth.jwt() -> 'app_metadata' ->> 'wallet_address'));

CREATE POLICY "Users can delete their own profile" ON user_profiles
    FOR DELETE
    USING (wallet_address = lower(auth.jwt() -> 'app_metadata' ->> 'wallet_address'));
-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    questionnaire_completed BOOLEAN DEFAULT FALSE,
    risk_profile TEXT,
    risk_profile_data JSONB,
    sector_questionnaire_completed BOOLEAN DEFAULT FALSE,
    selected_sectors JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on wallet_address for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_wallet_address ON user_profiles(wallet_address);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Simple policy that allows authenticated users to access data based on wallet address in user metadata
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT
    USING (wallet_address = lower(auth.jwt() ->> 'wallet_address'));

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE
    USING (wallet_address = lower(auth.jwt() ->> 'wallet_address'));

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT
    WITH CHECK (wallet_address = lower(auth.jwt() ->> 'wallet_address'));

-- Create policy to allow authenticated users to delete their own data
CREATE POLICY "Users can delete their own profile" ON user_profiles
    FOR DELETE
    USING (wallet_address = lower(auth.jwt() ->> 'wallet_address'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
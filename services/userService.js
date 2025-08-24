import { supabase } from '../supabaseClient';
import { createClient } from '@supabase/supabase-js';

// Create a service role client for admin operations (bypasses RLS)
const supabaseUrl = 'https://pzdvrewtymkajlnbfdjr.supabase.co';
const supabaseServiceKey = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const UserService = {
  async getUserProfile(walletAddress) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { data: null, error };
    }
  },

  async createOrUpdateUserProfile(walletAddress, profileData) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          wallet_address: walletAddress.toLowerCase(),
          ...profileData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'wallet_address'
        })
        .select()
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      return { data: null, error };
    }
  },

  async updateQuestionnaireStatus(walletAddress, questionnaireData) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          questionnaire_completed: true,
          risk_profile: questionnaireData.riskProfile,
          risk_profile_data: questionnaireData.riskProfileData,
          updated_at: new Date().toISOString(),
        })
        .eq('wallet_address', walletAddress.toLowerCase())
        .select()
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error updating questionnaire status:', error);
      return { data: null, error };
    }
  },

  async updateSectorQuestionnaire(walletAddress, selectedSectors) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          sector_questionnaire_completed: true,
          selected_sectors: selectedSectors,
          updated_at: new Date().toISOString(),
        })
        .eq('wallet_address', walletAddress.toLowerCase())
        .select()
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error updating sector questionnaire:', error);
      return { data: null, error };
    }
  },

  async deleteUserProfile(walletAddress) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('wallet_address', walletAddress.toLowerCase());

      return { error };
    } catch (error) {
      console.error('Error deleting user profile:', error);
      return { error };
    }
  }
};
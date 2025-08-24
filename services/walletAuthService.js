import { supabase } from '../supabaseClient';

export const WalletAuthService = {
  async signInWithWallet(walletProvider, address, chainId = 1) {
    try {
      // Create SIWE message
      const nonce = this.generateNonce();
      const messageToSign = this.createSIWXMessage({
        domain: 'onebasket.app',
        address: address,
        chainId: chainId,
        uri: 'https://onebasket.app',
        version: '1',
        statement: 'Sign in to OneBasket with your wallet.',
        nonce: nonce,
        issuedAt: new Date().toISOString(),
        expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      });

      // Sign the message with ethers
      let signature;
      try {
        console.log('Attempting to sign message with ethers');
        console.log('Message length:', messageToSign.length);
        console.log('Address:', address);
        
        // Import ethers dynamically
        const { ethers } = await import('ethers');
        
        // Create ethers provider and signer from wallet provider
        const ethersProvider = new ethers.BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        
        // Sign the message using ethers signMessage
        signature = await signer.signMessage(messageToSign);
        
        console.log('Signature successful with ethers:', signature);
      } catch (signError) {
        console.error('Ethers signing failed:', signError);
        return { 
          data: null, 
          error: `Message signing failed: ${signError.message}`, 
          walletAddress: null 
        };
      }

      // Call the Edge Function to verify signature and create user/profile
      const { data, error: funcError } = await supabase.functions.invoke('wallet-auth', {
        body: {
          message: messageToSign,
          signature: signature,
          address: address.toLowerCase(),
        },
      });

      if (funcError) {
        console.error('Edge function error:', funcError);
        return { data: null, error: funcError, walletAddress: null };
      }

      if (!data || !data.success) {
        return { data: null, error: data?.error || 'Authentication failed', walletAddress: null };
      }

      // Create session object with JWT tokens from edge function
      const session = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type || 'bearer',
        expires_in: data.expires_in || 3600,
        user: data.user
      };

      // Set the session in the Supabase client if we have valid tokens
      if (data.access_token) {
        try {
          await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token
          });
          console.log('Supabase session set successfully');
        } catch (sessionError) {
          console.error('Error setting Supabase session:', sessionError);
        }
      }

      return { 
        data: { 
          session, 
          wallet_address: data.user.wallet_address,
          user: data.user
        }, 
        error: null, 
        walletAddress: address.toLowerCase() 
      };

    } catch (error) {
      console.error('Wallet sign-in error:', error);
      return { data: null, error, walletAddress: null };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  },

  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error };
    }
  },

  async getWalletAddressFromSession() {
    try {
      const { session, error } = await this.getCurrentSession();
      if (error || !session) {
        return { walletAddress: null, error };
      }
      
      const walletAddress = session.user?.user_metadata?.wallet_address;
      return { walletAddress, error: null };
    } catch (error) {
      console.error('Error getting wallet address from session:', error);
      return { walletAddress: null, error };
    }
  },

  generateNonce() {
    // Generate a random nonce for security
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },

  createSIWXMessage({ domain, address, chainId, uri, version, statement, nonce, issuedAt, expirationTime }) {
    return `${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}
Expiration Time: ${expirationTime}`;
  },
};
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useDisconnect, useAppKitAccount, useAppKitProvider} from '@reown/appkit-ethers-react-native';
import { UserService } from '../services/userService';
import { WalletAuthService } from '../services/walletAuthService';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
    const [hasCompletedSectorQuestionnaire, setHasCompletedSectorQuestionnaire] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [authMethod, setAuthMethod] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [supabaseUser, setSupabaseUser] = useState(null);
    const [supabaseSession, setSupabaseSession] = useState(null);
    const { disconnect } = useDisconnect();
    const {address, isConnected, chainId} = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');
    const isLoadingProfile = useRef(false);

    useEffect(() => {
        const initAuth = async () => {
            await checkAuthStatus();
        };
        initAuth();
    }, []);

    useEffect(() => {
        const handleConnectionChange = async () => {
            if (isConnected && address && walletProvider && !isLoadingProfile.current) {
                await loadUserProfile(address);
            }
        };
        handleConnectionChange();
    }, [isConnected, address, walletProvider]);

    const loadUserProfile = async (walletAddr) => {
        // Prevent duplicate calls
        if (isLoadingProfile.current) {
            console.log('Profile loading already in progress, skipping...');
            return;
        }
        
        try {
            isLoadingProfile.current = true;
            setIsLoading(true);
            
            // First authenticate with Supabase using SIWE to get JWT tokens
            if (!walletProvider) {
                console.error('No wallet provider available');
                return;
            }

            console.log('Starting SIWE authentication for wallet:', walletAddr);
            
            const { data: authData, error: authError } = await WalletAuthService.signInWithWallet(
                walletProvider, 
                walletAddr, 
                chainId || 1
            );
            
            if (authError) {
                console.error('SIWE Authentication error:', authError);
                return;
            }

            console.log('SIWE auth response:', authData);

            if (authData?.session && authData.session.access_token) {
                console.log('SIWE authentication successful, setting session');
                
                // Store Supabase session data
                setSupabaseSession(authData.session);
                setSupabaseUser(authData.user);
                
                // Now that we have a JWT session, load user profile
                const { data, error } = await UserService.getUserProfile(walletAddr);
                
                if (data) {
                    setUserProfile(data);
                    setHasCompletedQuestionnaire(data.questionnaire_completed || false);
                    setHasCompletedSectorQuestionnaire(data.sector_questionnaire_completed || false);
                    setWalletAddress(data.wallet_address);
                } else {
                    // Profile should have been created by edge function, set basic data
                    setWalletAddress(walletAddr.toLowerCase());
                    setHasCompletedQuestionnaire(false);
                    setHasCompletedSectorQuestionnaire(false);
                }
                
                setAuthMethod('wallet');
                setIsAuthenticated(true);
            } else {
                console.error('No access token received from SIWE authentication');
                console.log('Available session data:', authData?.session);
                console.error('Authentication failed - social wallets may have signing issues');
            }
            
        } catch (error) {
            console.error('Error loading user profile:', error);
        } finally {
            isLoadingProfile.current = false;
            setIsLoading(false);
        }
    };

    const checkAuthStatus = async () => {
        try {
            // Only update authentication status, don't trigger profile loading here
            // Profile loading is handled by the separate useEffect for connection changes
            setIsAuthenticated(isConnected);
            
            if (!isConnected) {
                setWalletAddress(null);
                setAuthMethod(null);
                setUserProfile(null);
                setSupabaseUser(null);
                setSupabaseSession(null);
                setHasCompletedQuestionnaire(false);
                setHasCompletedSectorQuestionnaire(false);
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (address) => {
        try {
            setIsLoading(true);
            await loadUserProfile(address);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const walletLogin = async (walletData) => {
        try {
            setIsLoading(true);
            
            const { address, isConnected } = walletData;
            
            if (isConnected && address) {
                await loadUserProfile(address);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { success: false, error: 'Failed to connect wallet' };
            }
        } catch (error) {
            console.error('Wallet login error:', error);
            return { success: false, error: 'Wallet connection failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const completeQuestionnaire = async (selectedProfile) => {
        try {
            setIsLoading(true);
            
            if (!walletAddress) {
                return { success: false, error: 'No wallet address found' };
            }

            const { data, error } = await UserService.updateQuestionnaireStatus(walletAddress, {
                riskProfile: selectedProfile.id,
                riskProfileData: selectedProfile,
            });

            if (error) {
                throw error;
            }
            
            setHasCompletedQuestionnaire(true);
            setUserProfile(prev => ({ ...prev, ...data }));
            
            return { success: true };
        } catch (error) {
            console.error('Questionnaire completion error:', error);
            return { success: false, error: 'Failed to save profile' };
        } finally {
            setIsLoading(false);
        }
    };

    const completeSectorQuestionnaire = async (selectedSectors) => {
        try {
            setIsLoading(true);
            
            if (!walletAddress) {
                return { success: false, error: 'No wallet address found' };
            }

            const { data, error } = await UserService.updateSectorQuestionnaire(walletAddress, selectedSectors);

            if (error) {
                throw error;
            }
            
            setHasCompletedSectorQuestionnaire(true);
            setUserProfile(prev => ({ ...prev, ...data }));
            
            return { success: true };
        } catch (error) {
            console.error('Sector questionnaire completion error:', error);
            return { success: false, error: 'Failed to save sector preferences' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Disconnect wallet
            await disconnect();
            
            // Clear all state
            setIsAuthenticated(false);
            setHasCompletedQuestionnaire(false);
            setHasCompletedSectorQuestionnaire(false);
            setWalletAddress(null);
            setAuthMethod(null);
            setUserProfile(null);
            setSupabaseUser(null);
            setSupabaseSession(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        isAuthenticated,
        isLoading,
        hasCompletedQuestionnaire,
        hasCompletedSectorQuestionnaire,
        walletAddress,
        authMethod,
        userProfile,
        supabaseUser,
        supabaseSession,
        login,
        walletLogin,
        completeQuestionnaire,
        completeSectorQuestionnaire,
        logout,
        loadUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
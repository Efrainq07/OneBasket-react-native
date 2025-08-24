import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDisconnect, useAppKitAccount} from '@reown/appkit-ethers-react-native';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
    const [hasCompletedSectorQuestionnaire, setHasCompletedSectorQuestionnaire] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [authMethod, setAuthMethod] = useState(null); // 'email' or 'wallet'
     const { disconnect } = useDisconnect();
     const {address, isConnected} = useAppKitAccount();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const questionnaireCompleted = await AsyncStorage.getItem('questionnaireCompleted');
            const sectorQuestionnaireCompleted = await AsyncStorage.getItem('sectorQuestionnaireCompleted');
            const storedWalletAddress = await AsyncStorage.getItem('walletAddress');
            const storedAuthMethod = await AsyncStorage.getItem('authMethod');
            setIsAuthenticated(isConnected)
            setHasCompletedQuestionnaire(!!questionnaireCompleted);
            setHasCompletedSectorQuestionnaire(!!sectorQuestionnaireCompleted);
            setWalletAddress(storedWalletAddress);
            setAuthMethod(storedAuthMethod);
        } catch (error) {
            console.error('Error checking auth status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (address) => {
        try {
            setIsLoading(true);
            setIsAuthenticated(true);
            await AsyncStorage.setItem('address', address);
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
                await AsyncStorage.setItem('walletAddress', address);
                await AsyncStorage.setItem('authMethod', 'wallet');
                setIsAuthenticated(true);
                setWalletAddress(address);
                setAuthMethod('wallet');
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
            await AsyncStorage.setItem('questionnaireCompleted', 'true');
            await AsyncStorage.setItem('riskProfile', selectedProfile.id);
            await AsyncStorage.setItem('riskProfileData', JSON.stringify(selectedProfile));
            setHasCompletedQuestionnaire(true);
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
            await AsyncStorage.setItem('sectorQuestionnaireCompleted', 'true');
            await AsyncStorage.setItem('selectedSectors', JSON.stringify(selectedSectors));
            setHasCompletedSectorQuestionnaire(true);
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
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userFirstName');
            await AsyncStorage.removeItem('userLastName');
            await AsyncStorage.removeItem('questionnaireCompleted');
            await AsyncStorage.removeItem('riskProfile');
            await AsyncStorage.removeItem('riskProfileData');
            await AsyncStorage.removeItem('sectorQuestionnaireCompleted');
            await AsyncStorage.removeItem('selectedSectors');
            await AsyncStorage.removeItem('walletAddress');
            await AsyncStorage.removeItem('authMethod');
            await disconnect()
            setIsAuthenticated(false);
            setHasCompletedQuestionnaire(false);
            setHasCompletedSectorQuestionnaire(false);
            setWalletAddress(null);
            setAuthMethod(null);
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
        login,
        walletLogin,
        completeQuestionnaire,
        completeSectorQuestionnaire,
        logout
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
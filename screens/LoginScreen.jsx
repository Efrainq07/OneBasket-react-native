import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image
} from 'react-native';
import { deviceWidth, deviceHeight } from '@/constants/dimensions';
import { useAuth } from '@/context/AuthContext';
import Background from '@/components/UI/Background/Background';
import WalletConnectLogin from '@/components/auth/WalletConnectLogin';


const LoginScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { login, walletLogin } = useAuth();

    const handleWalletConnect = async (walletData) => {
        try {
            setIsLoading(true);
            const result = await walletLogin(walletData);
            if (!result.success) {
                Alert.alert('Connection Failed', result.error || 'Failed to connect wallet');
            }
        } catch (error) {
            Alert.alert('Connection Failed',error, 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/onebasket.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.welcomeText}>Welcome to OneBasket</Text>
                    <Text style={styles.subtitleText}>Sign in or create to your account</Text>
                </View>

                <View style={styles.formContainer}>
                    
                    <WalletConnectLogin onSuccess={handleWalletConnect} />
                    
                </View>
            </View>
        </Background>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00c806',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#fff',
    },
    loginButton: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#00c806',
    },
    disabledButton: {
        backgroundColor: 'transparent',
        borderColor: '#ccc',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    footerText: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
    },
    signUpText: {
        color: '#00c806',
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    dividerText: {
        color: '#fff',
        opacity: 0.6,
        fontSize: 14,
        marginHorizontal: 15,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -90,
        marginBottom: -90,
    },
    logoImage: {
    width: deviceWidth *2, // 50% of screen width
    height: undefined,
    aspectRatio: 3, // keep the original logo's aspect ratio
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
}

});

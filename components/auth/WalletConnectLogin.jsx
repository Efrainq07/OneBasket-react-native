import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppKit, useAppKitAccount, useAppKitNetwork, useAppKitProvider } from '@reown/appkit-ethers-react-native';

const WalletConnectLogin = ({ onSuccess }) => {
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');

    const handleConnect = async () => {
        try {
            await open();
        } catch (error) {
            console.error('Connection error:', error);
        }
    };

    React.useEffect(() => {
        if (isConnected && address && onSuccess) {
            onSuccess({
                address,
                provider: walletProvider,
                isConnected
            });
        }
    }, [isConnected, address, walletProvider, onSuccess]);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.connectButton} 
                onPress={handleConnect}
                activeOpacity={0.8}
            >
                <Text style={styles.connectButtonText}>
                    Connect with Email or Social
                </Text>
            </TouchableOpacity>
            
            <Text style={styles.helpText}>
                Connect using email, Google, Apple, Facebook, or other wallets
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    connectButton: {
        backgroundColor: '#1C7EF2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    connectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    helpText: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.7,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default WalletConnectLogin;
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RootMainNavigator } from './navigation';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import { View, ActivityIndicator } from 'react-native';


const AppNavigator = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#00c806" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar style={'auto'}/>
            {isAuthenticated ? <RootMainNavigator /> : <LoginScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator


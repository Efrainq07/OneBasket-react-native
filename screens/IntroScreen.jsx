import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Animated,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import Background from '@/components/UI/Background/Background';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ navigation }) => {
    const { isAuthenticated, hasCompletedQuestionnaire, isLoading } = useAuth();
    
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const screenOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Start logo animation immediately
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Start navigation sequence after animations
        const timer = setTimeout(() => {
            if (!isLoading) {
                // Fade out screen before navigation
                Animated.timing(screenOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    navigateToNextScreen();
                });
            }
        }, 2500); // 2.5 second delay to allow for logo animation

        return () => clearTimeout(timer);
    }, [isLoading, isAuthenticated, hasCompletedQuestionnaire]);

    const navigateToNextScreen = () => {
        if (!isAuthenticated) {
            navigation.replace('Login');
        } else if (!hasCompletedQuestionnaire) {
            navigation.replace('Questionnaire');
        } else {
            navigation.replace('MainApp');
        }
    };

    return (
        <Animated.View style={[styles.wrapper, { opacity: screenOpacity }]}>
            <Background>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Animated.Image
                            source={require('@/assets/onebasket.png')}
                            style={[
                                styles.logoImage,
                                {
                                    opacity: logoOpacity,
                                    transform: [{ scale: logoScale }],
                                },
                            ]}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Background>
        </Animated.View>
    );
};

export default IntroScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: width,
    },
    logoImage: {
        width: width * 0.8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
});

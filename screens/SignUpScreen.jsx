import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    Image
} from 'react-native';
import Background from '@/components/UI/Background/Background';
import { useAuth } from '@/context/AuthContext';
import { deviceWidth, deviceHeight } from '@/constants/dimensions';

const SignUpScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();

    const handleSignUp = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        try {
            const result = await signup({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password
            });
            
            if (result.success) {
                // Small delay to show loading state before navigation
                setTimeout(() => {
                    setIsLoading(false);
                    // Navigation will be handled automatically by AppNavigator based on auth state
                }, 500);
            } else {
                setIsLoading(false);
                Alert.alert('Sign Up Failed', result.error || 'Failed to create account');
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Sign Up Failed', 'Something went wrong. Please try again.');
        }
    };

    const handleBackToLogin = () => {
        navigation.goBack();
    };

    return (
        <Background>
        <View style={styles.gradientContainer}>
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                                        <Image
                                            source={require('@/assets/onebasket.png')}
                                            style={styles.logoImage}
                                            resizeMode="contain"
                                        />
                                    </View>
                <Text style={styles.welcomeText}>Join OneBasket</Text>
                <Text style={styles.subtitleText}>Create your account</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.signUpButton, (!firstName || !lastName || !email || !password || !confirmPassword || isLoading) && styles.disabledButton]}
                    onPress={handleSignUp}
                    disabled={!firstName || !lastName || !email || !password || !confirmPassword || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.signUpButtonText}>Create Account</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={handleBackToLogin}>
                        <Text style={styles.footerText}>
                            Already have an account? 
                            <Text style={styles.signInText}> Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
        </Background>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
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
        marginBottom: 16,
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
    signUpButton: {
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
    signUpButtonText: {
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
    signInText: {
        color: '#00c806',
        fontWeight: '600',
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

import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import { deviceWidth, deviceHeight } from '@/constants/dimensions';
import { useAuth } from '@/context/AuthContext';

const QuestionnaireScreen = ({ navigation }) => {
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { completeQuestionnaire } = useAuth();

    const riskProfiles = [
        {
            id: 'conservative',
            title: 'Conservative Investor',
            description: 'I prefer stable investments with lower risk and steady returns.',
            color: '#4CAF50'
        },
        {
            id: 'moderate',
            title: 'Moderate Investor',
            description: 'I want a balance between growth and stability.',
            color: '#FF9800'
        },
        {
            id: 'aggressive',
            title: 'Aggressive Investor',
            description: 'I am willing to take high risks for potentially high returns.',
            color: '#F44336'
        }
    ];

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
    };

    const handleContinue = async () => {
        if (!selectedProfile) {
            Alert.alert('Selection Required', 'Please select an investor risk profile to continue.');
            return;
        }

        setIsLoading(true);
        try {
            const result = await completeQuestionnaire(selectedProfile);
            if (result.success) {
                // Small delay to show loading state
                setTimeout(() => {
                    setIsLoading(false);
                    // Navigation will be handled automatically by AppNavigator based on auth state
                }, 500);
            } else {
                setIsLoading(false);
                Alert.alert('Error', result.error || 'Failed to save your profile');
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const ProfileCard = ({ profile, isSelected, onSelect }) => (
        <TouchableOpacity
            style={[
                styles.profileCard,
                isSelected && styles.selectedCard,
                { borderColor: profile.color }
            ]}
            onPress={() => onSelect(profile)}
            activeOpacity={0.7}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.colorIndicator, { backgroundColor: profile.color }]} />
                <Text style={styles.profileTitle}>{profile.title}</Text>
            </View>
            
            <Text style={styles.profileDescription}>{profile.description}</Text>

            {isSelected && (
                <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedText}>✓ Selected</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.gradientContainer}>
            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/onebasket.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.welcomeText}>Choose Your Investment Style</Text>
                    <Text style={styles.subtitleText}>
                        Select the risk profile that best describes your investment approach
                    </Text>
                </View>

                <View style={styles.profilesContainer}>
                    {riskProfiles.map((profile) => (
                        <ProfileCard
                            key={profile.id}
                            profile={profile}
                            isSelected={selectedProfile?.id === profile.id}
                            onSelect={handleProfileSelect}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            (!selectedProfile || isLoading) && styles.disabledButton
                        ]}
                        onPress={handleContinue}
                        disabled={!selectedProfile || isLoading}
                        activeOpacity={0.7}
                    >
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#fff" />
                                <Text style={styles.loadingText}>Saving your profile...</Text>
                            </View>
                        ) : (
                            <Text style={styles.continueButtonText}>Continue</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.disclaimerText}>
                        You can change your risk profile anytime in settings
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 20,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -90,
        marginBottom: -90,
    },
    logoImage: {
        width: deviceWidth*2,
        height: undefined,
        aspectRatio: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
        textAlign: 'center',
        lineHeight: 22,
    },
    profilesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    profileCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedCard: {
        borderWidth: 3,
        backgroundColor: 'rgba(0, 200, 6, 0.1)',
        borderColor: '#00c806',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    colorIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    profileTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        flex: 1,
    },
    profileDescription: {
        fontSize: 13,
        color: '#fff',
        opacity: 0.8,
        marginBottom: 10,
        lineHeight: 18,
    },
    characteristicsContainer: {
        marginBottom: 8,
    },
    characteristicItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 3,
    },
    bullet: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.7,
        marginRight: 6,
        marginTop: 1,
    },
    characteristicText: {
        fontSize: 11,
        color: '#fff',
        opacity: 0.7,
        flex: 1,
        lineHeight: 15,
    },
    selectedIndicator: {
        backgroundColor: '#00c806',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    selectedText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    buttonContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        paddingTop: 10,
    },
    continueButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#00c806',
    },
    disabledButton: {
        backgroundColor: 'transparent',
        borderColor: '#ccc',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    disclaimerText: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.6,
        textAlign: 'center',
        lineHeight: 16,
    },
});

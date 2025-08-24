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

const SectorQuestionnaireScreen = ({ navigation }) => {
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { completeSectorQuestionnaire } = useAuth();

    const sectors = [
        {
            id: 'technology',
            name: 'Technology',
            emoji: '💻',
            color: '#2196F3'
        },
        {
            id: 'healthcare',
            name: 'Healthcare',
            emoji: '🏥',
            color: '#4CAF50'
        },
        {
            id: 'energy',
            name: 'Energy',
            emoji: '⚡',
            color: '#FF9800'
        },
        {
            id: 'finance',
            name: 'Finance',
            emoji: '🏦',
            color: '#9C27B0'
        },
        {
            id: 'consumer',
            name: 'Consumer Goods',
            emoji: '🛍️',
            color: '#E91E63'
        },
        {
            id: 'crypto',
            name: 'Crypto',
            emoji: '₿',
            color: '#FF5722'
        }
    ];

    const handleSectorToggle = (sector) => {
        setSelectedSectors(prev => {
            const isSelected = prev.find(s => s.id === sector.id);
            if (isSelected) {
                return prev.filter(s => s.id !== sector.id);
            } else {
                return [...prev, sector];
            }
        });
    };

    const handleContinue = async () => {
        if (selectedSectors.length === 0) {
            Alert.alert('Selection Required', 'Please select at least one sector that interests you.');
            return;
        }

        setIsLoading(true);
        try {
            const result = await completeSectorQuestionnaire(selectedSectors);
            if (result.success) {
                // Small delay to show loading state
                setTimeout(() => {
                    setIsLoading(false);
                    // Navigation will be handled automatically by AppNavigator based on auth state
                }, 500);
            } else {
                setIsLoading(false);
                Alert.alert('Error', result.error || 'Failed to save your preferences');
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const SectorCard = ({ sector, isSelected, onToggle }) => (
        <TouchableOpacity
            style={[
                styles.sectorCard,
                isSelected && styles.selectedSectorCard
            ]}
            onPress={() => onToggle(sector)}
            activeOpacity={0.7}
        >
            <View style={styles.sectorContent}>
                <Text style={styles.sectorEmoji}>{sector.emoji}</Text>
                <Text style={styles.sectorName}>{sector.name}</Text>
            </View>
            
            <View style={styles.selectionIndicatorContainer}>
                <View style={[
                    styles.selectionIndicator,
                    isSelected ? styles.selectedIndicator : styles.unselectedIndicator
                ]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
            </View>
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
                    <Text style={styles.welcomeText}>Choose Your Interests</Text>
                    <Text style={styles.subtitleText}>
                        Select the sectors you're interested in investing in
                    </Text>
                </View>

                <View style={styles.sectorsContainer}>
                    <View style={styles.sectorsGrid}>
                        {sectors.map((sector) => (
                            <SectorCard
                                key={sector.id}
                                sector={sector}
                                isSelected={selectedSectors.find(s => s.id === sector.id)}
                                onToggle={handleSectorToggle}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            (selectedSectors.length === 0 || isLoading) && styles.disabledButton
                        ]}
                        onPress={handleContinue}
                        disabled={selectedSectors.length === 0 || isLoading}
                        activeOpacity={0.7}
                    >
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#fff" />
                                <Text style={styles.loadingText}>Saving preferences...</Text>
                            </View>
                        ) : (
                            <Text style={styles.continueButtonText}>
                                Continue ({selectedSectors.length} selected)
                            </Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.disclaimerText}>
                        You can change your sector preferences anytime in settings
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default SectorQuestionnaireScreen;

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
        width: deviceWidth * 2,
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
    sectorsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    sectorsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    sectorCard: {
        width: (deviceWidth - 60) / 2,
        height: (deviceWidth - 60) / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 15,
        position: 'relative',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedSectorCard: {
        borderColor: '#00c806',
        borderWidth: 3,
        backgroundColor: 'rgba(0, 200, 6, 0.1)',
    },
    sectorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    sectorEmoji: {
        fontSize: 36,
        marginBottom: 8,
    },
    sectorName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    selectionIndicatorContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
    selectionIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unselectedIndicator: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    selectedIndicator: {
        backgroundColor: '#00c806',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
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
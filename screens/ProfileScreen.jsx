import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { deviceWidth, deviceHeight } from '@/constants/dimensions';
import HeadListItem from '@/components/list/ProfileHeadListItem';
import ProfileSettingListItem from '@/components/list/ProfileSettingListItem';
import { useAuth } from '@/context/AuthContext';

const ProfileScreen = props => {

    const [showHeader, setShowHeader] = useState(false);
    const { logout } = useAuth();


    const settings = [
        {
            name: 'Free Stocks',
            desc: 'Invite Friends, Past Invites'
        },
        {
            name: 'Investing',
            desc: 'Balances, DRIP, Gold'
        },
        {
            name: 'Transfers',
            desc: 'Deposits, Withdrawals'
        },
        {
            name: 'Statements and History',
            desc: 'Documents, Taxes, Account Activity'
        },
        {
            name: 'Security and Privacy',
            desc: 'Password, Two-Factor Authentication, Data Sharing'
        },
        {
            name: 'Settings',
            desc: 'Notifications, Gold, Account'
        },
        {
            name: 'Help',
            desc: 'Support,Disclosures'
        },
    ]


    const investingAmount = '$32,465.54';

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    onPress: logout,
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <ScrollView contentContainerStyle={styles.container} scrollEventThrottle={16}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Profile</Text>
            </View>
            {
                settings.map((item, idx) => {
                    return (
                        <ProfileSettingListItem
                            title={item.name}
                            desc={item.desc}
                            key={idx}
                        />
                    )
                })
            }
            <View style={styles.accountNoBox}>
                <Text style={styles.accountNoTitle}>Account No.</Text>
                <Text style={styles.accountNoText}>(RHS) 111222333</Text>
            </View>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ProfileScreen;

export const screenOptions = navData => {
    return {
        title: navData.route.params?.title ? navData.route.params.title : '',
    }
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        paddingBottom: 100
    },
    container: {
        alignItems: 'center',
        flexGrow: 1,
    },
    titleContainer: {
        alignItems: 'flex-start',
        width: '88%',
        marginBottom: 6,
        paddingTop: "40"
    },
    headerTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headListContainer: {
        marginLeft: deviceWidth * 0.065,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 18,
        marginBottom: 6
    },
    accountNoBox: {
        width: '88%',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "500",
        color: '#fff',
    },
    investingText: {
        fontSize: 32,
        fontWeight: '500',
        marginTop: 8,
        width: '100%',
        textAlign: 'left',
        color: '#fff',
    },
    accountNoTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#fff',
        opacity: 0.8,
    },
    accountNoText: {
        color: '#fff',
        opacity: 0.8,
        marginTop: 6,
        fontSize: 13
    },
    logOutText: {
        marginTop: 48,
        marginBottom: 120,
        textAlign: 'center',
        color: '#c80600',
        fontWeight: '700',
    }
})
import React from 'react'
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './FollowingContainer.styles';


const FollowingContainer = () => {
    return (
        <View style={styles.followingContainer}>
        <Text style={styles.followingTitleText}>Following</Text>
        <View style={styles.followingBox}>
        <View style={styles.listNameContainer}>
            <Text style={styles.listName}>Crypto</Text>
            <Text style={styles.listAmountText}>7 items</Text>
        </View>
        <Feather name="chevron-right" size={20} color={'#97a4b2'} style={{ marginRight: -8 }} />

        </View>
        <View style={styles.followingBox}>
        <View style={styles.listNameContainer}>
            <Text style={styles.listName}>IPO Access</Text>
            <Text style={styles.listAmountText}>1 item</Text>
        </View>
        <Feather name="chevron-right" size={20} color={'#97a4b2'} style={{ marginRight: -8 }} />
        </View>
    </View>
    )
}

export default FollowingContainer


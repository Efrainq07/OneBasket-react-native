import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import styles from './List.styles';


const List = props => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapsing = () => {
        setIsCollapsed(!isCollapsed);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    }



    return (
        <View style={{...styles.container, marginBottom: isCollapsed ? 8 : 32}}>
            <View style={styles.titleContainer}>
                <View style={styles.titleLeftContainer}>
                <View style={styles.emojiContainer}>
                    <Text style={styles.emojiText}>{props.emoji}</Text>
                </View>
                <View style={styles.listNameContainer}>
                    <Text style={styles.listName}>{props.listName}</Text>
                    <Text style={styles.listAmountText}>{props.listAmount} baskets</Text>
                </View>
                </View>
                <TouchableWithoutFeedback onPress={handleCollapsing}>
                <View style={styles.chevronContainer}>
                    <Feather name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={22} style={{ marginRight: -6, color: "#fff"}} />
                </View>
                </TouchableWithoutFeedback>
            </View>
            <Collapsible collapsed={isCollapsed}>
                {props.children}
            </Collapsible>
        </View>
    )
}

export default List


import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { styles } from './AboutContainer.styles';


const AboutContainer = (props) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapsing = () => {
        setIsCollapsed(!isCollapsed);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>About {props.company}</Text>
            {isCollapsed ? <Text style={styles.content} numberOfLines={3}>{props.about}</Text> : null}
            <Collapsible collapsed={isCollapsed}>
                <Text style={styles.content}>{props.about}</Text>
            </Collapsible>
            <TouchableWithoutFeedback onPress={handleCollapsing}>
                <Text style={{ ...styles.showMore, color: props.color }}>{isCollapsed ? 'Show More' : 'Show Less'}</Text>
            </TouchableWithoutFeedback>
            <View style={styles.hr}></View>
            {props.ceo !== undefined ? <>
            <View style={styles.fullWidthItemContainer}>
                <Text style={styles.itemTitle}>CEO</Text>
                <Text style={styles.itemAmount}>{props.ceo}</Text>
            </View>
            <View style={styles.fullWidthItemContainer}>
                <Text style={styles.itemTitle}>Headquarters</Text>
                <Text style={styles.itemAmount}>{props.headquarters}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Founded</Text>
                    <Text style={styles.itemAmount}>{props.founded}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>Employees</Text>
                    <Text style={styles.itemAmount}>{props.employees}</Text>
                </View>
            </View>
            </> : null}
        </View>
    )
}

export default AboutContainer


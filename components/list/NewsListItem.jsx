import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { styles } from './NewsListItem.styles'

const NewsListItem = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{...styles.container, borderBottomColor: props.borderBottomColor }}>
            <View style={styles.titleContainer}>
                <View style={styles.sourceContainer}>
                    <Text style={{...styles.srcText, color: props.textColor}}>{props.source}</Text>
                    <Text style={{...styles.srcDate, color: props.textColor}}>{props.date}</Text>
                </View>
                {props.explore ? <View><Text style={styles.threeDots}>. . .</Text></View> : null}
            </View>
            <View style={styles.middleContainer}>
                <Text numberOfLines={3} style={{...styles.newsText, color: props.textColor}}>{props.content}</Text>
                <Image style={styles.img} source={{uri: props.uri}}/>
            </View>
            <Text style={{...styles.companyText, color: props.color}}>{props.company} {props.percentage}%</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default NewsListItem


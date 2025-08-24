import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { styles } from './TrendingListItem.styles'

const TrendingListItem = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.listItemContainer}>
            <Image style={styles.img} source={props.src}/>
            <Text style={styles.listName}>{props.listName}</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default TrendingListItem


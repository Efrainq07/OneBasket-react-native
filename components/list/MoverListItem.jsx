import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './MoverListItem.styles'

const MoverListItem = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.company}>{props.company}</Text>
            <View style={styles.bottomContainer}>
                <Text style={{...styles.ticker, color: props.color}}>{props.ticker}</Text>
                <Text style={{...styles.percentage, color: props.color}}>{props.change}%</Text>
            </View>
        </View>
    )
}

export default MoverListItem


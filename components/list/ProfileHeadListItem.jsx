import React from 'react'
import { Text, View, Image } from 'react-native';
import { styles } from './ProfileHeadListItem.styles';

const ProfileHeadListItem = props => {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={props.src}/>
            <View style={styles.textContainer}>
                <Text style={styles.descText}>{props.desc}</Text>
                <Text style={{...styles.bottomText, color: props.color}}>{props.bottomText}</Text>
            </View>
        </View>
    )
}

export default ProfileHeadListItem;


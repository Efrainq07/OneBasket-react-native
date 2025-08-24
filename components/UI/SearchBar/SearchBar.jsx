import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import  { deviceHeight, deviceWidth } from '@/constants/dimensions';

const searchBar = props => {
    return (
        <SearchBar
        platform= 'ios'
        containerStyle={{...styles.bar, backgroundColor: 'transparent'}}
        selectionColor={'#00c806'}
        inputContainerStyle = {{backgroundColor: '#2a3d4d', height: 40, marginLeft: 0, borderRadius: 20}}
        placeholder={'Search baskets...'}
        placeholderTextColor={'#8a9ba8'}
        searchIcon = {() => <FontAwesome5 name={'search'} size={13} color={'#8a9ba8'}/>}
        onClear={props.onClear}
        onChangeText={props.updateQuery}
        leftIconContainerStyle={{
          width: 18,
          height: 18,
          marginRight: -4
        }}
        cancelButtonProps = {{
          color: '#00c806'
        }}
        value={props.query}
        inputStyle={{
          color: '#fff',
          fontSize: 14,
        }}
        round
    />
    )
}

export default searchBar

const styles = StyleSheet.create({
    bar: {
        width: deviceWidth * 0.9,
    }
})

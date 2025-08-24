import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { deviceHeight, deviceWidth } from '@/constants/dimensions';
import SearchBar from '@/components/UI/SearchBar/SearchBar';
import List from '@/components/list/List';
import ListItem from '@/components/list/ListItem/ListItem';
import { sectors } from '@/data/sectors';

const ExploreScreen = props => {

    const [showHeader, setShowHeader] = useState(false);
    const [query, setQuery] = useState('');
    const _scrollViewRef = useRef();


    const handleQuery = query => {
        setQuery(query);
    }

    const handleSearchClear = () => {
        setQuery('');
    }


    const handleScroll = event => {
        if (!showHeader && event.nativeEvent.contentOffset.y > deviceHeight / 24) {
            setShowHeader(true)
            props.navigation.setOptions({
                headerTitle: props => {
                    return (
                        <Text style={{ color: '#000', fontSize: 15 }}>Browse</Text>
                    )
                }
            })
        }
        else if (showHeader && event.nativeEvent.contentOffset.y < deviceHeight / 24) {
            setShowHeader(false)
            props.navigation.setOptions({
                headerTitle: ''
            })
        }
    }



    return (
        <LinearGradient
            colors={['#0D1B2A', '#000000']}
            locations={[0, 1]}
            style={styles.gradientContainer}
        >
            <ScrollView stickyHeaderIndices={[1]} contentContainerStyle={styles.container} scrollEventThrottle={16} onScroll={handleScroll}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Browse</Text>
                </View>
                <View style={styles.searchbarContainer}>
                    <SearchBar updateQuery={handleQuery} query={query} onClear={handleSearchClear} />
                </View>
                <View style={styles.sectorsContainer}>
                    {sectors.map((sector, idx) => (
                        <List 
                            key={idx}
                            emoji={sector.emoji}
                            listName={sector.name}
                            listAmount={sector.baskets?.length || sector.assets?.length || 0}
                        >
                            <ListItem
                                data={sector.baskets || sector.assets || []}
                                stock={sector.name !== 'Crypto'}
                                navigation={props.navigation}
                                onDragStart={() => {}}
                                onDragEnd={() => {}}
                                parentRef={_scrollViewRef}
                            />
                        </List>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default ExploreScreen

export const screenOptions = navData => {
    return {
        title: navData.route.params?.title ? navData.route.params.title : '',
    }
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        flexGrow: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        paddingTop: "40",
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '88%',
        marginBottom: 6
    },
    searchbarContainer: {
        width: deviceWidth,
        marginLeft: '12%',
        marginBottom: 16
    },
    sectorsContainer: {
        width: '88%',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: "500",
        color: '#fff',
    }
})
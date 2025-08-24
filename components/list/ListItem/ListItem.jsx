import React, { useState, useRef, useEffect } from 'react'
import { FlatList, Text, TouchableHighlight, View, } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { VictoryLine, VictoryChart } from 'victory-native';
import { deviceWidth } from '@/constants/dimensions';
import * as Haptics from 'expo-haptics';
import { stockData, cryptoData } from '@/data/dumb';
import { styles } from './ListItem.styles';



const ListItem = props => {


    const maxTextLength = 11;

    const cryptoDownColor = '#FF5A87';
    const cryptoUpColor = '#8FC83D';
    const stockUpColor = '#00c806';
    const stockDownColor = '#FF5000';

    const activeItemStyle = {
        width: '100%',
        marginLeft: 0,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
    }


    const [data, setData] = useState(props.data);


    const onDragStart = () => {
        props.onDragStart();
    }


    const onDragEnd = ({data}) => {
        setData(data);
        props.onDragEnd();

    }


    const handleNavigation = (ticker, type, itemData) => {
        
        if(type === 'basket'){
            props.navigation.navigate('BasketDetail', {
                info: {
                    ...itemData
                }
            })
        }
        else {
            let companyData = null;
            let coinData = null;

            for(let company of stockData){
                if(company.ticker === ticker){
                    companyData = company;
                }
            }
            for(let crypto of cryptoData){
                if(crypto.ticker === ticker){
                    coinData = crypto;
                }
            }
            if(type === 'crypto'){
                props.navigation.navigate('CryptoDetail', {
                    info: {
                        ...coinData
                    }
                })
            }
            else {
                props.navigation.navigate('CompanyDetail', {
                    info: {
                        ...companyData
                    }
                })
            }
        }
    }



    const renderItem = ({ item, index, drag, isActive }) => (
        <TouchableHighlight onLongPress={drag} underlayColor={!isActive ? '#f2f4f9' : '#fff'} onPress={() => handleNavigation(item.ticker, item.type, item)} style={{width: deviceWidth}}>
            <View style={isActive ? {...styles.itemContainer, ...activeItemStyle} : {...styles.itemContainer}}>
                <View style={isActive ? {...styles.itemInnerContainer, width: '91%'}: {...styles.itemInnerContainer}}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.tickerText}>{item.ticker.toUpperCase()}</Text>
                        <Text style={styles.nameText} >{item.name.length > maxTextLength ? item.name.slice(0,12) + '...' : item.name}</Text>
                    </View>
                    <View style={styles.graphContainer}>
                        <VictoryChart
                            width={80}
                            height={40}
                            padding={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            domainPadding={{ x: 0, y: 0 }}
                            theme={{
                                axis: {
                                    style: {
                                        axis: { stroke: "transparent" },
                                        grid: { stroke: "transparent" },
                                        ticks: { stroke: "transparent" },
                                        tickLabels: { fill: "transparent" }
                                    }
                                }
                            }}
                        >
                            <VictoryLine
                                data={item.intradayData && item.intradayData.length > 0
                                    ? item.intradayData.map((value, index) => ({ x: index, y: value }))
                                    : []}
                                style={{
                                    data: { stroke: (props.stock && item.up) ? stockUpColor : (props.stock) ? stockDownColor : item.up ? cryptoUpColor : cryptoDownColor, strokeWidth: 1.3 }
                                }}
                            />
                        </VictoryChart>
                    </View>
                    <View style={{...styles.priceContainer, backgroundColor: (props.stock && item.up) ? stockUpColor : (props.stock) ? stockDownColor : item.up ? cryptoUpColor : cryptoDownColor}}>
                        <Text style={styles.priceText}>{'$' + item.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

    );

    return (
            <DraggableFlatList
                simultaneousHandlers={props.parentRef}
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={onDragEnd}
                onDragBegin={onDragStart}
                onPlaceholderIndexChange={index => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                dragItemOverflow
                activationDistance={18}
            />
    )
}

export default ListItem




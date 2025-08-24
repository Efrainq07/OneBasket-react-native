import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { deviceWidth, deviceHeight } from '@/constants/dimensions';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '@/components/UI/HeaderButton/HeaderButton';
import { VictoryLine, VictoryChart } from 'victory-native';
import DateBar from '@/components/dateBar/DateBar';
import Collapsible from 'react-native-collapsible';

const CompanyDetailScreen = props => {

    const stockUpColor = '#00c806';
    const stockDownColor = '#FF5000';

    const [details, setDetails] = useState({...props.route.params.info });
    const [periodData, setPeriodData] = useState();
    const [showHeader, setShowHeader] = useState(false);
    const [graphData, setGraphData] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapsing = () => {
        setIsCollapsed(!isCollapsed);
    }


    const setChartData = period => {
        switch (period) {
            case '1D':
                setGraphData(details.intradayData);
                setPeriodData({
                    title: 'Today',
                    change:  '1.84 (1.54%)',
                    ahTitle: 'After-Hours',
                    ahChange: '$0.2600 (0.18%)'
                });
                break;
            case '1W':
                setGraphData(details.intradayData);
                setPeriodData({
                    title: 'Past Week',
                    change: '1.84 (1.54%)',
                });
                break;
            case '1M':
                setGraphData(details.intradayData);
                setPeriodData({
                    title: 'Past Month',
                    change: '3.21 (2.20%)',
                });
                break;
            case '3M':
                setGraphData(details.intradayData);
                setPeriodData({
                    title: 'Past 3 Months',
                    change: '6.12 (13.24%)',
                });
                break;
            case '1Y':
                setGraphData(details.intradayData);
                setPeriodData({
                    title: 'Past Year',
                    change: '11.9 (32.20%)',
                });
                break;
            case 'ALL':
                setGraphData(details.intradayData);
                setPeriodData({
                    title: 'Past 5 Years',
                    change: '23.4 (51.65%)',
                });
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        props.navigation.setOptions({
            headerBackImage: () => <Entypo style={{marginLeft: deviceWidth * 0.03}} name={'chevron-thin-left'} size={22} color={details.up ? stockUpColor : stockDownColor}/>,
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            iconSet={Feather}
                            iconName={'share'}
                            iconSize={24}
                            onPress={() => {}}
                            color={details.up ? stockUpColor : stockDownColor}
                        />
                    </HeaderButtons>
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            iconSet={Ionicons}
                            iconSize={24}
                            iconName={'checkmark-circle'}
                            onPress={() => {}}
                            color={details.up ? stockUpColor : stockDownColor}
                        />
                    </HeaderButtons>
                </View>
            ),
        })
        setPeriodData({
            title: 'Today',
            change: '1.84 (1.54%)',
            ahTitle: 'After-Hours',
            ahChange: '0.2600 (0.18%)'
        });
    }, [])


    useEffect(() => {
        setGraphData(details.intradayData);
    }, [details])



    const handleScroll = event => {
        if (!showHeader && event.nativeEvent.contentOffset.y > deviceHeight / 24) {
            setShowHeader(true)
            props.navigation.setOptions({
                headerTitle: props => {
                    return (
                        <View style={styles.headerTitleContainer}>
                            <Text style={{ marginBottom: 4, color: '#fff' }}>${details.price}</Text>
                            <Text style={{ color: '#97a4b2', fontSize: 12 }}>{details.ticker}</Text>
                        </View>
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
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.topContainer}>
                    <Text style={styles.ticker}>{details?.ticker}</Text>
                    <Text style={styles.name}>{details?.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${details?.price}</Text>
                    </View>
                    <View style={styles.changeamountContainer}>
                        <Entypo name={details.up ? 'triangle-up' : 'triangle-down'} size={24} color={details.up ? stockUpColor : stockDownColor} />
                        <View style={styles.changeAmountTextContainer}>
                            <Text style={{...styles.changeDollarAmountText, color: details.up ? stockUpColor : stockDownColor}}>${periodData?.change}</Text>
                            <Text style={styles.changeTimeText}>{periodData?.title}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.graphContainer}>
                    <VictoryChart
                        width={deviceWidth}
                        height={deviceHeight / 3}
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
                            data={graphData && graphData.length > 0
                                ? graphData.map((value, index) => ({ x: index, y: value }))
                                : []}
                            style={{
                                data: { stroke: details.up ? stockUpColor : stockDownColor, strokeWidth: 2 }
                            }}
                            animate={{ duration: 1000 }}
                        />
                    </VictoryChart>
                </View>
                
                <View style={styles.dateBarContainer}>
                    <DateBar setChartData={setChartData} color={details.up ? stockUpColor : stockDownColor} />
                </View>

                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutTitle}>About {details.name}</Text>
                    {isCollapsed ? (
                        <Text style={styles.aboutContent} numberOfLines={3}>
                            {details.about?.description || `${details.name} is a leading company in its sector.`}
                        </Text>
                    ) : null}
                    <Collapsible collapsed={isCollapsed}>
                        <Text style={styles.aboutContent}>
                            {details.about?.description || `${details.name} is a leading company in its sector.`}
                        </Text>
                        {details.about?.ceo && (
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>CEO:</Text>
                                <Text style={styles.infoValue}>{details.about.ceo}</Text>
                            </View>
                        )}
                        {details.about?.headquarters && (
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Headquarters:</Text>
                                <Text style={styles.infoValue}>{details.about.headquarters}</Text>
                            </View>
                        )}
                        {details.about?.founded && (
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Founded:</Text>
                                <Text style={styles.infoValue}>{details.about.founded}</Text>
                            </View>
                        )}
                        {details.about?.employees && (
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Employees:</Text>
                                <Text style={styles.infoValue}>{details.about.employees}</Text>
                            </View>
                        )}
                    </Collapsible>
                    <TouchableWithoutFeedback onPress={handleCollapsing}>
                        <Text style={{ ...styles.showMore, color: details.up ? stockUpColor : stockDownColor }}>
                            {isCollapsed ? 'Show More' : 'Show Less'}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            
            <View style={styles.footer}>
                <TouchableWithoutFeedback>
                    <View style={{ ...styles.button, backgroundColor: details.up ? stockUpColor : stockDownColor }}>
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Trade</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </LinearGradient>
    )
}

export default CompanyDetailScreen;

export const screenOptions = navData => {
    return {
        title: navData.route.params?.title ? navData.route.params.title : '',
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#0D1B2A',
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
            },
        },
        headerTintColor: '#fff',
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        width: deviceWidth,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexGrow: 1
    },
    headerTitleContainer: {
        alignItems: 'center'
    },
    topContainer: {
        alignItems: 'flex-start',
        marginLeft: '6%',
        marginTop: 16,
    },
    graphContainer: {
        width: deviceWidth,
        alignItems: 'center',
        height: deviceHeight / 3,
        marginTop: 32,
        marginBottom: 16
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
    },
    changeamountContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    dateBarContainer: {
        width: '88%',
        marginLeft: '6%',
        marginTop: 24
    },
    changeAmountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4
    },
    changeDollarAmountText: {
        fontSize: 13,
        fontWeight: '600',
    },
    changeTimeText: {
        fontSize: 13,
        marginLeft: 4,
        color: '#fff'
    },
    ticker: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 4,
        color: '#fff'
    },
    name: {
        fontSize: 32,
        fontWeight: '500',
        color: '#fff'
    },
    price: {
        fontSize: 32,
        fontWeight: '500',
        textAlign: 'left',
        color: '#fff'
    },
    aboutContainer: {
        width: '88%',
        marginLeft: '6%',
        marginTop: 40,
    },
    aboutTitle: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: '500',
        color: '#fff'
    },
    aboutContent: {
        textAlign: 'left',
        lineHeight: 24,
        fontSize: 15,
        color: '#fff',
        marginBottom: 16
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start'
    },
    infoLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
        marginRight: 8,
        minWidth: 100
    },
    infoValue: {
        fontSize: 15,
        color: '#fff',
        flex: 1
    },
    showMore: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 12
    },
    footer: {
        width: deviceWidth,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 16
    },
    button: {
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 50
    }
})

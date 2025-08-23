import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { deviceWidth, deviceHeight } from '../constants/dimensions';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/headerButton/headerButton';
import { VictoryLine, VictoryChart } from 'victory-native';
import DateBar from '../components/dateBar/dateBar';
import StatsContainer from '../components/detailScreenElements/statsContainer';
import NewsListItem from '../components/list/newsListItem';
import * as WebBrowser from 'expo-web-browser';
import RatingContainer from '../components/detailScreenElements/ratingContainer';
import MorningStarContainer from '../components/detailScreenElements/morningStarContainer';
import RelatedListContainer from '../components/detailScreenElements/relatedListContainer';
import AlsoOwnContainer from '../components/detailScreenElements/alsoOwnContainer';
import AboutContainer from '../components/detailScreenElements/aboutContainer';

const CompanyDetailScreen = props => {


    const stockUpColor = '#00c806';
    const stockDownColor = '#FF5000';
    const stockUpBgColor = '#E5F8E3';
    const stockDownBgColor = '#FBEBE2';

    const [details, setDetails] = useState({...props.route.params.info });


    const [periodData, setPeriodData] = useState();

    const [showHeader, setShowHeader] = useState(false);

    const [graphData, setGraphData] = useState([]);


    const newsChange = details.up ? '+1.54' : '-1.54'


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
                            <Text style={{ marginBottom: 4 }}>{details.price}</Text>
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

    const handleNewsItemPress = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} onScroll={handleScroll} scrollEventThrottle={16}>
                <View style={styles.topContainer}>
                    <Text style={styles.ticker}>{details?.ticker}</Text>
                    <Text style={styles.name}>{details?.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${details?.price}</Text>
                        <Feather name={'arrow-right-circle'} size={22} style={{ marginTop: 4 }} />
                    </View>
                    <View>
                        <View style={styles.changeamountContainer}>
                            <Entypo name={details.up ? 'triangle-up' : 'triangle-down'} size={24} color={details.up ? stockUpColor : stockDownColor} />
                            <View style={styles.changeAmountTextContainer}>
                                <Text style={{...styles.changeDollarAmountText, color: details.up ? stockUpColor : stockDownColor}}>${periodData?.change}</Text>
                                <Text style={styles.changeTimeText}>{periodData?.title}</Text>
                            </View>
                        </View>
                        {periodData?.title === 'Today' ? <View style={styles.ahChangeamountContainer}>
                            <Entypo name={'triangle-up'} size={24} color={stockUpColor} />
                            <View style={styles.changeAmountTextContainer}>
                                <Text style={{...styles.ahChangeDollarAmountText, color:stockUpColor}}>${periodData?.ahChange}</Text>
                                <Text style={styles.changeTimeText}>{periodData?.ahTitle}</Text>
                            </View>
                        </View>  : <View style={{width: '100%', height: 25}}/>}
                    </View>
                </View>
                <View style={styles.graphContainer}>
                    <VictoryChart
                        width={deviceWidth}
                        height={225}
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
                                data: { stroke: details.up ? stockUpColor : stockDownColor, strokeWidth: 1.7 }
                            }}
                            animate={{ duration: 1000 }}
                        />
                    </VictoryChart>
                </View>
                <View style={styles.dateBarContainer}>
                    <DateBar setChartData={setChartData} color={details.up ? stockUpColor : stockDownColor} />
                </View>
                <StatsContainer />
                <View style={styles.newsContainer}>
                <Text style={styles.newsTitle}>News</Text>
                {details.news ? details.news.map((item, idx) => {
                    return (
                        <NewsListItem
                        key={idx}
                        borderBottomColor={'rgba(237, 240, 244, 0.7)'}
                        onPress={() => handleNewsItemPress(item.url)}
                        source={item.source}
                        date={item.datetime}
                        uri={item.image}
                        percentage={newsChange}
                        company={item.related}
                        content={item.headline}
                        color={details.up ? stockUpColor : stockDownColor}

                    />
                    )
                }) : null}
                </View> 
                {details.analystRatings ? <RatingContainer  
                buy={details.analystRatings?.buy} 
                sell={details.analystRatings?.sell} 
                hold={details.analystRatings?.hold}
                number={details.analystRatings?.number}  
                color={details.up ? stockUpColor : stockDownColor} 
                bgColor={details.up ? stockUpBgColor : stockDownBgColor}/> : null}
                {details.analystRatings?.bullsSay ? <MorningStarContainer 
                    bullsSay={details.analystRatings.bullsSay}
                    bearsSay={details.analystRatings.bearsSay}
                    color={details.up ? stockUpColor : stockDownColor}
                /> : null}
                <RelatedListContainer/>
                <AlsoOwnContainer />
                <AboutContainer 
                    color={details.up ? stockUpColor : stockDownColor}
                    company={details.name}
                    about={details.about.description}
                    ceo={details.about.ceo}
                    headquarters={details.about.headquarters}
                    founded={details.about.founded}
                    employees={details.about.employees}
                />
                <View style={styles.disclosureContainer}>
                    <Text style={styles.disclosureContent}>
                    All investments involve risks, including the loss of principal. Securities trading offered through Robinhood Financial LLC, a registered broker-dealer and Member SIPC.
                    <Text style={{...styles.disclosureBtn, color: details.up ? stockUpColor :stockDownColor}}>Full disclosure</Text>
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.footerInnerContainer}>
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.volumeTitleText}>Today's Volume</Text>
                            <Text style={styles.volumeText}>64,765,398</Text>
                        </View>
                        <TouchableWithoutFeedback>
                    <View style={{ ...styles.button, backgroundColor: details.up ? stockUpColor : stockDownColor }}>
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Trade</Text>
                    </View>
                </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

export default CompanyDetailScreen;

export const screenOptions = navData => {
    return {
        title: navData.route.params?.title ? navData.route.params.title : '',
        headerBackTitleVisible: false,
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
    },
    graphContainer: {
        width: deviceWidth,
        alignItems: 'center',
        height: 225,
        marginTop: 64,
        marginBottom: 24
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    changeamountContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
    },
    dateBarContainer: {
        width: '88%',
        marginLeft: '6%',
        marginTop: 52
    },
    ahChangeamountContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeAmountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 2
    },
    changeDollarAmountText: {
        fontSize: 13,
        fontWeight: '600',

    },
    ahChangeDollarAmountText: {
        fontSize: 13,
        fontWeight: '600',
    },
    changeTimeText: {
        fontSize: 13,
        marginLeft: 4
    },
    ticker: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 12
    },
    name: {
        fontSize: 32,
        fontWeight: '500',
    },
    price: {
        fontSize: 32,
        fontWeight: '500',
        marginTop: 2,
        textAlign: 'left',
        marginRight: 8
    },
    newsContainer: {
        marginTop: 40,
        width: '88%',
        marginLeft: '6%'
    },
    newsTitle: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: '500'
    },
    footer: {
        width: deviceWidth,
        height: 84,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    footerInnerContainer: {
        flexDirection: 'row',
        width: '88%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,

    },
    footerTextContainer: {
        alignItems: 'flex-start',
    },
    volumeTitleText: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 6
    },
    volumeText: {
        fontSize: 15,
    },   
    button: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 50
    },
    disclosureContainer: {
        width: '88%',
        marginLeft: '6%',
        marginTop: 24,
        marginBottom: 36
    },
    disclosureContent: {
        color: '#697277',
        fontSize: 13,
        lineHeight: 22
    },
    disclosureBtn: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 12
    }
})

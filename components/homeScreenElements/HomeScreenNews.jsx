import React, { useRef, useEffect, useState } from 'react'
import { Text, View, Animated, Easing, PanResponder } from 'react-native';
import { deviceWidth } from '@/constants/dimensions';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { styles } from './HomeScreenNews.styles';




const HomeScreenNews = props => {


    const _viewRef = useRef();

    const pan = useRef(new Animated.ValueXY()).current;
    const [news, setNews] = useState(['Facebook digital wallet exec David Marcus to leave company',
    "Apple's Stock Continues To Push Higher After Breaking Out - Apple", 
    'Nasdaq Partners With Amazon to Move Market Trading to the Cloud Next Year', 
    "Good Doge! Crypto fans naming their dogs 'Doge' and cats 'Bitcoin' and 'Elon", 
    'Microsoft CEO Satya Nadella sells more than $285 million in Microsoft stock', 
    "Factbox - Who is Twitter's new CEO Parag Agrawal"]);
    
    const [prevNewsState, setPrevNewsState] = useState([...news]);

    const [currentPan, setCurrentPan] = useState(null)

    const [currentAnimateable, setCurrentAnimatable] = useState(news[1]);


    const normalizePanX = (position) => {
        return {
            scale: (Math.abs(position) / deviceWidth) * 0.2,
            opacity: (Math.abs(position) / deviceWidth)
        }

    }


    const setAnimState = async () => {
        setPrevNewsState([...news]);
        let removedElement = news.shift();
        news.push(removedElement);
        setNews(news);
        setCurrentPan(news[0]);
        setCurrentAnimatable(news[1]);
    }




    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 25,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 25,
            onPanResponderGrant: () => {
                setPrevNewsState([...news]);
                pan.setValue({
                    x: 0,
                    y: 0
                });
                pan.setOffset({
                    x: pan.x._value,
                });
                props.handleParentScroll(true);
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x },
                ],
                {
                    useNativeDriver: false,
                    listener: (event, gestureState) => {
                        props.handleParentScroll(false);
                        _viewRef.current.transitionTo({ scale: normalizePanX(pan.x._value).scale + 0.80, opacity: normalizePanX(pan.x._value).opacity })
                    }, // Optional async listener
                }
            ),
            onPanResponderRelease: (evt, gestureState) => {
                props.handleParentScroll(true);
                if ((Math.abs(gestureState.vx) > 0.3) && (Math.abs(gestureState.dx < 0))) {
                    pan.flattenOffset();
                    Animated.parallel([
                        Animated.timing(pan.x, {
                            toValue: -deviceWidth - 10,
                            duration: 400,
                            useNativeDriver: false,
                        }
                        ).start(setAnimState),
                    ])
                    pan.addListener(() => _viewRef.current.transitionTo({ scale: normalizePanX(pan.x._value).scale + 0.80, opacity: normalizePanX(pan.x._value).opacity}))
                }
                else if ((Math.abs(gestureState.vx) > 0.3) && (Math.abs(gestureState.dx > 0))) {
                    pan.flattenOffset();
                    Animated.parallel([
                        Animated.timing(pan.x, {
                            toValue: deviceWidth + 10,
                            duration: 400,
                            useNativeDriver: false,
                        }
                        ).start(setAnimState),
                    ])
                    pan.addListener(() => _viewRef.current.transitionTo({ scale: normalizePanX(pan.x._value).scale + 0.80, opacity: normalizePanX(pan.x._value).opacity}))
                }
                else if (Math.abs(pan.x._value) > deviceWidth * 0.3) {
                    pan.flattenOffset();
                    Animated.timing(pan.x, {
                        toValue: -deviceWidth - 10,
                        duration: 400,
                        useNativeDriver: false
                    }).start(setAnimState);
                    pan.addListener(() => _viewRef.current.transitionTo({ scale: normalizePanX(pan.x._value).scale + 0.80, opacity: normalizePanX(pan.x._value).opacity}))
                }
                else if (Math.abs(pan.x._value) <= deviceWidth / 3) {
                    pan.flattenOffset();
                    Animated.spring(pan.x, {
                        toValue: 0,
                        bounciness: 15,
                        useNativeDriver: false
                    }).start();
                }
            },
            //TODO pan lagging at certain point. 
            onPanResponderTerminationRequest: (evt, gestureState) => console.log('oprtr'),
            onPanResponderTerminate: (evt, gestureState) => console.log('oprt')
        })
    ).current;


    return (
        <View style={styles.container}>
            {news.map((item, idx) => {
                if (idx === 0) {
                    return (
                        <Animated.View
                            key={idx}
                            style={{
                                ...styles.innerContainer,
                                transform: [{ translateX: prevNewsState[0] === item ? pan.x : 0 }]
                            }}
                            {...panResponder.panHandlers}
                        >
                            <View style={styles.contentContainer}>
                                <View style={styles.titleContainer}>
                                    <FontAwesome5 name={"book-reader"} size={14} color={'#97a4b2'} />
                                    <Text style={styles.newsSource}>Benzinga</Text>
                                    <Text style={styles.dateText}>16h</Text>
                                </View>
                                <View style={styles.headLineContainer}>
                                    <Text style={styles.headLineText}>{item}</Text>

                                </View>
                                <View>
                                    <View style={styles.viewMoreContainer}>
                                        <Text style={styles.viewMoreText}>View Article</Text>
                                        <Feather name="chevron-right" size={20} color={'#00c806'} style={{ marginRight: -8 }} />
                                    </View>
                                </View>
                            </View>
                        </Animated.View>
                    )
                }
            })}
            {news.map((item, idx) => {
                if (idx === 1) {
                    return (
                        <Animatable.View ref={_viewRef} style={styles.animatableContainer} key={idx}>
                            <View style={styles.contentContainer}>
                                <View style={styles.titleContainer}>
                                    <FontAwesome5 name={"book-reader"} size={14} color={'#97a4b2'} />
                                    <Text style={styles.newsSource}>Benzinga</Text>
                                    <Text style={styles.dateText}>16h</Text>
                                </View>
                                <View style={styles.headLineContainer}>
                                    <Text style={styles.headLineText}>{item}</Text>
                                </View>
                                <View>
                                    <View style={styles.viewMoreContainer}>
                                        <Text style={styles.viewMoreText}>View Article</Text>
                                        <Feather name="chevron-right" size={20} color={'#00c806'} style={{ marginRight: -8 }} />
                                    </View>
                                </View>
                            </View>
                        </Animatable.View>
                    )
                }
            })}
        </View>
    )
}

export default HomeScreenNews


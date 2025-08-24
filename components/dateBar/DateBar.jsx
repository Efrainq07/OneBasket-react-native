import React, { useState, useContext } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import styles from './DateBar.styles';


const DateBar = React.memo(props => {

    const chartPeriods = ['1D', '1W', '1M', '3M', '1Y', 'ALL']


    const [selectedPeriod, setSelectedPeriod] = useState('1D');



    const theme = useContext(ThemeContext).currentTheme;




    const handleTimePeriods = period => {
        if (selectedPeriod !== period) {
            setSelectedPeriod(period);
            props.setChartData(period);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        }
    }

    const chartViews = chartPeriods.map((el, i) => {
        return (
            <TouchableWithoutFeedback key={i} onPress={() => handleTimePeriods(el)}>
                <View style={{ ...styles.chartPeriod, paddingLeft: el === '1D' ? 0 : 12, paddingRight: el === 'ALL' ? 0 : 12 }}>
                    <View style={{ backgroundColor: selectedPeriod === el ? props.color : '#1a1a1a', ...styles.chartPeriodInnerView }}>
                        <Text style={{ color: selectedPeriod === el ? '#1a1a1a' : props.color, ...styles.chartPeriodText }}>{el}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    })

    return (
        <View style={styles.bar}>
            {chartViews}
        </View>
    )
})


export default DateBar;

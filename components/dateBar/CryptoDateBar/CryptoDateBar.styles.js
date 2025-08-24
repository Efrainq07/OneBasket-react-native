import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        width: '100%',
        marginTop: 12,
        marginBottom: 4,
        borderRadius: 7,
        paddingVertical: 7,
    },
    chartPeriodText: {
        fontSize: 13,
    }, 
    chartPeriod: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    chartPeriodInnerView: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6,
    }
});
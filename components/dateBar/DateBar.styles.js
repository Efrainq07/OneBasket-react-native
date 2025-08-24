import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 12,
        marginBottom: 4,
        borderRadius: 7,
        paddingVertical: 7,
    },
    chartPeriodText: {
        fontSize: 13,
        fontWeight: '700'
    },
    chartPeriod: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartPeriodInnerView: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6,
    }
});

export default styles;
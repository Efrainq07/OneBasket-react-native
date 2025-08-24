import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'rgba(237, 240, 244, 0.7)',
        borderBottomWidth: 0.5,
        width: '88%',
        marginLeft: '6%',
    },
    itemInnerContainer: {
        width: '100%',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameContainer: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%',
        width: '30%'
    },
    graphContainer: {
        height: '100%',
        width: '24%',
        marginRight: 36
    },
    priceContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        color: '#fff',
        fontSize: 15
    },
    tickerText: {
        color: '#fff',
        fontSize: 15
    },
    nameText: {
        color: '#fff',
        fontSize: 13,
        marginTop: 6
    }
});
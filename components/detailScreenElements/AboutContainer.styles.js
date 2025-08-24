import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '88%',
        marginLeft: '6%',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: '500',
        marginTop: 32
    },
    content: {
        textAlign: 'left',
        lineHeight: 24,
        fontSize: 15
    },
    showMore: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 12
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContainer: {
        width: '47%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(237, 240, 244, 0.7)'
    },
    fullWidthItemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(237, 240, 244, 0.7)'
    },
    itemTitle: {
        color: '#697277',
        fontSize: 13,
    },
    itemAmount: {
        fontSize: 15
    },
    hr: {
        borderWidth: 0.5,
        height: 1,
        width: '88%',
        borderColor: 'rgba(237, 240, 244, 0.7)',
        marginBottom: 12,
        marginTop: 18
    }
});
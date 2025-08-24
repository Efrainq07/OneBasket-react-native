import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: 140,
        height: 180,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#edf0f4',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 16,
        paddingLeft: 12,
        marginRight: 12
    },
    bottomContainer: {
        width: '90%',
    }, 
    company: {
        fontSize: 15,
    }, 
    ticker: {
        fontSize: 26,
        fontWeight: '400',
        marginBottom: 8
    },
    percentage: {
        fontSize: 12,
        fontWeight: '500'
    }
});
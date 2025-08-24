import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    followingContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    followingBox: {
        flexDirection: 'row',
        marginLeft: '6%',
        width: '88%',
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#edf0f4',
        borderBottomWidth: 0.5,
    },
    followingTitleText: {
        fontSize: 24,
        fontWeight: '500',
        marginLeft: '6%',
        marginBottom: 6,
        marginTop: 42
    },  
    listNameContainer: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    listName: {
        fontSize: 15,
    },
    listAmountText: {
        color: '#697277',
        marginTop: 6
    },
});
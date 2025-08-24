import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'flex-start',
        marginVertical: 0,
    },
    emojiContainer: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderRadius: 4,        
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    titleContainer: {
        width: '88%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginLeft: '6%'
    },
    titleLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },      
    listNameContainer: {
        marginLeft: 16,
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderWidth: 1,
        borderColor: '#eff4f9',
        paddingRight: 6
    },
    listName: {
        color: "#fff",
        fontSize: 15
    },
    emojiText: {
        fontSize: 24
    },
    listAmountText: {
        color: '#697277',
        marginTop: 6
    }
});

export default styles;
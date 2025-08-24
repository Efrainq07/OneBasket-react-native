import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingLeft: 8,
        paddingRight: 16,
        borderColor: '#edf0f4',
        borderWidth: 1.2,
        borderRadius: 25,
        marginRight: 6
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 6
    },
    listName: {
        fontSize: 15,
    }
});
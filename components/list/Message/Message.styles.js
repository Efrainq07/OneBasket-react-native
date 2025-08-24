import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    messageContainer: {
        flexShrink: 1,
        marginLeft: 8,
        backgroundColor: '#F6F8FA',
        paddingHorizontal: 14,
        paddingBottom: 10,
        paddingTop: 12,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    imageContainer: {
        width: 33,
        height: 33,
        borderRadius: 16.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        marginTop: 16,
        borderRadius: 50,
        borderWidth: 0.5,
        backgroundColor: 'transparent'
    }
});
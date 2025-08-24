import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(237, 240, 244, 0.7)',
        marginBottom: 16
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sourceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    middleContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between'
    },  
    srcText: {
        fontWeight: '700',
        marginRight: 6,
        fontSize: 13
    },
    srcDate: {
        fontWeight: '400',
        fontSize: 13
    },
    threeDots: {
        fontWeight: '800',
        fontSize: 18
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 6
    },
    newsText: {
        width: '80%',
        lineHeight: 22,
        fontSize: 15
    },
    companyText: {
        fontSize: 12,
        fontWeight: '700',
    }
});
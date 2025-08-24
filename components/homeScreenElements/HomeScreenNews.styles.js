import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from '@/constants/dimensions';

export const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        backgroundColor: '#ebeff4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    },
    innerContainer: {
        width: deviceWidth * 0.97,
        height: 195,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginVertical: 6
    },
    animatableContainer: {
        zIndex: -1,
        position: 'absolute',
        width: deviceWidth * 0.97,
        height: 195,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginVertical: 6
    },
    contentContainer: {
        height: '100%',
        paddingVertical: '4%',
        width: '88%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    viewMoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headLineContainer: {
        flex: 1,
        marginTop: 12,
        width: '90%'

    },
    newsSource: {
        fontWeight: '600',
        marginHorizontal: 8,
        color: '#97a4b2'
    },
    dateText: {
        color: '#97a4b2'
    },
    headLineText: {
        fontSize: 17,
        lineHeight: 26,
    },
    viewMoreText: {
        color: '#00c806',
        fontSize: 13,
        fontWeight: '600'
    }
});
import {
  StyleSheet,
} from 'react-native'


export default StyleSheet.create({
    bg: {
        flex: 1,
    },
    main: {
        backgroundColor: '#333',
        display: 'flex',
        flex: 1,
    },

    // 分层
    block: {
        backgroundColor: 'white',
        marginBottom: 20,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 6,
    },
    block_title: {
        color: 'black',
        fontSize: 16,
    },
})

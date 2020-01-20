import React from 'react-native'
import {
    N_5,
} from '../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    container: {
    },
    header: {
        backgroundColor: '#CCC',
        paddingTop: 80,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header_bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    header_bg_img: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: {
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    item: {
        borderBottomWidth: .5,
        borderBottomColor: '#d9d9d9',
        paddingTop: 22,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    item_last: {
        borderBottomWidth: 0,
    },
    item_text: {
        marginLeft: 15,
        fontSize: 16,
        color: '#202020',
    },
    icon: {
        width: 22,
        height: 22,
    },
}

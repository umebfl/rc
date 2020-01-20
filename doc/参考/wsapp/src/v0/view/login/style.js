import React from 'react-native'
import {
    N_5,
    COLOR_RED_L,
} from '../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    content: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: deviceHeight / 5.8,
    },
    text: {
        marginTop: 15,
        marginBottom: 20,
        color: COLOR_RED_L,
    },
    title: {
        alignSelf: 'center',
        color: '#383838',
        fontSize: 32,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    listItem: {
        borderBottomWidth: 0,
        padding: 0,
        margin: 0,
    },
    listItem_left_text: {
        position: 'absolute',
        marginTop: N_5,
        color: '#3DA8F5',
    },
}

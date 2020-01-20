
import React from 'react-native'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    footer: {
        height: 50,
    },
    footerTab: {
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#fff',
    },
    thumbnail: {
        width: 20,
        height: 20,
    },
    text: {
        fontSize: 12,
        color: '#a6a6a6'
    },
}

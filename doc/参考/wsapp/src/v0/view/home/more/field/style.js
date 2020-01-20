
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    item: {
        marginBottom: variable.N_100,
        marginLeft: variable.N_25,
        marginRight: variable.N_25,
        height: deviceWidth * .4,
        borderWidth: variable.N_1,
        borderLeftWidth: variable.N_3,
        borderColor: variable.COLOR_BLUE_XL,
        borderLeftColor: variable.COLOR_BLUE,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_top: {
        marginTop: variable.N_80,
    },
    item_gray: {
        borderColor: variable.COLOR_GRAY_XL,
        borderLeftColor: variable.COLOR_GRAY_XL,
    },
    item_image: {
        width: variable.N_30,
        height: variable.N_30,
        marginRight: variable.N_15,
    },
    item_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
        paddingBottom: variable.N_5,
    },
    item_text_sub: {
        width: 200,
    },
    item_time: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
        paddingBottom: variable.N_5,
    },
    item_location1: {
        fontSize: variable.N_14,
        width: 200,
        color: variable.COLOR_GRAY,
    },
}

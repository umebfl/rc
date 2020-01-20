
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    body: {
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
    },
    item: {
        borderBottomWidth: variable.BORDER_WIDTH,
        borderBottomColor: variable.BORDER_COLOR,
    },
    title: {
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: variable.N_50,
    },
    title_left: {
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY,
    },
    title_right: {
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY,
    },
    msg: {
        paddingBottom: variable.N_20,
        color: variable.COLOR_GRAY_XD,
    }
}

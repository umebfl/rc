
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    point_base: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    point_active: {
        backgroundColor: 'white',
    },
    point: {
        backgroundColor: variable.COLOR_BLUE,
    },
    img_style: {
        marginTop: 3,
        width: 28,
        height: 28,
    }
}

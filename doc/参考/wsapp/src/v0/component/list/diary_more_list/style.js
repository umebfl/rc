
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    icon_style: {
        width: variable.N_20,
        height: variable.N_20,
        marginRight: variable.N_5,
    },
    num_style: {
        fontSize: variable.N_12,
        color: '#a6a6a6',
        marginRight: variable.N_10,
    }
}

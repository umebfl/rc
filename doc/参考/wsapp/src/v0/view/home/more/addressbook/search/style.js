
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    search_view: {
        height: variable.N_40,
        borderWidth: variable.ABS_d5,
        borderColor: '#a6a6a6',
        borderRadius: variable.N_20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text_input: {
        width: deviceWidth * 0.8,
        height: variable.N_40,
        fontSize: variable.N_16,
        paddingLeft: variable.N_14,
        padding: variable.N_10,
    },
}

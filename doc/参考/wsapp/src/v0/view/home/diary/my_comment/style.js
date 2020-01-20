
import React from 'react-native'

import {COLOR_NEXT, COLOR_TEXT, BASE_FONT_SIZE} from '../../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    text_input: {
        height: 120,
        fontSize: variable.N_16,
        borderWidth: variable.ABS_d5,
        borderColor: variable.COLOR_GRAY_XXL,
        textAlignVertical: 'top',
        borderRadius: variable.N_5,
        backgroundColor: variable.COLOR_GRAY_XXL,
        marginTop: variable.N_20,
        padding: variable.N_10,
        color: variable.COLOR_GRAY_D,
        lineHeight: variable.N_20,
    },
    push_wrap: {
        justifyContent: 'center',
        backgroundColor: variable.COLOR_MAIN,
        height: variable.N_36,
        marginTop: variable.N_20,
        marginBottom: variable.N_20,
        borderRadius: variable.N_36,
    },
    push_text: {
        fontSize: variable.N_16,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
}

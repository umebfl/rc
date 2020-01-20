
import React from 'react-native'

import {COLOR_NEXT, COLOR_TEXT, BASE_FONT_SIZE} from '../../../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        justifyContent: 'space-between',
    },
    title: {
        paddingTop: variable.N_20,
        paddingBottom: variable.N_20,
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY_XD,
    },
    tip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tip_item_base: {
        width: 70,
        padding: variable.N_5,
        textAlign: 'center',
        borderRadius: variable.N_2,
    },
    tip_item: {
        borderWidth: variable.ABS_d5,
        borderColor: variable.COLOR_GRAY_L,
        color: variable.COLOR_GRAY,
    },
    tip_item_active: {
        borderWidth: variable.ABS_d5,
        borderColor: variable.COLOR_BLUE,
        color: variable.COLOR_BLUE,
        backgroundColor: variable.NORMAL_COLOR_BG
    },
    text_input_wrap: {
        borderWidth: variable.ABS_d5,
        borderColor: variable.COLOR_GRAY_L,
        borderRadius: variable.N_5,
        marginTop: variable.N_25,
        // padding: variable.N_10,
        paddingRight: variable.N_8,
        paddingLeft: variable.N_8,
        height: 150,
    },
    text_input: {
        fontSize: variable.N_16,
        textAlignVertical: 'top',
        height: 150,
    },
    push_wrap: {
        justifyContent: 'center',
        backgroundColor: variable.COLOR_MAIN,
        height: variable.N_36,
        marginTop: variable.N_60,
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


import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../../theme/ume-theme/variable.js'

export default {
    time_select_wrap: {
        backgroundColor: 'white',
        // backgroundColor: 'pink',
        borderBottomWidth: variable.BORDER_WIDTH,
        borderBottomColor: variable.COLOR_GRAY_XXL,
    },
    time_select: {
        flexDirection: 'row',
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
    },
    time_text_wrap: {
        paddingLeft: variable.N_14,
        paddingRight: variable.N_14,
        paddingBottom: variable.N_6,
        paddingTop: variable.N_6,
        borderRadius: variable.N_20,
        marginRight: variable.N_20,
    },
    time_text_wrap_active: {
        backgroundColor: variable.COLOR_MAIN,
        paddingLeft: variable.N_14,
        paddingRight: variable.N_14,
        paddingBottom: variable.N_6,
        paddingTop: variable.N_6,
        borderRadius: variable.N_20,
        marginRight: variable.N_20,
    },
    time_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
    },
    time_text_active: {
        fontSize: variable.N_14,
        color: 'white',
    },
    padding_wrap: {
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
        paddingBottom: variable.N_15,
    },
    duty_item: {
        paddingTop: variable.N_20,
    },
    duty_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
        textAlignVertical: 'top',
        lineHeight: variable.N_24,
    },
    duty_input_wrap: {
        backgroundColor: variable.COLOR_GRAY_XXL,
        height: variable.N_80,
        borderRadius: variable.N_5,
        marginTop: variable.N_15,
        paddingLeft: variable.N_5,
        paddingRight: variable.N_5,
    },
    duty_input: {
        fontSize: variable.N_16,
        textAlignVertical: 'top',
        height: variable.N_80,
    },
    title_items: {
        borderTopWidth: variable.N_4,
        borderBottomWidth: variable.N_4,
        borderColor: variable.COLOR_GRAY_XXL,
    },
    item_wrap: {
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
        paddingTop: variable.N_15,
        paddingBottom: variable.N_15,
    },
    title_wrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vertical_line: {
        width: variable.N_3,
        height: variable.N_12,
        marginRight: variable.N_6,
        backgroundColor: variable.COLOR_MAIN,
    },
    title: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY_XD,
    },
    item_center_border: {
        borderTopWidth: variable.BORDER_WIDTH,
        borderBottomWidth: variable.BORDER_WIDTH,
        borderColor: variable.COLOR_GRAY_XXL,
    },
    content_note: {
        flexDirection: 'row',
        marginTop: variable.N_30,
        height: variable.N_30,
    },
    content_note_common: {
        fontSize: variable.N_16,
        height: 30,
        textAlignVertical: 'center',
    },
    content_note_center: {
        fontSize: variable.N_20,
        paddingLeft: 5,
        paddingRight: 5,
        height: 30,
        textAlignVertical: 'center',
        color: variable.COLOR_RED_XXL,
    },
    push_wrap: {
        justifyContent: 'center',
        backgroundColor: variable.COLOR_MAIN,
        height: variable.N_40,
        borderRadius: variable.N_36,
    },
    push_text: {
        fontSize: variable.N_16,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
}

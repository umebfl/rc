
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../component/../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    content_info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
    },
    content_info_wrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    content_duty: {
        // marginTop: variable.N_20,
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
    },
    content_duty_title: {
        color: variable.COLOR_GRAY,
        fontSize: variable.N_14,
        lineHeight: 24,
        paddingTop: variable.N_10,
    },
    content_duty_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY_XD,
    },
    content_duty_title_right: {
        color: variable.COLOR_GRAY,
    },
    content_feel: {
        paddingTop: variable.N_20,
        // borderBottomWidth: 1,
        // borderBottomColor: variable.COLOR_GRAY_L,
        // paddingLeft: variable.N_20,
        // paddingRight: variable.N_20,
    },
    icon_arrow: {
        width: variable.N_16,
        height: variable.N_16,
    },
    icon_feel: {
        width: 25,
        height: 25,
    },
    comment_text: {
        fontSize: variable.N_12,
        color: variable.COLOR_GRAY,
    },
    comment_text_right: {
        fontSize: variable.N_12,
        color: variable.COLOR_GRAY,
        paddingRight: variable.N_10,
    },
    operation_text_right: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
        paddingRight: variable.N_10,
    },
    operation_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
    },
    duty_text_pre: {
        marginRight: variable.N_10,
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY,
    },
    text_cancel: {
        paddingTop: variable.N_10,
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY,
    },
    text_input: {
        height: 100,
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
    avatar: {
        width: 28,
        height: 28,
        marginRight: variable.N_5,
    },
    
}

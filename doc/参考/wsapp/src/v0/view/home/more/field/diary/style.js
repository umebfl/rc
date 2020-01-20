
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    content_info: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: variable.BORDER_WIDTH,
        borderBottomColor:  variable.BORDER_COLOR,
        padding: variable.N_20,
        paddingBottom: variable.N_20,
    },
    content_info_left: {
        alignSelf: 'center',
        color: variable.COLOR_BLUE,
        fontSize: variable.N_18,
    },
    content_info_right: {
        alignItems: 'center',
    },
    content_info_right_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
    },
    right_text_bottom: {
        paddingBottom: variable.N_2,
    },
    content_time_wrap: {
        borderBottomWidth: variable.BORDER_WIDTH,
        borderBottomColor: variable.BORDER_COLOR,
    },
    content_time: {
        color: variable.COLOR_GRAY_XXD,
        fontSize: variable.N_16,
        paddingBottom: variable.N_20,
    },
    content_duty: {
        marginTop: variable.N_15,
    },
    content_duty_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: variable.N_10,
        paddingBottom: variable.N_10,
    },
    content_duty_text: {
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY_XD,
    },
    content_duty_title_right: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
    },
    feel_share: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    feel_share_point: {
        height: variable.N_12,
        width: variable.N_12,
        borderWidth: variable.N_1,
        borderColor: variable.COLOR_BLUE,
        marginRight: variable.N_5,
        borderRadius: variable.N_6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    feel_share_drop_base: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    feel_share_drop: {
        backgroundColor: 'white',
    },
    feel_share_drop_active: {
        backgroundColor: variable.COLOR_BLUE,
    },
    feel_share_text: {
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY_D,
    },
    feel_share_text_active: {
        fontSize: variable.N_16,
        color: variable.COLOR_BLUE,
    },
    content_duty_caption: {
        paddingTop: variable.N_5,
        paddingBottom: variable.N_5,
    },
    text_input_wrap: {
        height: variable.N_80,
        borderWidth: variable.ABS_d5,
        borderColor: variable.COLOR_BLUE,
        borderRadius: variable.N_5,
        marginTop: variable.N_10,
        paddingLeft: variable.N_5,
        paddingRight: variable.N_5,
    },
    text_input: {
        fontSize: variable.N_16,
        textAlignVertical: 'top',
        height: variable.N_80,
    },
    content_feel: {
        paddingTop: variable.N_20,
    },
    content_feel_text: {
        paddingBottom: variable.N_10,
        color: variable.COLOR_GRAY_XXD,
        fontSize: variable.N_16,
    },
    content_feel_base_wrap: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 36,
        borderWidth: variable.N_1,
        borderRadius: 15,
    },
    content_feel_base: {
        textAlign: 'center',
    },
    content_so_bad_wrap: {
        borderColor: variable.COLOR_RED,
    },
    content_so_bad: {
        color: variable.COLOR_RED,
    },
    content_so_bad_wrap_active: {
        backgroundColor: variable.COLOR_RED,
        borderWidth: variable.N_1,
        borderColor: variable.COLOR_RED,
    },
    content_active: {
        color: 'white',
    },
    content_bad_wrap: {
        borderColor: variable.BAD_COLOR,
    },
    content_bad: {
        color: variable.BAD_COLOR,
    },
    content_bad_wrap_active: {
        backgroundColor: variable.BAD_COLOR,
        borderColor: variable.BAD_COLOR,
    },
    content_bad_active: {
        color: 'white',
    },
    content_normal_wrap: {
        borderColor: variable.NORMAL_COLOR,
    },
    content_normal: {
        color: variable.NORMAL_COLOR,
    },
    content_normal_wrap_active: {
        backgroundColor: variable.NORMAL_COLOR,
        borderColor: variable.NORMAL_COLOR,
    },
    content_good_wrap: {
        borderColor: variable.GOOD_COLOR,
    },
    content_good: {
        color: variable.GOOD_COLOR,
    },
    content_good_wrap_active: {
        backgroundColor: variable.GOOD_COLOR,
        borderColor: variable.GOOD_COLOR,
    },
    content_good_active: {
        color: 'white',
        borderWidth: variable.N_1,
        borderRadius: 14,
    },
    content_grade_wrap: {
        borderColor: variable.GRADE_COLOR,
    },
    content_grade: {
        color: variable.GRADE_COLOR,
    },
    content_grade_wrap_active: {
        backgroundColor: variable.GRADE_COLOR,
        borderColor: variable.GRADE_COLOR,
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
        height: variable.N_36,
        borderRadius: variable.N_36,
    },
    push_text: {
        fontSize: variable.N_16,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    row: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        flexDirection: 'row',
    },
    dropdown_3: {
        borderColor: variable.COLOR_GRAY_L,
        borderWidth: variable.ABS_d5,
        borderRadius: 4,
        padding: 8,
    },
    dropdown_text_style: {
        backgroundColor: 'white',
        color: variable.COLOR_GRAY,
        fontSize: variable.N_16,
        height: variable.N_50,
    },
    dropdown_text_high_light: {
        color: variable.COLOR_MAIN,
        fontSize: variable.N_16,
    },
}

import React from 'react-native'

import * as variable from '../../../theme/ume-theme/variable.js'

const {StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    content_header_left_image: {
        width: variable.N_22,
        height: variable.N_22,
        marginRight : variable.N_20,
        marginLeft: variable.N_20,
    },
    content_header_left_image_radius: {
        width: variable.N_50,
        height: variable.N_50,
        borderRadius: variable.N_25,
        marginRight : variable.N_20,
        marginLeft: variable.N_20,
    },
    content_body_listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    content_body_listItem_show_bottom_border: {
        borderBottomColor: variable.BORDER_COLOR,
        borderBottomWidth: variable.BORDER_WIDTH,
    },
    content_body_item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: variable.N_60,
    },
    line_down: {
        borderBottomWidth: variable.BORDER_WIDTH,
        borderBottomColor: variable.BORDER_COLOR,
    },
    content_body_item_text_left: {
        width: deviceWidth * .4,
        color: variable.COLOR_GRAY_XD,
    },
    text_font_size: {
        fontSize: variable.N_16,
    },
    text_font_size_small: {
        fontSize: variable.N_14,
    },
    text_right_width: {
        width: deviceWidth * .45,
        fontSize: variable.N_14,
        textAlign: 'right',
        paddingRight: variable.N_25,
        color: variable.COLOR_GRAY_D,
    },
    image_left: {
        width: variable.N_20,
        height: variable.N_20,
    },
    image_touchable: {
        width: variable.N_60,
        height: variable.N_60,
        padding: variable.N_20,
    },
    text_color_gray:{
        color:'#A6A6A6'
    }
}

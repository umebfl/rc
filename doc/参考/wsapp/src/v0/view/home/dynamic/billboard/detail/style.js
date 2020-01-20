
import React from 'react-native'

import {COLOR_NEXT, COLOR_TEXT, BASE_FONT_SIZE} from '../../../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    img_bg: {
        width: deviceWidth,
        height: deviceHeight * .3
    },
    content: {
        paddingTop: variable.N_20,
        paddingLeft: variable.N_20,
        paddingBottom: variable.N_20,
    },
    content_list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: variable.ABS_d5,
        borderBottomColor: variable.COLOR_GRAY_XL,
    },
    content_list_rank: {
        flexDirection: 'row',
    },
    content_list_num_wrap: {
        paddingTop: 4,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'red',
        borderRadius: 6,
    },
    content_list_num_text: {
        color: 'white',
    },
    content_list_name: {
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY_XD,
        paddingLeft: variable.N_10,
    },
    content_list_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_size: {
        width: variable.N_25,
        height: variable.N_25,
    },
    content_list_item_amount: {
        width: 35,
        paddingLeft: variable.N_5,
        // paddingRight: variable.N_20,
    },
    avatar_img: {
        marginRight: 10,
        marginLeft: 10,
    },
}

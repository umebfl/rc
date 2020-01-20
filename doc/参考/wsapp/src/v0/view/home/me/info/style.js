import React from 'react-native'

import {COLOR_NEXT, COLOR_TEXT, BASE_FONT_SIZE} from '../../../../theme/ume-theme/variable.js'

import * as variable from '../../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    container_view: {
        flex: 1,
        backgroundColor: variable.COLOR_GRAY_XXL,
    },
    //ͷ��  ����   ְλ
    avatar_view: {
        backgroundColor: 'white',
        marginBottom: variable.N_20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
    },
    avatar_image_left: {
        width: variable.N_22,
        height: variable.N_22,
        marginLeft: variable.N_20,
        marginRight: variable.N_20,
    },
    avatar_view_right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar_text_top: {
        color: variable.COLOR_GRAY_XD,
        fontSize: variable.N_16,
    },
    avatar_image_right: {
        width: variable.N_80,
        height: variable.N_80,
        borderRadius: variable.N_40,
        marginRight: variable.N_20,
    }
}

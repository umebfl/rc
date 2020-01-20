import React from 'react-native'

import * as variable from '../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    container_view: {
        flex: 1,
        backgroundColor: variable.COLOR_GRAY_XXL,
    },
    //头像  姓名   职位
    info_wrap: {
        backgroundColor: 'white',
        marginBottom: variable.N_10,
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
    },
    avatar_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 110,
    },
    info_style: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info_job: {
        flex: 1,
        alignItems: 'flex-end',
    },
    avatar_image: {
        marginRight: variable.N_20,
    },
    avatar_text_top: {
        color: variable.COLOR_GRAY_XD,
        fontSize: variable.N_18,
        paddingBottom: variable.N_5,
    },
    avatar_text_btm: {
        color: variable.COLOR_GRAY_D,
        fontSize: variable.N_14,
        paddingBottom: variable.N_2,
        paddingRight: variable.N_20,
    },
    info_attend: {
        fontSize: variable.N_12,
        color: variable.COLOR_GRAY_L,
        paddingBottom: variable.N_10,
    },
    info_attend_wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: variable.N_20,
    },
    info_attend_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info_attend_time: {
        fontSize: variable.N_20,
        color: variable.COLOR_GRAY_XD,
        paddingBottom: variable.N_5,
    },
    info_attend_msg: {
        fontSize: variable.N_12,
        color: variable.COLOR_GRAY,
    },
    info_attend_border: {
        width: variable.BORDER_WIDTH,
        height: variable.N_20,
        backgroundColor: variable.COLOR_GRAY_L,
    },
}

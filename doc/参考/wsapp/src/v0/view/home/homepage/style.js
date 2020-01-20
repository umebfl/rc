import {
    Platform,
} from 'react-native'

import * as variable from '../../../theme/ume-theme/variable.js'

const POINT_SIZE = 35

export default {
    content: {
        paddingLeft: variable.N_20,
        paddingRight: variable.N_20,
        paddingTop: variable.N_30,
    },
    date_wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date_wrap_text: {
        fontSize: variable.N_18,
        color: variable.COLOR_GRAY_XD,
    },
    info_wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: variable.N_20,
    },
    info_wrap_msg: {
        paddingLeft: variable.N_10,
    },
    info_wrap_name: {
        fontSize: variable.N_16,
        color: variable.COLOR_GRAY_XD,
    },
    info_wrap_jobcn: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
        paddingTop: variable.N_5
    },
    msg_wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: variable.N_40,
    },
    msg_item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: variable.N_20,
        padding: variable.N_10,
        paddingTop: 0,
        paddingBottom: 0,
    },
    msg_img_wrap: {
        // width: (variable.SCREEN_WIDTH - variable.N_80) * 0.3333,
        width: (variable.SCREEN_WIDTH - variable.N_60 - variable.N_60) * 0.3333,
        height: (variable.SCREEN_WIDTH - variable.N_60 - variable.N_60) * 0.3333,
        // height: variable.SCREEN_WIDTH * 0.33 - variable.N_50,
        borderRadius: variable.N_2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variable.COLOR_MAIN,
    },
    msg_img_wrap_gray: {
        backgroundColor: variable.COLOR_GRAY_L,
    },
    msg_img: {
        width: variable.N_50,
        height: variable.N_50,
    },
    msg_item_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY_D,
        paddingTop: variable.N_10,
    },
    todo_bg: {
        backgroundColor: '#f5a623',
    },
    billboard: {
        backgroundColor: '#69ca7d',
    },
    point_wrap: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: -10,
        right: 0,
        backgroundColor: variable.COLOR_POINT,
        borderRadius: variable.N_20,
        padding: variable.N_5,
        paddingTop: variable.N_2,
        paddingBottom: variable.N_2,
        zIndex: 1000,
    },
    point_small_wrap: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: -10,
        right: 0,
        backgroundColor: variable.COLOR_POINT,
        borderRadius: variable.N_11,
        width: variable.N_22,
        height: variable.N_22,
        zIndex: 1000,
    },
    item_point_text: {
        fontSize: variable.N_12,
        color: 'white',
    },
}

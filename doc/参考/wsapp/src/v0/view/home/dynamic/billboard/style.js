
import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    content: {
        flexDirection: 'row',
    },
    content_bg: {
        margin:  variable.N_20,
        // marginBottom: 0,
    },
    content_list: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: variable.ABS_d5,
        borderBottomColor: variable.COLOR_GRAY_XL,
        paddingTop: variable.N_20,
    },
    content_list_item: {
        flex: 1,
        flexDirection: 'row',
    },
    content_list_item_name: {
        flex: 1,
        flexDirection: 'row',
        color: variable.COLOR_GRAY,
    },
    content_list_item_rank: {
        flexDirection: 'row',
    },
    icon_size: {
        width: variable.N_20,
        height: variable.N_20,
    },
    content_list_item_comment: {
        width: variable.N_20,
        height: variable.N_20,
        marginLeft: variable.N_20,
    },
    content_list_item_amount: {
        width: variable.N_40,
        paddingLeft: variable.N_5,
        color: '#a6a6a6',
    },
    background_Img_1st: {
        width: 382*0.3,
        height: 317*0.3,
    },
    background_Img_2st: {
        width: 212*0.3,
        height: 236*0.3,
    }
}

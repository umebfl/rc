import React from 'react-native'

import {COLOR_NEXT, COLOR_TEXT, BASE_FONT_SIZE} from '../../../../theme/ume-theme/variable.js'

import * as variable from '../../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    container_view: {
        flex: 1,
        // backgroundColor: variable.COLOR_GRAY_XXL,
        backgroundColor: 'red',
    },
    content_item_container_isolated: {
        marginTop: variable.N_50,
    },
    content_item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: variable.N_60,
        borderBottomWidth: variable.BORDER_WIDTH,
        borderBottomColor: variable.BORDER_COLOR,
    },
    content_text_left: {
        fontSize: variable.N_16,
        color: '#383838',
        paddingLeft: variable.N_20,
    },
    content_item_btm: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: variable.N_60,
    },
    content_text_right: {
        paddingRight: variable.N_20,
    },
    content_item_out: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: variable.N_60,
    },
    content_item_left: {
        fontSize: variable.N_16,
        color: variable.COLOR_RED,
    }
}

import React from 'react-native'

import * as variable from '../../theme/ume-theme/variable.js'

export default {
    // footer: {
    //
    // },
    // footerTab: {
    //     backgroundColor: '#FFF',
    // },
    // thumbnail: {
    //     width: 24,
    //     height: 24,
    // },
    // thumbnail_active: {
    //     width: 28,
    //     height: 28,
    // },
    // text: {
    //     fontSize: 10,
    //     color: '#A6A6A6',
    // },
    // text_active: {
    //     color: '#3DA8F5',
    // },
    hidden: {
        marginLeft: variable.SCREEN_WIDTH + 100,
    },
    view: {
        flex: 1,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_wrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: variable.N_60,
        height: variable.N_54,
        zIndex: 1000,
    },
    item_icon: {
        width: variable.N_24,
        height: variable.N_24,
        marginBottom: variable.N_5,
    },
    item_text: {
        fontSize: variable.N_12,
        color: variable.COLOR_GRAY,
    },
    item_text_active: {
        color: variable.COLOR_MAIN,
    },
    item_point_text: {
        fontSize: variable.N_12,
        color: 'white',
    },
}

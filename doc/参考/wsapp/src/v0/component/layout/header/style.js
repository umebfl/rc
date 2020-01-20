import {
    Platform,
} from 'react-native'

import {
    COLOR_GRAY_XXD,
    SCREEN_WIDTH,
    ZINDEX_HEADER,
    STATUSBAR_FILLUP_HEIGHT,
    HEADER_BACKGROUND_COLOR,
    HEADER_HEIGHT,
    HEADER_ICON_TOUCH_WIDTH,
    HEADER_ICON_WIDTH,
    HEADER_TEXT_COLOR,
    COLOR_GRAY_XL,
    BORDER_WIDTH,
    BORDER_COLOR,
    N_15,
    N_16,
    N_18,
    N_20,
    N_25,
    N_50,
    N_60,
} from '../../../theme/ume-theme/variable.js'

export default {
    container: {
        position: 'absolute',
        zIndex: ZINDEX_HEADER,

        width: SCREEN_WIDTH,
        height: HEADER_HEIGHT,

        paddingTop: STATUSBAR_FILLUP_HEIGHT,

        top: 0,
        left: 0,

        backgroundColor: HEADER_BACKGROUND_COLOR,

        borderBottomWidth: BORDER_WIDTH,
        borderBottomColor: BORDER_COLOR,

        flexDirection: 'row',
        flexWrap: 'nowrap',

        alignItems: 'center',
    },

    icon_touchable: {
        width: HEADER_ICON_TOUCH_WIDTH,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: HEADER_ICON_WIDTH,
        height: HEADER_ICON_WIDTH,
    },

    left: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    center: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    center_text: {
        textAlign: 'center',
    },

    title_left_text: {
        fontSize: N_16,
        color: COLOR_GRAY_XL,
    },

    title_text: {
        fontSize: N_18,
        color: HEADER_TEXT_COLOR,
    },

    right: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },


}

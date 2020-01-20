import React from 'react-native'

const { StyleSheet, Dimensions } = React

import * as variable from '../../../../theme/ume-theme/variable.js'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    input_wrap: {
        height: variable.N_50,
        backgroundColor: variable.COLOR_GRAY_XXL,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth * 0.95,
        height: variable.N_40,
        borderRadius: variable.N_8,
        backgroundColor: 'white',
    },
    search_img: {
        width: variable.N_15,
        height: variable.N_15,
        marginRight: variable.N_10,
    },
    search_text: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
    },
    search_wrap_active: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: deviceWidth * 0.95,
    },
    search_input_wrap_active: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: variable.N_40,
        borderRadius: variable.N_20,
        backgroundColor: 'white',
    },
    text_input_wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: variable.N_10,
    },
    text_input: {
        width: deviceWidth * 0.5,
        height: variable.N_40,
        fontSize: variable.N_14,
        padding: variable.N_4,
        backgroundColor: 'white',
        marginLeft: variable.N_10,
    },
    search_img_active_wrap: {
        padding: variable.N_10,
    },
    search_img_active: {
        width: variable.N_15,
        height: variable.N_15,
    },
    search_sure: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: variable.N_10,
    }
}

import React from 'react-native'

import * as variable from '../../../../../theme/ume-theme/variable.js'

const { StyleSheet, Dimensions } = React

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
    avatar_background: {
        width: deviceWidth,
        height: 280,
    },
    content_avatar: {
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatar_img: {
        width: variable.N_80,
        height: variable.N_80,
        borderRadius: variable.N_40,
    },
}

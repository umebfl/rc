import React, { Component } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native'

import {
    COLOR_MAIN,
    COLOR_GRAY,
    ZINDEX_FETCH_LOADING,
    SCREEN_WIDTH,
    N_5,
    N_10,
    N_12,
    N_14,
    N_20,
    N_25,
    N_40,
    N_100,
    OFFSET_HIDDEN,
} from '../../../theme/ume-theme/variable.js'

class Spinner extends Component {

    render() {
        return (
            <ActivityIndicator
              animating={true}
              color={COLOR_MAIN}
              size='small'
              {...this.props}/>
        )
    }
}

export default Spinner

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
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
} from '../../../../theme/ume-theme/variable.js'

class Fetch_reload extends Component {
    render() {
        const {
            i18n: {
                t,
            },
            style,
            onPress,
        } = this.props

        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...style,
            }}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{
                        color: COLOR_MAIN,
                        fontSize: N_12,
                    }}>{t.click_refresh}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
)(Fetch_reload)

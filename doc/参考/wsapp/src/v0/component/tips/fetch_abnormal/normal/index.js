import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'

import SRC_NO_NETWORK from '../../../../../../content/img/icon_fetch/no_network.png'

import {
    COLOR_MAIN,
    COLOR_GRAY,
    ZINDEX_FETCH_LOADING,
    SCREEN_WIDTH,
    N_5,
    N_10,
    N_12,
    N_14,
    N_16,
    N_20,
    N_25,
    N_40,
    N_100,
    OFFSET_HIDDEN,
} from '../../../../theme/ume-theme/variable.js'

class Fetch_abnormal extends Component {
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
                justifyContent: 'center',
                alignItems: 'center',
                ...style,
            }}>

                <Image
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={SRC_NO_NETWORK}/>

                <TouchableOpacity onPress={onPress} activeOpacity={.5}>
                    <View style={{
                        width: 150,
                        height: N_40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: N_40,
                        backgroundColor: COLOR_MAIN,
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: N_16,
                        }}>{t.click_refresh}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
)(Fetch_abnormal)

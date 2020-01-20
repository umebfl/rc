import React, {Component} from 'react'
import {View, Platform} from 'react-native'

import {
    STATUSBAR_FILLUP_HEIGHT,
    N_50,
} from '../../../theme/ume-theme/variable.js'

export default class Content extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: N_50 + STATUSBAR_FILLUP_HEIGHT,
                backgroundColor: 'white',
                ...this.props.style,
            }}>
                {this.props.children ? this.props.children : null}
            </View>
        )
    }
}

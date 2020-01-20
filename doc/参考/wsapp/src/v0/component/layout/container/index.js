import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    NetInfo,
    StatusBar,
} from 'react-native'

import {
    IOS_STATUSBAR_HEIGHT,
    N_50,
    ZINDEX_NETWORK_TIPS,
    SCREEN_WIDTH,
} from '../../../theme/ume-theme/variable.js'

// global.network_is_connected = true

class Container extends Component {

    constructor(prop) {
        super(prop)
        this.state= {
            net_conn: true,
        }
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().done(this.network_tips.bind(this))
        NetInfo.isConnected.addEventListener('change', this.network_tips.bind(this))
    }

    componentWillUnMount() {
        NetInfo.isConnected.removeEventListener('change', this.network_tips.bind(this))
    }

    network_tips(v) {
        // global.network_is_connected = v
        this.setState({
            ...this.state,
            net_conn: v,
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                ...this.props.style,
            }}>
                <StatusBar hidden={!this.state.net_conn}/>
                {
                    !this.state.net_conn
                        ? <View style={{
                            position: 'absolute',
                            width: SCREEN_WIDTH,
                            backgroundColor: 'rgba(255, 0, 0, .6)',
                            zIndex: ZINDEX_NETWORK_TIPS,
                            padding: 5,
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 10,
                            }}>{this.props.i18n.t.no_network_available_tips}</Text>
                        </View>
                        : null
                }
                {this.props.children ? this.props.children : null}
            </View>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
)(Container)

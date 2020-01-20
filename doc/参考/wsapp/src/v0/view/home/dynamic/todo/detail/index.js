import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    WebView,
} from 'react-native'


import conf from '../../../../../../../conf.js'
import Header_webview from '../../../../../component/webview/header_webview_url'

import {
    N_14,
} from '../../../../../theme/ume-theme/variable.js'

const ARROW_LEFT = require('../../../../../../../content/img/icon/arrow_left.png')

class Weibo extends Component {
    render() {
        const {
            i18n: {
                t,
            },
            navigation: {
                state: {
                    params: {
                        v: {
                            title,
                            url,
                            finish,
                        },
                        handle_goback,
                    },
                },
            },
        } = this.props

        return (
            <Header_webview
                header={{
                    icon_source: ARROW_LEFT,
                    handle_press: () => {
                        // 只有在未办才会刷新
                        if(finish === false) {
                            handle_goback()
                        }
                        this.props.navigation.goBack()
                    },
                    title,
                    title_style: {
                        fontSize: N_14,
                    }
                }}
                path={url}/>
        )
    }
}

export default connect(
    state => ({
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    // dispatch => ({
    //     action: bindActionCreators(reducer, dispatch),
    // })
)(Weibo)

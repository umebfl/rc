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
import Header_webview from '../../../../../component/webview/header_webview_html'

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
                            full_title,
                            url,
                            content,
                        },
                    },
                },
            },
        } = this.props

        return (
            <Header_webview
                path={url}
                insert_title={full_title}
                header={{
                    icon_source: ARROW_LEFT,
                    handle_press: () => this.props.navigation.goBack(),
                    title: t.notice,
                }}/>
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

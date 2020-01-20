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
import {Buffer} from 'buffer'

import {
    N_20,
} from '../../../../theme/ume-theme/variable.js'

import conf from '../../../../../../conf.js'
import Header_webview from '../../../../component/webview/header_webview_url'

const ARROW_LEFT = require('../../../../../../content/img/icon/arrow_left.png')

const OA_PATH = 'https://oa.wondershare.cn/wonderWeiboLogin.do'
const OA_PATH_JSP = '/third/pda/index.jsp'

class Weibo extends Component {
    render() {
        const {
            i18n: {
                t,
            },
            auth: {
                info: {
                    id,
                },
            },
            navigation,
        } = this.props

        return (
            <Header_webview
                header={{
                    title: 'OA',
                    icon_source: ARROW_LEFT,
                    handle_press: () => navigation.goBack(),
                    icon_style: {
                        width: N_20,
                        height: N_20,
                    },
                }}
                path={`${OA_PATH}?method=sso&user=${new Buffer(`wondershare${id}ekp`).toString('base64')}&url=${OA_PATH_JSP}`}/>
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

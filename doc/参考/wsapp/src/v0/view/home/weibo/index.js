import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CookieManager from 'react-native-cookies'

import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    WebView,
} from 'react-native'

import Container from '../../../component/layout/container'

import conf from '../../../../../conf.js'
import Header_webview from '../../../component/webview/header_webview_url'

const SRC_VIRTUAL = require('../../../../../content/img/weibo/back.png')

class Weibo extends Component {

    constructor(prop) {
        super(prop)

        CookieManager.clearAll()
        .then((res) => {
          console.log('CookieManager.clearAll =>', res);
        });
    }

    render() {
        const {
            i18n: {
                t,
            },
            info: {
                mail,
            },
            auth: {
                info: {
                    id,
                    pwd,
                    md5_base64_pwd,
                },
            },
            navigation,
        } = this.props
        console.log(`${conf.weibo.host}/m/loginhome?email=${mail}&password=${md5_base64_pwd}`)

        return (
            <Header_webview
                header={{
                    reload_icon_source: SRC_VIRTUAL,
                    title: t.tab_share,
                }}
                path={`${conf.weibo.host}/m/loginhome?email=${mail}&password=${md5_base64_pwd}`}/>
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

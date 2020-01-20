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
    Platform,
} from 'react-native'

import {
    N_30,
} from '../../../theme/ume-theme/variable.js'

import toast from '../../../component/toast/normal'
import Container from '../../../component/layout/container'
import Header from '../../../component/layout/header'
import Loading from '../../../component/loading/normal'
import Content from '../../../component/layout/content'
import Fetch_reload from '../../../component/tips/fetch_reload/normal'

import {
    _fetch,
} from '../../../lib/fetch'

class Header_webview extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            content: '',
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        const {
            path,
        } = this.props

        _fetch({
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,

            fetch_type: 'GET',
            path: path,
            success: rv => this.handle_success(rv),
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    handle_success(rv) {
        this.setState({
            ...this.state,
            content: rv.content,
        })
    }

    render() {
        const {
            insert_title,
            header: {
                icon_source,
                handle_press,
                title,
                icon_style,
                title_style,
            },
        } = this.props

        return (
            <Container>
                <Loading visiable={this.state._fetch_loading}/>

                <Header
                    left_option={{
                        source: icon_source,
                        icon_style,
                        handle_press,
                    }}
                    center_option={{
                        text: title,
                        text_style: title_style,
                    }}/>

                <Content>
                    {
                        this.state._fetch_error
                        ? <Fetch_reload onPress={this.init.bind(this)}/>
                        : <WebView
                            scalesPageToFit={true}
                            source={{html:  `
                                <html style='margin: ${Platform.OS === 'ios' ? '50px' : '10px'} ${Platform.OS === 'ios' ? '20px' : '5px'} !important;'>
                                    ${
                                        insert_title ? `<H1 style="padding: 14px ${Platform.OS === 'ios' ? '100px' : '40px'};text-align: center;font-size: ${Platform.OS === 'ios' ? '26px' : '16px'} !important;;">${insert_title}</H1>` : null
                                    }
                                    ${this.state.content}
                                </html>
                            `}}/>
                    }
                </Content>
            </Container>
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
)(Header_webview)

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

import {
    N_30,
} from '../../../theme/ume-theme/variable.js'

import toast from '../../../component/toast/normal'
import Container from '../../../component/layout/container'
import Header from '../../../component/layout/header'
import Content from '../../../component/layout/content'
import Loading from '../../../component/loading/normal'
import Fetch_reload from '../../../component/tips/fetch_reload/normal'

class Header_webview extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            loading: true,
        }
    }

    render() {
        const {
            path,
            i18n: {
                t,
            },
            header: {
                icon_source,
                reload_icon_source,
                handle_press,
                title,
                icon_style,
                title_style,
            },
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        source: icon_source,
                        icon_style,
                        handle_press,
                    }}
                    right_option={{
                        source: reload_icon_source,
                        icon_style,
                        handle_press: () => {
                            this.refs.WebView.goBack()
                        },
                    }}
                    center_option={{
                        text: title,
                        // text_style: title_style,
                    }}/>

                <Content>
                    <WebView
                        ref='WebView'
                        // injectedJavaScript='alert(JSON.stringify(document.cookie))'
                        onError={() => {
                            this.setState({
                                ...this.state,
                                loading: false,
                            })
                            // if(global.network_is_connected === false) {
                            //     toast(t.no_network_available_tips)
                            // } else {
                                toast(t.page_loading_failed)
                            // }
                        }}
                        renderError={() => (
                            <Fetch_reload onPress={this.refs.WebView.reload}/>
                        )}
                        onLoad={() => this.setState({
                            ...this.state,
                            loading: false,
                        })}
                        scalesPageToFit={true}
                        source={{uri: path}}/>
                </Content>

                <Loading visiable={this.state.loading}/>
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

import R from 'ramda'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Header from '../../../../component/layout/header'
import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import style from './style'
import ume_theme from '../../../../theme/ume-theme'
import conf from '../../../../../../conf.js'

import * as Jpush from '../../../../lib/jpush'

import {
    change_lang,
} from '../../../../reducer/i18n/reducer.js'
import {
    auth_signout,
} from '../../../../reducer/auth'

import DeviceInfo from 'react-native-device-info'

class Setting extends Component {
    constructor(props) {
        super(props)
    }

    handle_quit() {
        // 移除登录状态
        this.props.action.auth_signout()

        // 写入本地存储
        // this.props.action.auth_persist_state_update()

        // 跳转 TODO：清空历史栈
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'login' })
            ],
        })
        this.props.navigation.dispatch(resetAction)

        // 清空全局登录状态
        global.logined = false

        // this.props.navigation.navigate('login')
        Jpush.destory()
    }

    handle_language_switch() {
        this.props.action.change_lang()
    }

    render() {
        const {
            i18n: {
                t,
            },
            navigation,
        } = this.props

        return (

            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.my_setting,
                    }} />

                <Content style={{ backgroundColor: '#f5f5f5', }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('home_me_setting_feedback')} activeOpacity={0.5}>
                                <View style={style.content_item}>
                                    <Text style={style.content_text_left}>
                                        {t.suggested_feedback}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={style.content_item}>
                                <Text style={style.content_text_left}>
                                    {t.app_update}
                                </Text>
                                <Text style={style.content_text_right}>
                                    {t.version_num}: {conf.version}
                                </Text>
                            </View>

                            {
                                // <TouchableOpacity style={style.touchable_opacity} onPress={this.update_check} activeOpacity={0.5}>
                                //     <View style={style.content_item}>
                                //         <Text style={style.content_text_left}>
                                //             {t.app_update}
                                //         </Text>
                                //         <Text style={style.content_text_right}>
                                //             {t.version_num}: {conf.version}
                                //         </Text>
                                //     </View>
                                // </TouchableOpacity>
                            }

                            {
                                <TouchableOpacity style={style.touchable_opacity} onPress={this.handle_language_switch.bind(this)} activeOpacity={0.5}>
                                    <View style={style.content_item_btm}>
                                        <Text style={style.content_text_left}>
                                            {t.language_switch}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={[style.content_item_container, style.content_item_container_isolated]}>
                            <TouchableOpacity style={style.touchable_opacity} onPress={this.handle_quit.bind(this)} activeOpacity={0.5}>
                                <View style={style.content_item_out}>
                                    <Text style={style.content_item_left}>
                                        {t.sign_out}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </Content>
            </Container>
        )
    }
}


export default connect(
    state => ({
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            auth_signout,
            change_lang,
        }, dispatch),
    })
)(Setting)

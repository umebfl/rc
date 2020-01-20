/*

TODO:
* 登录提交 - 非空校验及提示 / 特殊字符校验
* 异常提示
* 输入框文本靠底
* 文本框焦点|样式
* 左滑动不可回退
* 细节优化
* 多语言选择
* 多语言支持

FINISH:
* icon图标引入, 样式封装
* 密码控件封装


*/
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import md5 from 'react-native-md5'
import {
    NavigationActions,
} from 'react-navigation'
import * as Jpush from '../../lib/jpush'
import InputScrollView from 'react-native-inputscrollview'

import Container from '../../component/layout/container'
import Input from '../../component/form/input/normal'
import Button from '../../component/form/button/loading'
import Input_pwd from '../../component/form/input/pwd'
import toast from '../../component/toast/normal'

import { INPUT_MAX_LEN } from '../../theme/ume-theme/variable.js'
import style from './style.js'

import * as reducer from './reducer.js'

import {
    user_info_init,
} from '../../reducer/user/info/index.js'
import {
    user_role_init,
} from '../../reducer/user/role/index.js'
import {
    auth_set_id_pwd,
    auth_set_authed,
} from '../../reducer/auth/index.js'
import { change_lang } from '../../reducer/i18n/reducer.js'

import {
    _fetch,
} from '../../lib/fetch'

import {
    is_empty,
} from '../../lib/form/validator'

import JPushModule from 'jpush-react-native'

const AUTH_PATH = '/users/authentication'

class Login extends Component {

    constructor(prop) {
        super(prop)
        // 跳转判定
        // if(prop.auth.id !== null && prop.auth.pwd !== null) {
        //     prop.navigation.navigate('home')
        // }
        this.state = {}
        this.login_flag = false

        Jpush.init()
    }

    // componentWillUnmount() {
    //     Jpush.destory()
    // }

    handle_check() {
        let {
            auth: {
                info: {
                    id,
            pwd,
                },
            },
            i18n: {
                t: {
                    user,
                password,
                cannot_empty,
                },
            },
        } = this.props

        // 名称校验
        // 密码校验

        // 非空校验
        if (is_empty(id)) {
            toast(`${user}${cannot_empty}`)
            return false
        }

        if (is_empty(pwd)) {
            toast(`${password}${cannot_empty}`)
            return false
        }

        return true
    }

    handle_login() {

        if (!this.handle_check()) {
            return
        }

        let {
            auth: {
                info: {
                    id,
            md5_pwd,
            token,
                },
            },
        } = this.props

        // 设置谷歌分析用户ID
        global.constants.tracker.setUser(id)

        if (this.login_flag) {
            return
        } else {
            this.login_flag = true
        }

        _fetch({
            fetch_type: 'POST',
            path: AUTH_PATH,
            param: {
                wsId: id,
                password: md5_pwd,
            },
            token: token,
            lang: this.props.i18n.lang,
            success: rv => {
                global.logined = true

                // 设置认证通过
                this.props.action.auth_set_authed(true)

                // 保存用户信息
                this.props.action.user_info_init(rv)

                // 设置角色
                this.props.action.user_role_init(rv)

                // 跳转
                // this.props.navigation.navigate('home')
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'home' })
                    ],
                })
                this.props.navigation.dispatch(resetAction)

                // 标记处理
                this.login_flag = false

                //设置JPUSH数据
                Jpush.setting(rv.wsId, rv.empGrade)

                Jpush.listener()
            },
            error_flow: () => {
                // 标记处理
                this.login_flag = false
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    render() {
        let {
            auth: {
                info: {
                    id,
            pwd,
                },
            },
            i18n: {
                lang,
                t,
            },
            login: {
                check: {
                    checked,
                },
                error,
            },
            action: {
                auth_set_id_pwd,
                handle_error_msg,
                change_lang,
            },
            navigation: {
                navigate,
            },
        } = this.props

        return (
            <Container>
                <InputScrollView style={style.content}>
                    <Text style={style.title}>
                        wondershare
                    </Text>

                    <Input
                        option={{
                            input: {
                                defaultValue: id,
                                selectionColor: '#BBBBBB',
                                maxLength: INPUT_MAX_LEN,
                                autoFocus: true,
                                placeholder: t.enter_id,
                                value: id,
                                onChangeText: id => auth_set_id_pwd({ id }),
                            },
                        }} />

                    <Input_pwd
                        option={{
                            input: {
                                selectionColor: '#BBBBBB',
                                maxLength: INPUT_MAX_LEN,
                                placeholder: t.enter_pwd,
                                value: pwd,
                                onChangeText: pwd => auth_set_id_pwd({ pwd }),
                            },
                        }} />

                    <Text style={style.text}>
                        {error.msg}
                    </Text>

                    <Button
                        loading={this.state._fetch_loading}
                        handle_press={this.handle_login.bind(this)}
                        text={t.login} />

                    {
                        // <Fetch
                        // log={this.props.action.log}
                        // type='button'
                        // button_text={t.login}
                        // option={{
                        //     text: {
                        //         value: t.login,
                        //     },
                        // }}
                        // param={{
                        //     wsId: id,
                        //     password: pwd,
                        // }}
                        // path={AUTH_PATH}
                        // fetch_type='POST'
                        // // handle_check={this.handle_check.bind(this)}
                        // handle_error_msg={handle_error_msg.bind(this)}
                        // handle_success={this.handle_success.bind(this)}/>
                    }

                    <View style={{
                        height: 30,
                    }}>
                        {
                            lang === 'en'
                                ? <Text onPress={() => change_lang()} style={style.listItem_left_text}>Switch to chinese</Text>
                                : <Text onPress={() => change_lang()} style={style.listItem_left_text}>切换英文</Text>
                        }
                    </View>
                </InputScrollView>
            </Container>
        )
    }
}

export default connect(
    state => {
        return ({
            login: state.Login,
            auth: state.Auth,
            i18n: state.I18n,
        })
    },
    dispatch => ({
        action: bindActionCreators({
            ...reducer,
            auth_set_id_pwd,
            auth_set_authed,
            user_role_init,
            user_info_init,
            change_lang,
        }, dispatch),
    })
)(Login)

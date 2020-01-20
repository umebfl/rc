import React, { Component } from 'react'
import {
    Platform,
    Text,
    View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    NavigationActions,
    addNavigationHelpers,
} from 'react-navigation'

import {
    auth_set_sync,
    auth_set_info,
    auth_set_authed,
} from './v0/reducer/auth'

import Container from './v0/component/layout/container'
import * as Jpush from './v0/lib/jpush'

import {
    get_list,
} from './v0/lib/persist'
import {
    DIARY_FILTER,
    AUTH_ID,
    AUTH_TOKEN,
    AUTH_MD5_BASE64_PWD,
    AUTH_MD5_PWD,
    AUTH_LOGINED,
    USER_ROLE,
    USER_INFO,
    SETTING_LANG,
    SHOW_DUTY,
} from './v0/lib/persist/constant'

import {
    home_diary_staff_restore,
} from './v0/view/home/diary/staff/reducer.js'
import {
    user_role_restore,
} from './v0/reducer/user/role'
import {
    user_info_restore,
} from './v0/reducer/user/info'
import {
    init_lang,
} from './v0/reducer/i18n/reducer.js'
import {
    init_show_duty,
} from './v0/view/home/diary/diary_tab/reducer.js'

// TODO: 加载页
class Loader extends Component {

    constructor(prop) {
        super(prop)

        const login_flow = () => {
            global.logined = false
            // prop.navigation.navigate('login')
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'login' })
                ],
            })
            prop.navigation.dispatch(resetAction)
        }

        get_list([
            AUTH_ID,
            AUTH_MD5_PWD,
            AUTH_MD5_BASE64_PWD,
            AUTH_TOKEN,
            AUTH_LOGINED,
            USER_ROLE,
            USER_INFO,
            SETTING_LANG,
            DIARY_FILTER,
            SHOW_DUTY,
        ], rv => {

            if (rv && rv[4][1] === 'true') {
                global.logined = true

                const info = JSON.parse(rv[6][1])

                prop.action.init_lang(rv[7][1])

                prop.action.auth_set_info({
                    id: rv[0][1],
                    md5_pwd: rv[1][1],
                    md5_base64_pwd: rv[2][1],
                    token: rv[3][1],
                })
                prop.action.auth_set_authed(JSON.parse(rv[4][1]))
                prop.action.user_role_restore(JSON.parse(rv[5][1]))
                prop.action.user_info_restore(info)
                prop.action.auth_set_sync(true)

                if(rv[8][1] !== null) {
                    prop.action.home_diary_staff_restore(JSON.parse(rv[8][1]))
                }

                prop.action.init_show_duty(rv[9][1])

                // 设置谷歌分析用户ID
                global.constants.tracker.setUser(rv[0][1])

                if (global.init_uri === null || global.init_uri === 'home' || global.init_uri === 'home_drawer' || global.init_uri === 'login') {

                    // prop.navigation.navigate('home')
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'home' })
                        ],
                    })
                    prop.navigation.dispatch(resetAction)
                }

                Jpush.setting(rv[0][1], info.empGrade)
                Jpush.listener()
            } else {
                login_flow()
            }

        }, () => {
            login_flow()
        })
    }

    componentWillUnmount() {
        // Jpush.destory()
    }

    render() {
        const {
            i18n: {
                t,
            },
        } = this.props

        return (
            <Container style={{
                backgroundColor: 'white',
            }}>
            </Container>
        )
    }
}

// <TouchableOpacity onPress={() => this.closeControlPanel()}>
//     <Text style={{
//         marginTop: 20,
//         color: 'white',
//     }}>Drawer</Text>
// </TouchableOpacity>

// <View style={{
//     flex: 1,
// }}>
//     <TouchableOpacity onPress={() => this.openControlPanel()}>
//         <Text style={{
//             marginTop: 20,
//         }}>内容</Text>
//     </TouchableOpacity>
// </View>

export default connect(
    state => ({
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_diary_staff_restore,
            auth_set_sync,
            auth_set_info,
            user_role_restore,
            user_info_restore,
            auth_set_authed,
            init_lang,
            init_show_duty,
        }, dispatch),
    })
)(Loader)

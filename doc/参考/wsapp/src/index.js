/*

TODO:
* 集成持久化
* 集成eslint
* 集成测试
* log实现: FETCH 异常/埋点后台传输, 真机弹窗输出
* 样式及部件封装

* 集成codepush
* 集成及优化定位
* 浏览器邮件调用wsapp

FINISH:
* log实现: 调试跟踪 - redux-logger

*/
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import codePush from "react-native-code-push"
import {
    Platform,
} from 'react-native'
import {
    NavigationActions,
} from 'react-navigation'

import configureStore from './store'
import Router from './router'

import {
    build_timeout_fetch,
} from './v0/lib/fetch'

import {
    clear,
    get_all,
} from './v0/lib/persist'

import {
    GoogleAnalyticsTracker,
} from 'react-native-google-analytics-bridge'

const tracker = new GoogleAnalyticsTracker('UA-98726651-1')

global.constants = {
    tracker: new GoogleAnalyticsTracker('UA-98726651-1')
}

global.init_uri = null

const uri_prefix = Platform.OS == 'android' ? 'wsapp://app/' : 'wsapp://'

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
}

// 创建带超时的fetch
// build_timeout_fetch()

// TODO 临时清理
// clear()


// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName
}

class wsapp extends Component {
    constructor() {
        super()
        this.state = {
            store: configureStore(),
        }
        // this.onInitPress.bind(this);
    }

    // onInitPress() {
    //     JPushModule.initPush();
    // }

    // componentWillUnmount() {
    //     JPushModule.removeReceiveCustomMsgListener(receiveCustomMsgEvent);
    //     JPushModule.removeReceiveNotificationListener(receiveNotificationEvent);
    //     JPushModule.removeReceiveOpenNotificationListener(openNotificationEvent);
    //     JPushModule.removeGetRegistrationIdListener(getRegistrationIdEvent);
    //     console.log("Will clear all notifications");
    //     JPushModule.clearAllNotifications();
    // }

    //codepush
    componentDidMount() {
        // JPushModule.notifyJSDidLoad((resultCode) => {
        //     if (resultCode === 0) {
        //     }
        // });
        // JPushModule.addReceiveCustomMsgListener((map) => {
        //     this.setState({
        //         pushMsg: map.message
        //     });
        //     console.log("extras: " + map.extras);
        // });
        // JPushModule.addReceiveNotificationListener((map) => {
        //     console.log("alertContent: " + map.alertContent);
        //     console.log("extras: " + map.extras);
        //     // var extra = JSON.parse(map.extras);
        //     // console.log(extra.key + ": " + extra.value);
        // });
        // JPushModule.addReceiveOpenNotificationListener((map) => {
        //     console.log("Opening notification!");
        //     console.log("map.extra: " + map.extras);
        //     JPushModule.jumpToPushActivity("SecondActivity");
        // });

        codePush.checkForUpdate().then((update) => {
            if (update) {
                // alert(update.isMandatory)
                // alert("update.isMandatory=" + update.isMandatory)
                if (update.isMandatory) {
                    codePush.sync()
                } else {
                    // alert("codePush.sync")
                    codePush.sync({
                        updateDialog: {
                            appendReleaseDescription: true,
                            descriptionPrefix: '\n\n更新内容：\n',
                            title: '更新',

                            //非强制更新处理
                            optionalUpdateMessage: '发现新版本，是否现在更新？',
                            optionalIgnoreButtonLabel: '跳过',
                            optionalInstallButtonLabel: '后台更新',
                        },
                        installMode: codePush.InstallMode.IMMEDIATE
                    })
                }
            }
        })
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <Router uriPrefix={uri_prefix}
                    ref={nav => { this.navigator = nav }}
                    onNavigationStateChange={(prevState, currentState) => {
                        // 进入指定节点
                        const currentScreen = getCurrentRouteName(currentState)
                        // 进入源节点
                        const prevScreen = getCurrentRouteName(prevState)

                        if (prevScreen !== currentScreen) {
                            // 谷歌统计
                            global.constants.tracker.trackScreenView(currentScreen)

                            // 第一次进入，并且不是登录页和首页的，都为deep link跳转
                            if (global.init_uri === null && prevScreen === 'loader' && (currentScreen !== 'login' || currentScreen !== 'home' || currentScreen !== 'home_drawer')) {
                                global.init_uri = currentScreen
                            }

                            // 全部跳到loader的页面，都回到home页
                            if (currentScreen === 'loader') {
                                this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName: 'home_drawer' })
                            }

                            // 登录状态为false的并且不是登录页的，都回到登录页
                            if (global.logined === false && currentScreen !== 'login') {
                                this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName: 'login' })
                            }
                        }
                    }}
                />
            </Provider>
        )
    }
}

// export default wsapp
export default codePush(codePushOptions)(wsapp)

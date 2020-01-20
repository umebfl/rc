import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {View, Text, Platform, Button} from 'react-native'
import {TabNavigator} from 'react-navigation'

import Todo from './todo'
import Billboard from './billboard'
import Notice from './notice'

import {
    BORDER_WIDTH,
    BORDER_SHADOW_COLOR,
    HEADER_HEIGHT,
    HEADER_BACKGROUND_COLOR,
    HEADER_TEXT_COLOR,
    HEADER_TEXT_ACTIVE_COLOR,
    HEADER_ICON_TOUCH_WIDTH,
    STATUSBAR_FILLUP_HEIGHT,
    N_14,
} from '../../../theme/ume-theme/variable.js'

const dynamic_navigator = TabNavigator({
    todo: {
        screen: Todo,
        navigationOptions: {
            tabBarLabel: '待办',
        },
    },
    notice: {
        screen: Notice,
        navigationOptions: {
            tabBarLabel: '通知',
        },
    },
    billboard: {
        screen: Billboard,
        navigationOptions: {
            tabBarLabel: '榜单',
        },
    },
}, {
    // 标签栏的位置可以是'top', 'bottom'
    tabBarPosition: 'top',
    // 是否允许在标签之间进行滑动
    swipeEnabled: true,
    // 启动tab切换动画
    animationEnabled: false,
    // 懒加载
    lazy: false,

    // 标签栏配置
    tabBarOptions: {
        // 启用图标
        showIcon: false,
        activeTintColor: HEADER_TEXT_ACTIVE_COLOR,
        inactiveTintColor: HEADER_TEXT_COLOR,
        // 安卓 - 底部滑动线条样式
        indicatorStyle: {
            height: 0,
        },
        // 标签栏样式
        style: {
            height: HEADER_HEIGHT,
            paddingTop: STATUSBAR_FILLUP_HEIGHT,
            paddingLeft: HEADER_ICON_TOUCH_WIDTH * 1.5,
            paddingRight: HEADER_ICON_TOUCH_WIDTH * 1.5,

            borderBottomWidth: BORDER_WIDTH,
            borderBottomColor: BORDER_SHADOW_COLOR,

            backgroundColor: HEADER_BACKGROUND_COLOR,
            // backgroundColor: 'red',
            // alignItems: 'center',

            // 安卓 - 移除阴影
            elevation: 0,
        },
        // 文本样式
        labelStyle: {
            fontSize: N_14,
            // color: HEADER_TEXT_COLOR,
        },
    },
})

export default dynamic_navigator

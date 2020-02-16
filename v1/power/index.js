import React, { Component } from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native'

import {
    Card,
    WhiteSpace,
    Icon,
    Grid,
    Steps,
    List,
    Tag,
    Modal,
    Button,
    Provider,
    TextareaItem,
    Drawer,
    Toast,
} from '@ant-design/react-native'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

import Theme from '../theme'

import {
    V_交易提示列表,
    V_持仓列表,
    V_底部功能块,
} from './组件'

import V_星空背景面板 from './通用组件/V_星空背景面板'

class Module extends Component {

    render() {

        const {
            data,
        } = this.props

        return (
            <V_星空背景面板>
                <ScrollView style={{flex: 1, }}>
                    <V_交易提示列表/>
                    <V_持仓列表/>
                </ScrollView>
                <V_底部功能块 {...this.props}/>
            </V_星空背景面板>
        )
    }
}

export default connect(
    state => ({
        data: state.data,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Module)

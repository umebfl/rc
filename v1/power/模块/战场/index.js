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

// import {
//     action,
// } from './reducer'

import Theme from '../../../theme'

import V_星空背景面板 from '../../通用组件/V_星空背景面板'

import {
    V_目标筛选,
} from './组件'

class Module extends Component {

    render() {

        const {
            data,
        } = this.props

        return (
            <V_星空背景面板>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 4,}}>
                    <V_目标筛选 {...this.props}/>
                </View>
            </V_星空背景面板>
        )
    }
}

export default connect(
    state => ({
        data: state.data,
    }),
    // dispatch => ({
    //     action: bindActionCreators(action, dispatch),
    // })
)(Module)

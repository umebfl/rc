import React, { Component } from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
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

class Module extends Component {

    render() {

        const {
            data,
        } = this.props

        return (
            <SafeAreaView>

            </SafeAreaView>
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

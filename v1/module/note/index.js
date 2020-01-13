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

    componentDidMount() {
        this.timer_interval = setInterval(this.props.action.test, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timer_interval)
    }

    render() {

        const {
            note,
        } = this.props

        return (
            <SafeAreaView>
                <Text>{JSON.stringify(note)}</Text>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        note: state.note,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Module)

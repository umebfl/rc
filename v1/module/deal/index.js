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
    WhiteSpace,
    WingBlank,
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

import Theme from '../../theme'

const Item = List.Item
const Brief = List.Item.Brief

const Head = () => (
    <View style={{
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme['primary-color'],
    }}>
        <Text style={{
            color: 'white',
            fontSize: 18,
        }}>交易</Text>
    </View>
)

class Module extends Component {

    // componentDidMount() {
    //     this.timer_interval = setInterval(this.props.action.test, 1000)
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.timer_interval)
    // }

    render() {

        const {
            setting,
            breed,
            navigation,
        } = this.props

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>

                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                    <Head/>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        setting: state.setting,
        breed: state.breed,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Module)

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
  Dimensions,
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
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors'

import Theme from '../../../../theme'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

export default class Module extends Component {

    // componentDidMount() {
    //     this.timer_interval = setInterval(this.props.action.test, 1000)
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.timer_interval)
    // }

    render() {

        const {

        } = this.props

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>

                <ScrollableTabView
                    prerenderingSiblingsNumber={2}
                    style={{ marginTop: 0, backgroundColor: 'white', }}
                    initialPage={1}
                    // page={2}
                    renderTabBar={() => <DefaultTabBar />}>

                    <Text tabLabel='Tab #1'>My</Text>
                    <Text tabLabel='Tab #2'>favorite</Text>
                    <Text tabLabel='Tab #3'>project</Text>
                </ScrollableTabView>

            </SafeAreaView>
        )
    }
}

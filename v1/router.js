import React, {Component} from 'react'
import {connect} from 'react-redux'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

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
    Icon,
} from '@ant-design/react-native'

import Power from './power'
import Power_战场 from './power/模块/战场'

// import Home from './module/home'
// import Breed from './module/setting/breed'
// import Analy from './module/data/analy'
// import Analy_rule1 from './module/data/analy/rule1'
// import Analy_nday_data from './module/data/analy/nday_data'
// import Statistics_shake_quotation from './module/data/analy/statistics_shake_quotation'
//
// import Experiment_test_react_native_chart_kit from './module/experiment/test/react-native-chart-kit'
// import Experiment_test_react_native_scrollable_tab_view from './module/experiment/test/react-native-scrollable-tab-view'

import Theme from './theme'

export const get_nav_opt = (title) => ({
    title,
    headerStyle: {backgroundColor: Theme['primary-color'],},
    headerTitleStyle: {color: 'white', fontSize: 18, fontWeight: 'normal',},
    headerBackTitle: ' ',
    headerTintColor: 'white',
    headerBackImage: () => <Icon name='left' size='md' color={'white'} style={{marginLeft: 10, fontSize: 28, width: 28, height: 28,}}/>,
})

const AppNavigator = createStackNavigator({

    Power: {
        screen: Power,
        navigationOptions: () => ({
            header: null,
        }),
    },

    Power_战场: {
        screen: Power_战场,
        navigationOptions: () => ({
            header: null,
        }),
        // navigationOptions: get_nav_opt('SVG图表'),
    },

    // home: {
    //     screen: Home,
    //     navigationOptions: () => ({
    //         header: null,
    //     }),
    // },
    // breed: {
    //     screen: Breed,
    //     navigationOptions: get_nav_opt('交易品种'),
    // },
    //
    // experiment_test_react_native_chart_kit: {
    //     screen: Experiment_test_react_native_chart_kit,
    //     navigationOptions: get_nav_opt('SVG图表'),
    // },
    // experiment_test_react_native_scrollable_tab_view: {
    //     screen: Experiment_test_react_native_scrollable_tab_view,
    //     navigationOptions: get_nav_opt('tab滑动'),
    // },
    //
    // analy: {
    //     screen: Analy,
    //     // navigationOptions: get_nav_opt('品种分析'),
    //     // navigationOptions: ({ navigation }) => ({
    //     //     title: `${navigation.state.params.k}'s Profile'`,
    //     // })
    // },
    // analy_rule1: {
    //     screen: Analy_rule1,
    //     // navigationOptions: get_nav_opt('AI - 规则1'),
    // },
    // analy_nday_data: {
    //     screen: Analy_nday_data,
    //     // navigationOptions: get_nav_opt('AI - 规则1'),
    // },
    //
    // statistics_shake_quotation: {
    //     screen: Statistics_shake_quotation,
    //     // navigationOptions: get_nav_opt('AI - 规则1'),
    // },

}, {
    initialRouteName: 'Power',
    shifting: false,
    labeled: true,
    activeColor: Theme['primary-color'],
    inactiveColor: '#AAA',
    barStyle: { backgroundColor: '#FFF' },
})

export default createAppContainer(AppNavigator)

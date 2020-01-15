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

import Home from './module/home'
import Breed from './module/RC/breed'
import Analy from './module/data/analy'

import Experiment_test_react_native_chart_kit from './module/experiment/test/react-native-chart-kit'

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
    home: {
        screen: Home,
        navigationOptions: () => ({
            header: null,
        }),
    },
    breed: {
        screen: Breed,
        navigationOptions: get_nav_opt('交易品种'),
    },

    experiment_test_react_native_chart_kit: {
        screen: Experiment_test_react_native_chart_kit,
        navigationOptions: get_nav_opt('SVG图表'),
    },

    analy: {
        screen: Analy,
        // navigationOptions: get_nav_opt('品种分析'),
    },
}, {
    initialRouteName: 'home',
    shifting: false,
    labeled: true,
    activeColor: Theme['primary-color'],
    inactiveColor: '#AAA',
    barStyle: { backgroundColor: '#FFF' },
})

export default createAppContainer(AppNavigator)

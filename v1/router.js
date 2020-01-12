import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import {
    Icon,
} from '@ant-design/react-native'

import Home from './module/home'
import Test from './module/test'

// const AppNavigator = createStackNavigator({
//     Home: {
//         screen: Home,
//     },
//     Test: Test,
// }, {
//     initialRouteName: 'Home',
//     headerMode: 'none',
// })

const AppNavigator = createMaterialBottomTabNavigator(
  {
      Home: {
          screen: Home,
          navigationOptions: {
              title: '首页',
              tabBarColor: '#4312AE',
              tabBarIcon: (focused, horizontal, tintColor) => <Icon name='bank' size='md' color={tintColor}/>,
          },
      },
      Test1: {
          screen: Test,
          navigationOptions: {
              title: '交易',
              tabBarColor: '#472B83',
              tabBarIcon: (focused, horizontal, tintColor) => <Icon name='project' size='md' color={tintColor}/>,
          },
      },
      Test2: {
          screen: Test,
          navigationOptions: {
              title: '理念',
              tabBarColor: '#280671',
              tabBarIcon: (focused, horizontal, tintColor) => <Icon name='star' size='md' color={tintColor}/>,
          },
      },
      Test3: {
          screen: Test,
          navigationOptions: {
              title: '测试',
              tabBarColor: '#472B83',
              tabBarIcon: (focused, horizontal, tintColor) => <Icon name='fire' size='md' color={tintColor}/>,
          },
      },
      Test4: {
          screen: Test,
          navigationOptions: {
              title: '测试',
              tabBarColor: '#4312AE',
              tabBarIcon: (focused, horizontal, tintColor) => <Icon name='experiment' size='md' color={tintColor}/>,
          },
      },
  },
  {
    initialRouteName: 'Home',
    shifting: true,
    labeled: true,
    activeColor: 'white',
    barStyle: { backgroundColor: '#FFF' },
  }
)

export default createAppContainer(AppNavigator)

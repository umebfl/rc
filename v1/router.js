import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import {
    Icon,
} from '@ant-design/react-native'

import Theme from './theme'

import Data from './module/data'
import Deal from './module/deal'
import Experiment from './module/experiment'
import Note from './module/note'
import RC from './module/RC'

const AppNavigator = createMaterialBottomTabNavigator(
  {
      Data: {
          screen: Data,
          navigationOptions: {
              title: '数据',
              tabBarIcon: ({focused, horizontal, tintColor}) => <Icon name='bar-chart' size='md' color={focused ? Theme['primary-color'] : tintColor}/>,
          },
      },
      Deal: {
          screen: Deal,
          navigationOptions: {
              title: '交易',
              tabBarIcon: ({focused, horizontal, tintColor}) => <Icon name='property-safety' size='md' color={focused ? Theme['primary-color'] : tintColor}/>,
          },
      },
      RC: {
          screen: RC,
          navigationOptions: {
              title: 'RC',
              tabBarIcon: ({focused, horizontal, tintColor}) => <Icon name='star' size='md' color={focused ? Theme['primary-color'] : tintColor}/>,
          },
      },
      Note: {
          screen: Note,
          navigationOptions: {
              title: '记录',
              tabBarIcon: ({focused, horizontal, tintColor}) => <Icon name='read' size='md' color={focused ? Theme['primary-color'] : tintColor}/>,
          },
      },
      Experiment: {
          screen: Experiment,
          navigationOptions: {
              title: '开放',
              tabBarIcon: ({focused, horizontal, tintColor}) => <Icon name='experiment' size='md' color={focused ? Theme['primary-color'] : tintColor}/>,
          },
      },
  },
  {
    initialRouteName: 'RC',
    shifting: false,
    labeled: true,
    activeColor: Theme['primary-color'],
    inactiveColor: '#AAA',
    barStyle: { backgroundColor: '#FFF' },
  }
)

export default createAppContainer(AppNavigator)

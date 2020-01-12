import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, View} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './module/home'
import Test from './module/test'

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
    },
    Test: Test,
}, {
    initialRouteName: 'Home',
    headerMode: 'none',
})

export default createAppContainer(AppNavigator)

import React, {Component} from 'react'
import {DrawerNavigator} from 'react-navigation'

import {Text, TouchableOpacity, View} from 'react-native'

import Home from './index.js'
import Home_drawer from './diary/staff/drawer'

export const DRAWER_WIDTH = 300

export default DrawerNavigator(
    {
        home_drawer: {
            screen: Home,
            navigationOptions: {
                drawerLockMode: 'locked-closed',
            },
        },
    },
    {
        drawerWidth: DRAWER_WIDTH,
        drawerPosition: 'right',
        initialRouteName: 'home_drawer',
        contentComponent: props => {
            return <Home_drawer navigation={props.navigation}/>
        },
    }
)

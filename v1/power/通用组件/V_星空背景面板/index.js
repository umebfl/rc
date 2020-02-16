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
  ImageBackground,
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

export default payload => (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar hidden={true}/>
        <ImageBackground style={{flex: 1}} source={require('../../../../resource/pic/1.jpg')}>
            {payload.children}
        </ImageBackground>
    </SafeAreaView>
)

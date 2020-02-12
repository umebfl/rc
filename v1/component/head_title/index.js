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

import Theme from '../../theme'

const HeadTitle = payload => (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 15, paddingBottom: 0, paddingLeft: 5,}}>
        <Text style={{color: Theme['title-color'], fontSize: 18, fontWeight: 'bold', }}>{payload.title}</Text>
        <Icon style={{
            marginRight: 10,
            fontSize: 22,
            color: Theme['void-color'],
        }} name='right' color={Theme['primary-color']}/>
    </View>
)

export default HeadTitle

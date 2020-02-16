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

import T from '../../../theme'

import U1_目标筛选 from '../../技能/_2嗜血渴望/U1_目标筛选'

export const V_目标筛选 = payload => (
    <TouchableOpacity activeOpacity={0.5} onPress={U1_目标筛选}>
        <Icon style={{
            // marginLeft: -25,
            padding: 4,
            fontSize: 40,
            color: T.D_颜色_白_L,
        }} name='transaction' color={T['primary-color']}/>
    </TouchableOpacity>
)

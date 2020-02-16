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

import T from '../theme'

const V_白色文本 = ({style, v}) => <Text style={{color: T.D_颜色_白, paddingRight: 4, fontSize: 16, ...style}}>{v}</Text>
const V_标题 = ({v}) => <View style={{}}><V_白色文本 style={{fontSize: 18, }} v={v}/></View>

export const V_交易提示列表 = () => (
    <View style={{padding: 10, flexDirection: 'column', justifyContent: 'space-between', }}>
        <View>
            <V_标题 v={'交易提示:'}/>
            <View style={{flexDirection: 'row', }}>
                <V_白色文本 v={'1.'}/>
                <V_白色文本 v={'焦炭 J2005'}/>
                <V_白色文本 v={'买开 2手'}/>
                <V_白色文本 v={'1881'}/>
                <V_白色文本 v={'2020-02-16'}/>
            </View>
        </View>
    </View>
)

export const V_持仓列表 = () => (
    <View style={{padding: 10, flexDirection: 'column', justifyContent: 'space-between', }}>
        <View>
            <V_标题 v={'持仓:'}/>
            <View style={{flexDirection: 'row', }}>
                <V_白色文本 v={'1.'}/>
                <V_白色文本 v={'焦炭 J2005'}/>
                <V_白色文本 v={'买开 2手'}/>
                <V_白色文本 v={'1881'}/>
                <V_白色文本 v={'2020-02-16'}/>
                <V_白色文本 v={'20043'}/>
            </View>
        </View>
    </View>
)

export const V_底部功能块 = payload => (
    <View style={{
        borderTopColor: T.D_颜色_白_L,
        // borderTopWidth: 0.3,
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'center',}}>

        <TouchableOpacity activeOpacity={0.5} onPress={() => payload.navigation.navigate('Power_战场')}>
            <Icon style={{
                marginLeft: -25,
                fontSize: 50,
                color: T.D_颜色_白_L,
            }} name='fire' color={T['primary-color']}/>
        </TouchableOpacity>
    </View>
)

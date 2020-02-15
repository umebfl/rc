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
  Dimensions,
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

import {
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors'

import Theme from '../../theme'
import {to_rate} from '../../lib/num'

const Comp = payload => {

    const {
        x,
        y,
        color = [blue[4], green[4], yellow[4], red[4], purple[4], lime[4]],
    } = payload

    const len = R.sum(y)
    const width = Dimensions.get('window').width - 30

    return (
        <View style={{paddingLeft: 10, }}>
            <View style={{flexDirection: 'row', marginTop: 4, width: width, height: 8, borderRadius: 100,}}>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <View style={{width: width * (v / len), height: 8, backgroundColor: color[k], }}></View>
                        )
                    )(y)
                }
            </View>
            <View style={{flexDirection: 'row', marginTop: 4, justifyContent: 'space-around',}}>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <View style={{flexDirection: 'row', alignItems: 'baseline', }}>
                                <View style={{width: 10, height: 10, marginRight: 2, backgroundColor: color[k],}}></View>
                                <Text style={{fontSize: 12, color: Theme['text-color-secondary'], marginRight: 2, }}>{x[k]}:</Text>
                                <Text style={{color: Theme['title-color'], }}>{to_rate(len, v, 0)}%</Text>
                            </View>
                        )
                    )(y)
                }
            </View>
        </View>
    )
}

export default Comp

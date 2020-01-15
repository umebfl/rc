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

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

import Theme from '../../../theme'

const Item = List.Item
const Brief = List.Item.Brief

class Module extends Component {

    render() {

        const {
            breed: {
                data,
            },
            action: {
                set_disable,
            },
        } = this.props

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>
                <ScrollView style={{flex: 1, backgroundColor: 'white', }}>
                    <List>
                        {
                            R.addIndex(R.map)(
                                (v, k) => (
                                    <Item
                                        key={k}
                                        onPress={() => {
                                            Modal.alert('确认', v.disable ? `启用${v.name}?` : `禁用${v.name}?`, [
                                                {
                                                    text: '取消',
                                                    onPress: () => {},
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: '确认',
                                                    onPress: () => {
                                                        set_disable(k, !v.disable)
                                                    },
                                                },
                                            ])
                                        }}
                                        extra={v.disable ? null : <Icon name='check' size='md' color={Theme['primary-color']}/>}>
                                        <Text style={{fontSize: 16, color: Theme['title-color']}}>{v.name}</Text>
                                        <Brief style={{fontSize: 12, color: Theme['text-color-secondary']}}>{v.code}{v.month} {v.rate}({parseInt(1 / v.rate)}倍)</Brief>
                                    </Item>
                                )
                            )(data)
                        }
                    </List>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        breed: state.breed,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Module)

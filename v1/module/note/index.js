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

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

import Theme from '../../theme'

const Item = List.Item
const Brief = List.Item.Brief

const Head = () => (
    <View style={{
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme['primary-color'],
    }}>
        <Text style={{
            color: 'white',
            fontSize: 18,
        }}>记录</Text>
    </View>
)

const Content = payload => (
    <ScrollView>
        {
            R.addIndex(R.map)(
                (v, k) => (
                    <View key={k} style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{width: 60, }}>
                            <View style={{paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderWidth: 0.3, borderColor: Theme['primary-color'], }}>
                                    <Text style={{fontSize: 12, color: Theme['primary-color']}}>{v.type}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingTop: 10, paddingBottom: 10, paddingRight: 20, borderBottomWidth: 0.3, borderBottomColor: Theme['border-defalut-color'], flex: 1,}}>
                            <View style={{paddingTop: 5, paddingBottom: 5,}}>
                                <Text style={{fontSize: 10, color: Theme['text-color-secondary']}}>{v.date}</Text>
                            </View>
                            <View style={{paddingTop: 10, paddingBottom: 10,}}>
                                <Text style={{lineHeight: 24, fontSize: 16, color: Theme['text-color']}}>
                                    {v.content}
                                </Text>
                            </View>
                        </View>
                    </View>
                )
            )(payload.note ? payload.note.idea : [])
        }
    </ScrollView>
)

class Module extends Component {

    // componentDidMount() {
    //     this.timer_interval = setInterval(this.props.action.test, 1000)
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.timer_interval)
    // }

    render() {

        const {
            setting,
            note,
            breed,
            navigation,
        } = this.props

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>

                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                    <Head/>

                    <Content {...this.props}/>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        setting: state.setting,
        breed: state.breed,
        note: state.note,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Module)

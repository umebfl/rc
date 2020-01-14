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
        }}>风险控制</Text>
    </View>
)

const Element = ({data, handle_press}) => (
    <List>
        <Item
            onPress={handle_press}
            arrow='horizontal'
            extra={R.compose(v => v.length, R.filter(v => !v.disable))(data)}
            thumb={
                <Icon style={{
                    marginRight: 6,
                    fontSize: 28,
                }} name='bar-chart' color={Theme['primary-color']}/>
            }>
        交易品种
        </Item>
    </List>
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
            RC,
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
                    <Element data={breed.data} handle_press={() => navigation.navigate('breed')}/>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        RC: state.RC,
        breed: state.breed,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Module)
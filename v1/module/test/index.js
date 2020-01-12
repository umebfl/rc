import React, { Component } from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
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

class Test extends Component {

    render() {

        const {
            home,
        } = this.props

        return (
            <View>
              <Text>Home Screen</Text>
              <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Home')}/>
            </View>
        )
    }
}

export default connect(
    state => ({
        home: state.home,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    })
)(Test)

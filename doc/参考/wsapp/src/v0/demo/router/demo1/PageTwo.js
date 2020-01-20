import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class PageOne extends Component {
    render() {
      return (
        <View style={{margin: 128}}>
            <Text onPress={() => Actions.pageOne({ type: ActionConst.BACK })}>PageTwo!</Text>
        </View>
      )
    }
}

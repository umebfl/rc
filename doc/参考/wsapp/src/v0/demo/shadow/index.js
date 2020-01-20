import React, { Component, StyleSheet} from 'react';
import {View} from 'react-native'

export default class Demo extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
      }}>
        <View style={{
            elevation: 10,
            // shadowOffset: {width: 0, height: 0},
            shadowColor: 'red',
            shadowOpacity: 0.5,
            shadowRadius: 500
        }}>

        <View style={{
            height: 120,
            width: 120,
            backgroundColor: 'red',
        }}></View>

        </View>
      </View>
    );
  }
}

import React, { Component, StyleSheet} from 'react';
import {View, StatusBar} from 'react-native'

export default class wsapp extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
      }}>

        <StatusBar backgroundColor='blue'/>

        <View style={{
            height: 120,
            width: 120,
            backgroundColor: 'red',
            elevation: 10,
            shadowOffset: {width: 0, height: 0},
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5
        }} />
      </View>
    );
  }
}

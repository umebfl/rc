import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

class wsapp extends Component {

    constructor(prop) {
        super(prop)
        this.state = {

        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#CCC',
                }}>
                    <Text style={style.text}>222</Text>
                </View>

                <Modal style={style.container} onPress={() => alert(1)}>
                    <Text style={style.text}>www</Text>
                </Modal>
            </View>
        )
    }
}


    <TouchableOpacity >
        <View>
        <StatusBar

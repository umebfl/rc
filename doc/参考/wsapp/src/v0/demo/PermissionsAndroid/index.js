/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

class PermissionDemo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
       permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
       hasPermission: 'Not Checked',
      };
  }

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.text}>Permission Name:</Text>
        <TextInput
          autoFocus={true}
          autoCorrect={false}
          style={styles.singleLine}
          onChange={this._updateText}
          defaultValue={this.state.permission}
        />
        <TouchableWithoutFeedback onPress={this._checkPermission}>
          <View>
            <Text style={[styles.touchable, styles.text]}>Check Permission</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.text}>Permission Status: {this.state.hasPermission}</Text>

        <TouchableWithoutFeedback onPress={this._requestPermission}>
          <View>
            <Text style={[styles.touchable, styles.text]}>Request Permission</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
    
  }

  _updateText = (event: Object) => {
    this.setState({
      permission: event.nativeEvent.text,
    });
  }

  // 检查是否授权
  _checkPermission = async () => {
    let result = await PermissionsAndroid.checkPermission(this.state.permission);
    this.setState({
      hasPermission: (result ? '授权成功' : '授权失败') + ' for ' +
        this.state.permission,
    });
  }

  // 请求权限
  _requestPermission = async () => {
    let result = await PermissionsAndroid.requestPermission(
      this.state.permission,
      {
        title: '权限请求',
        message:
          '该应用需要如下权限 ' + this.state.permission +
          ' 请授权!'
      },
    );
    this.setState({
      hasPermission: (result ? '授权成功' : '授权失败') + ' for ' +
        this.state.permission,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
  },
  text: {
    margin: 10,
  },
  touchable: {
    color: '#007AFF',
  },
});

export default PermissionDemo

// app/index.js

// Removed for brevity
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CodePush from 'react-native-code-push'

class wsapp extends Component {

    syncImmediate() {
      CodePush.sync(
        { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
        this.codePushStatusDidChange.bind(this)
      );
    }

    codePushStatusDidChange(syncStatus) {
        // alert('codePushStatusDidChange:'+ JSON.stringify(syncStatus))
      switch(syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
         alert('0' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
         alert('1' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
         alert('2' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
         alert('3' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
         alert('4' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
         alert('5' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
         alert('6' + JSON.stringify(CodePush));
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
         alert('7' + JSON.stringify(CodePush.SyncStatus));
          break;
      }
    }

    componentDidMount() {
        this.syncImmediate()
    }

    render() {
        return (
            <View>
              <Text style={styles.red}>wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL }

export default CodePush(codePushOptions)(wsapp)

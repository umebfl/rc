import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

class wsapp extends Component {
    render() {
      return <ScrollableTabView
        style={{marginTop: 20, }}
        initialPage={2}
        scrollWithoutAnimation={false}
        renderTabBar={() => <ScrollableTabBar />}
        ref={(tabView) => { this.tabView = tabView; }}>
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2'>favorite</Text>
        <Text tabLabel='Tab #3'>project</Text>
        <TouchableOpacity tabLabel='Back' onPress={() => this.tabView.goToPage(0)}>
          <Text>Lets go back!</Text>
        </TouchableOpacity>
      </ScrollableTabView>
    }
}

export default wsapp

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native'
import {StackNavigator, DrawerNavigator} from 'react-navigation'

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
)

const InboxScreen = ({ navigation }) => (
  <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
)
InboxScreen.navigationOptions = {
  drawerLabel: 'Inboxqq',
}

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen11'} navigation={navigation} />
)
DraftsScreen.navigationOptions = {
  drawerLabel: 'Drafts1',
}

const DrawerExample = DrawerNavigator(
  {
    Inbox: {
      path: '/',
      screen: InboxScreen,
    },
    Drafts1: {
      path: '/sent',
      screen: DraftsScreen,
    },
  },
  {
    drawerWidth: 300,
    // drawerPosition: 'right',
    initialRouteName: 'Inbox',
    contentComponent: props => {
        // 跳转方式
        return (
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Drafts1')
            }}>
                <Text style={{
                    marginTop: 100,
                }}>123</Text>
            </TouchableOpacity>
        )
    },
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
)

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
})

export default DrawerExample

import React from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';
import { TabNavigator } from "react-navigation";

class RecentChatsScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'tab1',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    //   tabBarIcon: ({ tintColor }) => (
    //     <Image
    //       source={require('./chats-icon.png')}
    //       style={[styles.icon, {tintColor: tintColor}]}
    //     />
    //   ),
    }
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return <Button
        onPress={() => this.props.navigation.goBack()}
        title="回退"/>
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

MainScreenNavigator.navigationOptions = {
  title: 'tab测试',
};

export default MainScreenNavigator

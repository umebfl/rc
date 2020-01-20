import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen.js'
import ChatScreen from './ChatScreen.js'
import TabNavigator_view from './TabNavigator_view.js'
import Configuring_the_header from './configuring_the_header.js'

console.disableYellowBox = true

export default StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Tab: { screen: TabNavigator_view },
  Configuring_the_header: { screen: Configuring_the_header },
});

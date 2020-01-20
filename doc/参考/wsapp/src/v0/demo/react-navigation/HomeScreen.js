import React from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>带参数的跳转!</Text>
        <Button onPress={() => navigate('Chat', { user: 'Lucy' })} title="参数传递" />
        <Text>tab测试!</Text>
        <Button onPress={() => navigate('Tab', { user: 'Tab' })} title="tab测试" />
        <Text>配置头文件!</Text>
        <Button onPress={() => navigate('Configuring_the_header', { user: 'Configuring_the_header' })} title="配置头文件" />
      </View>
    );
  }
}

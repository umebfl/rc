import React from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';

export default class ChatScreen extends React.Component {

static navigationOptions = ({ navigation }) => ({
  title: `测试标题 | ${navigation.state.params.user}`,
});
  render() {
      const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

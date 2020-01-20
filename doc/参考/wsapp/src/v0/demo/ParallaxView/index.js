import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ParallaxView from 'react-native-parallax-view'

class Parallax extends Component {
    render() {
        return (
            <ParallaxView
                backgroundSource={require('./1.png')}
                windowHeight={200}
                header={(
                    <Text style={{
                        marginTop: 20,
                    }}>
                        Header Content
                    </Text>
                )}
                scrollableViewStyle={{ backgroundColor: 'white' }}
            >
              <View style={{
                  flex: 1,
                  height: 1000,
                  backgroundColor: 'white',
              }}>
                <Text>
                    ViewViewView
                </Text>
                  <Text>

                      ViewViewView
                  </Text>
                    <Text>
                        ViewViewView
                    </Text>
                      <Text>
                          ViewViewView
                      </Text>
              </View>
            </ParallaxView>
        )
    }
}

export default Parallax

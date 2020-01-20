import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class wsapp extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            rate: 0,
        }
    }

    componentDidMount() {
        this.refs.circularProgress.performLinearAnimation(50, 5000)
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 100,
                alignItems: 'center',
            }}>
                <AnimatedCircularProgress
                    ref='circularProgress'
                    size={200}
                    width={3}
                    fill={100}
                    tintColor="#3da8f5"
                    backgroundColor="#d9d9d9">
                    {
                        fill => (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: -115,
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#8f8f8f',
                                    fontSize: 32,
                                    width: 60,
                                    backgroundColor: 'transparent',
                                }}>
                                    {
                                        `${Math.ceil(fill)}`
                                    }
                                </Text>
                                <Text style={{
                                    color: '#8f8f8f',
                                    fontSize: 24,
                                    marginTop: 8,
                                    backgroundColor: 'transparent',
                                }}>
                                    %
                                </Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        )
    }
}

export default wsapp

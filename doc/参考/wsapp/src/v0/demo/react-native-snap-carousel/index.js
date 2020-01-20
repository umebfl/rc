import React, { Component, StyleSheet} from 'react';
import {
    View,
    Text,
    Dimensions,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

const {
    width: viewportWidth,
    height: viewportHeight,
} = Dimensions.get('window')

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100
    return Math.round(value)
}

const itemHorizontalMargin = wp(0)

export default class Demo extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            cur: 0,
        }
    }

    handle_change(i) {
        this.setState({
            ...this.state,
            cur: i,
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#333',
            }}>
                <View style={{
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}>
                    <Text>
                        {this.state.cur}
                        {this.state.cur}
                        {this.state.cur}
                        {this.state.cur}
                        {this.state.cur}
                        {this.state.cur}
                    </Text>
                </View>
                <Carousel
                    ref={v => this._carousel = v}
                    swipeThreshold={200}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth + itemHorizontalMargin * 2}
                    onSnapToItem={v => this.handle_change(v)}
                    onScroll={event => {
                        console.log('1', event)
                    }}>
                        <View style={{
                            flex: 1,
                            width: viewportWidth,
                            backgroundColor: 'red',
                        }}>
                            <Text>123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            width: viewportWidth,
                            backgroundColor: 'blue',
                        }}>
                            <Text>123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            width: viewportWidth,
                            backgroundColor: 'green',
                        }}>
                            <Text>123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123</Text>
                        </View>
                </Carousel>
            </View>
        )
    }
}

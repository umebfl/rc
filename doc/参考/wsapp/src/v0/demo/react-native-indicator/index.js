import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
    TextLoader,
    PulseLoader,
    DotsLoader,
    BubblesLoader,
    CirclesLoader,
    BreathingLoader,
    RippleLoader,
    LinesLoader,
    MusicBarLoader,
    EatBeanLoader,
    DoubleCircleLoader,
    RotationCircleLoader,
    RotationHoleLoader,
    CirclesRotationScaleLoader,
    NineCubesLoader,
    LineDotsLoader,
    ColorDotsLoader,
} from 'react-native-indicator';

console.disableYellowBox = true

class wsapp extends Component {
    render() {
        return (
            <View>

                <BubblesLoader />

                <PulseLoader />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                <DotsLoader />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                <BubblesLoader />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                <CirclesLoader />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                    <TextLoader text="Loading" />
                <BreathingLoader />
                <RippleLoader />
                <LinesLoader />
                <MusicBarLoader />
                <EatBeanLoader />
                <DoubleCircleLoader />
                <RotationCircleLoader />
                <RotationHoleLoader />
                <CirclesRotationScaleLoader />
                <NineCubesLoader />
                <LineDotsLoader />
                <ColorDotsLoader />
            </View>
        )
    }
}


export default wsapp

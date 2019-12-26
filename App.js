import React from 'react'

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native'

import style from './style'

const bg = require('./pic/bg.jpg')


const App: () => React$Node = () => {
    return (
        <View style={style.main}>
            <ImageBackground style={{ flex: 1 }} source={bg}>
                <StatusBar barStyle='dark-content'/>
                <SafeAreaView>
                    <View style={style.main}>
                        <Text style={style.footer}>Engine: Hermes</Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}


export default App

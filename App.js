import React from 'react'

import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
} from 'react-native'

import style from './style'

const bg = require('./pic/bg.jpg')

const App: () => React$Node = () => {
    return (
        <ImageBackground style={style.bg} source={bg}>
            <SafeAreaView>
                <View style={style.main}>
                    <Text style={style.footer}>Engine: Hermes</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}


export default App

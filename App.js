import React from 'react'

import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native'

import style from './style'

const bg = require('./pic/bg.jpg')

const App: () => React$Node = () => {
    return (
        <ImageBackground style={style.bg} source={bg}>
            <SafeAreaView>
                <ScrollView>
                    <Text style={style.footer}>Engine: Hermes</Text>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}


export default App

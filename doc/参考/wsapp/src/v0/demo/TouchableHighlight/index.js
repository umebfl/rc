import React, { Component } from 'react'
import {TouchableHighlight, View, Text, TouchableNativeFeedback, TouchableOpacity, Image} from 'react-native'

export default class wsapp extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF'}}>
                <TouchableHighlight underlayColor='#333'>
                    <Image source={require('../../../../content/img/icon/account.png')}/>
                </TouchableHighlight>

                <TouchableOpacity activeOpacity={0.1}>
                    <Image source={require('../../../../content/img/icon/account.png')}/>
                </TouchableOpacity>

                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{width: 150, height: 100, backgroundColor: 'white'}}></View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

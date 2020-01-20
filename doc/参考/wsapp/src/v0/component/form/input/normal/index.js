import React, {Component} from 'react'
import {
    View,
    Text,
    ListView,
    TextInput,
} from 'react-native'

import style from './style.js'

export default class _Input extends Component {
    render() {
        return (
            <View style={{
                marginTop: 20,
                borderBottomWidth: .3,
                borderBottomColor: '#333',
            }}>
                <View>
                    <TextInput style={style} {...this.props.option.input} underlineColorAndroid='transparent'/>
                </View>
                <View style={{
                    position: 'absolute',
                    right: 10,
                    top: 0,
                }}>
                    {
                        this.props.option.thumbnail
                    }
                </View>
            </View>
        )
    }
}

import React, { Component } from 'react'
import {TouchableHighlight, TouchableOpacity, Image} from 'react-native'

export default class wsapp extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.1}>
                <Image source={require('../../../../content/img/icon/account.png')}/>
            </TouchableOpacity>
        )
    }
}

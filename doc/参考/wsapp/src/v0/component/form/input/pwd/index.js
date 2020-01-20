/*

TODO:
* 开关实现

*/
import React, {Component} from 'react'
import {
    TouchableOpacity,
    Image,
} from 'react-native'
import Input from '../normal'

import style from './style.js'

export default class Input_pwd extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            // 隐藏开关
            attention:  true,
            autoFocus: prop.autoFocus || false,
        }
    }

    handle_thumbnail_press() {
        this.setState({
            ...this.state,
            attention: !this.state.attention,
            autoFocus: true,
        })
    }

    render() {
        const {attention, autoFocus} = this.state

        return (
            <Input option={{
                input: {
                    ...this.props.option.input,
                    autoFocus,
                    secureTextEntry: attention,
                },
                // thumbnail:  <TouchableOpacity onPress={this.handle_thumbnail_press.bind(this)}>
                //     <Image
                //         square
                //         style={{
                //             width: 20,
                //             height: 20,
                //         }}
                //         source={
                //             attention ?
                //                 require('../../../../../../content/img/icon/attention.png')
                //                 :
                //                 require('../../../../../../content/img/icon/attention_fill.png')
                //         }
                //         {...this.props.option.thumbnail}/>
                // </TouchableOpacity>,
            }}/>
        )
    }
}

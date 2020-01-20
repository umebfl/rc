import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import {
    COLOR_MAIN,
    N_50,
} from '../../../../theme/ume-theme/variable.js'

export default class Button extends Component {
    render() {
        const {
            text,
            container_style,
            text_style,
            handle_press,
        } = this.props

        return (
            <TouchableOpacity onPress={handle_press} activeOpacity={.5}>
                <View style={{
                    justifyContent: 'center',
                    backgroundColor: COLOR_MAIN,
                    height: 38,
                    marginBottom: 20,
                    borderRadius: 4,
                    ...container_style,
                }}>
                    {
                        this.props.children
                        ? this.props.children
                        : <Text style={{
                            fontSize: 16,
                            color: 'white',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            ...text_style,
                        }}>{text}</Text>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

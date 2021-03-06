import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native'

import * as variable from '../../../../theme/ume-theme/variable.js'

class Textarea extends Component {

    render() {
        const {
            t,
            input_height,
            input_margin_top,
            placeholder_text,
        } = this.props

        return (
            <View>
                <TextInput
                    maxLength={200}
                    style={{
                        height: input_height ? input_height : variable.N_100,
                        fontSize: variable.N_16,
                        borderWidth: variable.ABS_d5,
                        borderColor: variable.COLOR_BLUE,
                        textAlignVertical: 'top',
                        borderRadius: variable.N_5,
                        borderRadiusWidth: variable.ABS_d5,
                        marginTop: input_margin_top ? input_margin_top : variable.N_10,
                        padding: variable.N_10,
                    }}
                    selectionColor='#BBBBBB'
                    underlineColorAndroid='transparent'
                    placeholder={placeholder_text ? placeholder_text : t['请输入']}
                    placeholderTextColor='#6BC1FF'/>
            </View>
        )
    }
}

export default connect(
    state => ({
        t: state.I18n.t,
    }),
)(Textarea)

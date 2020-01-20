import R from 'ramda'
import React, {Component, ProTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'

import style from './style'

import {
    ABS_d5,
    N_1,
    N_5,
    N_6,
    N_10,
    N_12,
    N_16,
    N_18,
    N_20,
    N_30,
    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE,
} from '../../../theme/ume-theme/variable.js'

class Text_toggle extends Component {

    handle_toggle() {
        this.props.on_press(this.props.text)
    }

    render() {
        const {
            i18n: {
                t,
            },
            content_style,
            text,
            src_img,
            show_image_double,
            num,
        } = this.props

        return(
            <TouchableOpacity
                activeOpacity={.5}
                style={content_style}
                onPress={this.handle_toggle.bind(this)}>
                <View style={{
                    paddingTop: N_5,
                    paddingBottom: N_5,
                    paddingLeft: N_20,
                    paddingRight: N_20,
                    borderColor: COLOR_GRAY_L,
                    borderWidth: N_1,
                    borderRadius: N_20,
                }}>
                    <Text style={{
                        color: COLOR_GRAY_L,
                    }}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default connect(
    state => ({
        info: state.User_info,
        i18n: state.I18n,
    }),
    // dispatch => ({
    //     action: bindActionCreators({component_text_toggle}, dispatch),
    // })
)(Text_toggle)

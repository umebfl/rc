import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

import Spinner from '../../loading/spinner'

import {
    COLOR_GRAY,
    COLOR_MAIN,
    N_4,
    N_14,
    N_20,
} from '../../../theme/ume-theme/variable.js'

import style from './style.js'

const ARROW_LEFT = require('../../../../../content/img/icon/arrow_left.png')

const get_touchable_icon = (source, handle_press, icon_style, text, text_style, icon_touchable) => (
    <TouchableOpacity onPress={handle_press} style={[style.icon_touchable, icon_touchable]} activeOpacity={.5}>
        <Image source={source} style={[style.icon, icon_style]}/>
        {
            text
            ? <Text style={[style.title_text, style.title_left_text, text_style]}>{text}</Text>
            : null
        }
    </TouchableOpacity>
)

export default class Header extends Component {
    render() {
        const {
            container_option,
            left_option,
            center_option,
            right_option,
        } = this.props

        return (
            <View style={[style.container, container_option ? container_option.style : {}]}>
                {
                    left_option
                    ? <View style={[style.left, left_option.container_style]}>
                        {
                            left_option.show_goback
                                ? get_touchable_icon(left_option.source ? left_option.source : ARROW_LEFT, () => {
                                    left_option.handle_press && left_option.handle_press()
                                    left_option.navigation.goBack()
                                }, left_option.icon_style, left_option.text, left_option.text_style, left_option.icon_touchable)
                                : get_touchable_icon(left_option.source, left_option.handle_press, left_option.icon_style, left_option.text, left_option.text_style)
                        }
                    </View>
                    : <View style={style.left}></View>
                }

                {
                    center_option
                    ? <View style={[style.center, center_option.container_style, {marginLeft: center_option.loading ? N_20 : 0}]}>
                        {
                            center_option.content
                            ? center_option.content
                            : <Text style={[style.center_text, style.title_text, center_option.text_style]}>{center_option.text}</Text>
                        }
                        {
                            center_option.loading
                            ? <View style={{
                                marginLeft: N_4,
                            }}>
                                <Spinner color={COLOR_MAIN} animating={center_option.loading.visiable}/>
                            </View>
                            : null
                        }
                    </View>
                    : <View style={style.center}></View>
                }

                {
                    right_option
                    ? <View style={[style.right, right_option.container_style]}>
                        {
                            right_option.content
                            ? right_option.content
                            : get_touchable_icon(right_option.source, right_option.handle_press, right_option.icon_style, right_option.text, right_option.text_style, right_option.icon_touchable)
                        }
                    </View>
                    : <View style={style.right}></View>
                }

            </View>
        )
    }
}

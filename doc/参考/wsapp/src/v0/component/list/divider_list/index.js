import R from 'ramda'
// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import style from './style'
import Img from '../../element/img/normal'

import * as variable from '../../../theme/ume-theme/variable.js'

const build_item = (v, k, data, is_border_radius, show_bottom_border = false) => (
    <View style={[
        style.content_body_listItem,
        show_bottom_border
            ? style.content_body_listItem_show_bottom_border
            : {},
    ]}>

        {
            v.img_type === 'url'
                ? <Img
                    style={
                        is_border_radius
                            ? style.content_header_left_image_radius
                            : style.content_header_left_image
                    }
                    src={v.img_src} />
                : <Image
                    style={
                        is_border_radius
                            ? style.content_header_left_image_radius
                            : style.content_header_left_image
                    }
                    source={v.img_src} />
        }

        <View style={[{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: variable.N_60,
            borderBottomWidth: k === data.length - 1 ? 0 : variable.BORDER_WIDTH,
            borderBottomColor: variable.BORDER_COLOR,
        }, style.content_body_item]}>

            <Text style={v.enable === false ? [style.content_body_item_text_left, style.text_font_size, style.text_color_gray] : [style.content_body_item_text_left, style.text_font_size]}>
                {v.title_left}
            </Text>

            {
                v.show_right_text
                    ? <Text style={v.enable === false ? [style.text_right_width, style.text_font_size_small, style.text_color_gray] : style.text_right_width}>
                        {v.title_right}
                    </Text>
                    : v.enable === false
                        ? <View>
                        </View>
                        : <TouchableOpacity onPress={v.on_icon_press} style={style.image_touchable} activeOpacity={.5}>
                            <Image source={v.image_src_right_arrow} style={style.image_left} />
                        </TouchableOpacity>
            }
        </View>
    </View>
)

export default class Divider_list extends Component {

    // static PropTypes = {
    //     // 配置
    //     option: PropTypes.object,
    // }

    render() {
        const {
            data,
            show_marginBottom,
            is_border_radius,
            show_bottom_border,
        } = this.props

        return (
            <View style={{ marginBottom: show_marginBottom ? 0 : 10 }}>
                {
                    R.addIndex(R.map)(
                        (v, k) => {

                            if(v.hide) {
                                return null
                            }

                            return v.enable === false
                                        ? <View key={k}>
                                            {build_item(v, k, data, is_border_radius, show_bottom_border)}
                                        </View>
                                        : v.on_press
                                            ? <TouchableOpacity key={k} onPress={v.on_press} activeOpacity={.5}>
                                                {build_item(v, k, data, is_border_radius, show_bottom_border)}
                                            </TouchableOpacity>
                                            : <View key={k}>
                                                {build_item(v, k, data, is_border_radius, show_bottom_border)}
                                            </View>
                        }
                    )(data)
                }
            </View>
        )
    }
}

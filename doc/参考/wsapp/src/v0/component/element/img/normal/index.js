import React, {
    Component,
} from 'react'

import {
    View,
    Image,
} from 'react-native'
// import FastImage from 'react-native-fast-image'

import style from './style.js'
import conf from '../../../../../../conf.js'
import * as variable from '../../../../theme/ume-theme/variable'

export const WIDTH_SM = variable.N_40
export const WIDTH_MD = variable.N_60
export const WIDTH_LG = variable.N_80

const SRC_DEFAULT = require('../../../../../../content/img/icon/default.jpg')

const cal_style = (width = WIDTH_SM) => ({
    width,
    height: width,
    borderRadius: width / 2,
})

export default class Img extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            err: false,
        }
    }

    handle_err() {
        this.setState({
            ...this.state,
            err: true,
        })
    }

    render() {
        const {
            src,
            default_src,
            width,
        } = this.props

        const {
            err,
        } = this.state

        if(typeof src === 'undefined' || src === null || err || src === '') {
            return (
                <View>
                    <Image
                        square
                        // blurRadius={20}
                        defaultSource={default_src || SRC_DEFAULT}
                        source={SRC_DEFAULT}
                        style={[cal_style(width), this.props.style]}/>
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                        square
                        // blurRadius={20}
                        defaultSource={default_src || SRC_DEFAULT}
                        source={{uri: `${conf.weibo.host}${conf.weibo.avatar}${src}`}}
                        style={[cal_style(width), this.props.style]}/>
{/*
                    <FastImage
                        onError={this.handle_err.bind(this)}
                        source={{
                            uri: `${conf.weibo.host}${conf.weibo.avatar}${src}`,    // 'https://unsplash.it/400/400?image=1'
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}/> */}
                </View>
            )
        }
    }
}

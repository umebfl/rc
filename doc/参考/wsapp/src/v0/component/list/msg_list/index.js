import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import moment from 'moment'

import Container from '../../layout/container'
import Content from '../../layout/content'
import Header from '../../layout/header'
import Falls_list from '../falls_list'

import {
    COLOR_MAIN,

    BORDER_WIDTH,
    BORDER_COLOR,
    BORDER_SHADOW_COLOR,

    HEADER_HEIGHT,
    HEADER_BACKGROUND_COLOR,
    HEADER_TEXT_COLOR,
    HEADER_TEXT_ACTIVE_COLOR,
    HEADER_ICON_TOUCH_WIDTH,
    STATUSBAR_FILLUP_HEIGHT,

    COLOR_GRAY_XD,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_POINT,

    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_20,
    N_22,
    N_40,
    N_44,
} from '../../../theme/ume-theme/variable.js'

const getTimeFlag = time => {

    const now_time =  new Date()

    let date = time

    date = date.replace(new RegExp("-","gm"),"/")

    let date1 = new Date(date)


    return (now_time - date1) / (24 * 60 * 60 * 1000)
}

const LANG_EN = 'en'
const LANG_ZHCN = 'zh-CN'

class Msg_list extends Component {

    constructor(prop) {
        super(prop)
    }

    handle_press(v) {
        this.props.navigation.navigate(v.path, {v, handle_goback: this.props.handle_goback})
    }

    render() {

        return (
            <Falls_list
                {...this.props}
                render_row={v => (
                    <TouchableOpacity onPress={this.handle_press.bind(this, v.open)} active={.8}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            height: 86,
                            backgroundColor: 'white',
                        }}>
                            {
                                 v.finish
                                    ? <View style={{width: N_22,}}/>
                                    : <View style={{
                                        paddingTop: N_20,
                                        width: N_22,
                                        height: N_6,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <View style={{
                                            width: N_5,
                                            height: N_5,
                                            marginLeft: N_4,
                                            borderRadius: N_3,
                                            backgroundColor: COLOR_POINT,
                                        }}/>
                                    </View>
                            }


                            <View style={{
                                flex: 1,
                                paddingRight: N_14,
                                paddingTop: N_10,
                                // backgroundColor: v.finish ? "white" : "#ECF7FF",
                            }}>
                                <View style={{
                                    borderBottomWidth: BORDER_WIDTH,
                                    borderBottomColor: BORDER_COLOR,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>

                                    {/*
                                        <View style={{
                                            position: 'absolute',
                                            zIndex: 100,
                                            top: 0,
                                            left: N_3,
                                            width: v.finish ? 0 : N_6,
                                            height: v.finish ? 0 : N_6,
                                            marginTop: N_6,
                                            borderRadius: v.finish ? 0 : N_6,
                                            borderWidth: v.finish ? 0 : N_3,
                                            borderColor: 'red',
                                        }}></View>
                                    */}

                                        <Text style={{
                                            fontSize: N_14,
                                            color: COLOR_GRAY_XD,
                                            marginBottom: N_10,
                                            height: N_44,
                                            lineHeight: N_22,
                                        }}>{v.text}</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: N_5,
                                    }}>
                                        <View style={{
                                            justifyContent: 'flex-start',
                                        }}>
                                            {
                                                <Text style={{
                                                    color: COLOR_GRAY,
                                                    fontSize: N_12,
                                                }}>{v.type}</Text>
                                            }
                                        </View>
                                            <View style={{
                                                justifyContent: 'flex-end',
                                            }}>
                                            <Text style={{
                                                color: COLOR_GRAY,
                                                fontSize: N_12,
                                            }}>
                                                {
                                                    getTimeFlag(v.time) < 3
                                                        ? moment(v.time).from()
                                                        : v.time.substring(5, 16)
                                                }

                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}/>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
)(Msg_list)

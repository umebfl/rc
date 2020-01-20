import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Container from '../../layout/container'
import Content from '../../layout/content'
import Header from '../../layout/header'
import Falls_list from '../falls_list'

import conf from '../../../../../../conf.js'


import {
    FAVORITE_TYPE
} from '../../../view/home/diary/favorite'

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
    COLOR_SECONDARY,

    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,

    ABS_d66,
    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_15,
    N_20,
    N_22,
    N_40,
    N_44,
    N_50,
    N_60,
} from '../../../theme/ume-theme/variable.js'
import style from './style.js'
import Img from '../../../component/element/img/normal'

class Diary_list extends Component {

    constructor(prop) {
        super(prop)
    }

    handle_press(v) {
        this.props.navigation.navigate(v.path, v)
    }

    render() {
        const {
            i18n: {
                t,
            },
            data,
            navigation,
        } = this.props

        return (
            <Falls_list
                {...this.props}
                render_row={(v, section_index, row_index) => {
                    return (
                        <View>
                            {
                                // v.show_date
                                //     ?   <View style={{
                                //         paddingLeft: N_20,
                                //         paddingRight: N_20,
                                //         // borderTopWidth: row_index === '0' ? 0 : ABS_d66,
                                //         // borderTopColor: BORDER_COLOR,
                                //         height: N_50,
                                //     }}>
                                //         <View style={{
                                //             flex: 1,
                                //             flexDirection: 'row',
                                //             marginTop: N_22,
                                //             marginBottom: N_10,
                                //         }}>
                                //             <View style={{
                                //                 width: N_3,
                                //                 height: N_12,
                                //                 marginRight: N_6,
                                //                 backgroundColor: COLOR_MAIN,
                                //             }}/>
                                //
                                //             <Text style={{
                                //                 fontSize: N_12,
                                //             }}>{v.date}</Text>
                                //         </View>
                                //     </View>
                                //     : null
                            }

                            <View style={{
                                paddingLeft: N_20,
                                paddingRight: N_20,
                            }}>
                                <View style={{
                                    paddingTop: N_20,
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    borderTopWidth: BORDER_WIDTH,
                                    borderTopColor: BORDER_COLOR,
                                    height: 65,
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('home_more_addressbook_personal_details', {id: v.employeeId})} activeOpacity={.5}>
                                        <Img
                                            style={style.avatar}
                                            src={v.avatar}/>
                                    </TouchableOpacity>

                                    <View style={{
                                        flex: 1,
                                        marginLeft: N_10,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginBottom: N_2,
                                        }}>
                                            <View style={{
                                                justifyContent: 'flex-start',
                                            }}>
                                                <Text style={{
                                                    color: COLOR_GRAY_D,
                                                    fontSize: N_14,
                                                }}>{v.name}</Text>
                                            </View>

                                        {
                                            this.props.type === FAVORITE_TYPE
                                                ? null
                                                :  <View style={{
                                                        justifyContent: 'flex-end',
                                                    }}>
                                                        <Text style={{
                                                            fontSize: N_12,
                                                            color: v.read === 0 || v.evaluate === 0 ? COLOR_MAIN : COLOR_SECONDARY,
                                                            borderWidth: BORDER_WIDTH,
                                                            borderColor: v.read === 0 || v.evaluate === 0 ? COLOR_MAIN : BORDER_COLOR,
                                                            padding: N_2,
                                                            borderRadius: N_5,
                                                        }}>
                                                            {
                                                                v.read
                                                                    ? v.evaluate
                                                                        ? t.have_been_evaluated
                                                                        : t.not_evaluated
                                                                    : t.unread
                                                            }
                                                        </Text>
                                                    </View>
                                        }
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: N_12,
                                                color: COLOR_SECONDARY,
                                            }}>{v.jobCname}</Text>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('home_diary_diary_tab', {id: v.logId, ws_id: v.employeeId, row_index: parseInt(row_index), type: this.props.type, job_cname: v.jobCname, name: v.name})}  activeOpacity={.5}>
                                    <View>
                                        <Text style={{
                                            fontSize: N_14,
                                            color: COLOR_GRAY_XD,
                                            height: N_44,
                                            lineHeight: N_22,
                                            marginTop: N_10,
                                            marginBottom: N_15,
                                        }}>
                                            {
                                                v.logContent
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}/>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
)(Diary_list)

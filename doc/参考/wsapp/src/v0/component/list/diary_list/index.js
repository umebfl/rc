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

import conf from '../../../../../conf.js'

import SRC_GD1 from '../../../../../content/img/icon_comment/good1.png'
import SRC_GD2 from '../../../../../content/img/icon_comment/good2.png'
import SRC_GD3 from '../../../../../content/img/icon_comment/good3.png'
import SRC_GD4 from '../../../../../content/img/icon_comment/good4.png'
import SRC_GD5 from '../../../../../content/img/icon_comment/good5.png'

import {
    FAVORITE_TYPE
} from '../../../view/home/diary/favorite'

import {
    COLOR_MAIN,
    COLOR_POINT,

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
    COLOR_GRAY_XXL,

    COLOR_RED_XL,
    BAD_COLOR,
    NORMAL_COLOR,
    GOOD_COLOR,
    GRADE_COLOR,

    SO_BAD_COLOR_BG,
    BAD_COLOR_BG,
    NORMAL_COLOR_BG,
    GOOD_COLOR_BG,
    GRADE_COLOR_BG,

    ABS_d66,
    N_1,
    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_15,
    N_18,
    N_20,
    N_22,
    N_26,
    N_40,
    N_44,
    N_50,
    N_60,

    SCREEN_WIDTH,
} from '../../../theme/ume-theme/variable.js'
import style from './style.js'
import Img from '../../../component/element/img/normal'

const borderColorFeel = R.cond([
    [
        R.equals('糟糕'),
        R.always(COLOR_RED_XL),
    ],
    [
        R.equals('较坏'),
        R.always(BAD_COLOR),
    ],
    [
        R.equals('一般'),
        R.always('white'),
    ],
    [
        R.equals('较好'),
        R.always(GOOD_COLOR),
    ],
    [
        R.equals('愉悦'),
        R.always(GRADE_COLOR),
    ],
])

const backColorFeel = R.cond([
    [
        R.equals('糟糕'),
        R.always(SO_BAD_COLOR_BG),
    ],
    [
        R.equals('较坏'),
        R.always(BAD_COLOR_BG),
    ],
    [
        R.equals('一般'),
        R.always('white'),
    ],
    [
        R.equals('较好'),
        R.always(GOOD_COLOR_BG),
    ],
    [
        R.equals('愉悦'),
        R.always(GRADE_COLOR_BG),
    ],
])

const srcEvaluate = R.cond([
    [
        R.equals(1),
        () => SRC_GD1,
    ],
    [
        R.equals(2),
        () => SRC_GD2,
    ],
    [
        R.equals(3),
        () => SRC_GD3,
    ],
    [
        R.equals(4),
        () => SRC_GD4,
    ],
    [
        R.equals(5),
        () => SRC_GD5,
    ],
])

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
                        <TouchableOpacity onPress={() => navigation.navigate('home_diary_diary_tab', {id: v.logId, ws_id: v.employeeId, row_index: parseInt(row_index), type: this.props.type, job_cname: v.jobCname, name: v.name})}  activeOpacity={.8}>
                        <View  style={{
                            flexDirection: 'row',
                            borderTopWidth: parseInt(row_index) === 0 ? 0 : 4 ,
                            borderTopColor: COLOR_GRAY_XXL,
                        }}>
                            <View style={{
                                width: 4,
                                backgroundColor: borderColorFeel(v.feel),
                            }}/>

                            <View style={{
                                flex: 1,
                                paddingLeft: N_20,
                                paddingRight: N_20,
                                backgroundColor: backColorFeel(v.feel),
                            }}>
                                <View style={{
                                    paddingTop: N_10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    height: 55,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        {
                                            v.read
                                                ? null
                                                : <View style={{
                                                    height: N_5,
                                                    width: N_5,
                                                    borderRadius: N_3,
                                                    backgroundColor: COLOR_POINT,
                                                    position: 'absolute',
                                                    left: -N_10,
                                                    top: N_2,
                                                }}/>
                                        }
                                        <TouchableOpacity onPress={() => navigation.navigate('home_more_addressbook_personal_details', {id: v.employeeId})} activeOpacity={.5}>
                                            <Img
                                                width={N_26}
                                                src={v.avatar}/>
                                        </TouchableOpacity>

                                        <View style={{
                                            paddingLeft: N_10,
                                            height: 35,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                            }}>
                                                <Text style={{
                                                    color: COLOR_GRAY_D,
                                                    fontSize: N_14,
                                                    paddingRight: N_6,
                                                }}>{v.name}</Text>

                                                {
                                                    v.experienceCount
                                                        ? <View style={style.item}>
                                                            <Text style={style.item_text}>{t.experience}</Text>
                                                        </View>
                                                        : null
                                                }

                                                {
                                                    v.suggestionCount
                                                        ? <View style={style.item}>
                                                            <Text style={style.item_text}>{t.suggestion}</Text>
                                                        </View>
                                                        : null
                                                }

                                            </View>

                                            <Text style={{
                                                paddingTop: N_2,
                                                fontSize: N_12,
                                                color: COLOR_SECONDARY,}}
                                                numberOfLines={1}
                                                ellipsizeMode='tail'>
                                                {v.jobCname}
                                            </Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={{
                                            fontSize: N_12,
                                            color: COLOR_SECONDARY,
                                            paddingLeft: N_10,
                                        }}>
                                            {v.createTime.substring(5, 16)}
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{
                                        marginTop: N_5,
                                        marginBottom: N_5,
                                        fontSize: N_14,
                                        color: COLOR_GRAY_D,
                                        height: N_44,
                                        lineHeight: N_22,
                                    }}>
                                        {
                                            v.logContent
                                        }
                                    </Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: N_6,
                                    marginBottom: N_10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{
                                            fontSize: N_12,
                                            color: COLOR_SECONDARY,
                                        }}>
                                            {v.wordCount > 999 ? '999+' : v.wordCount} {t.words}
                                        </Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{
                                            fontSize: N_12,
                                            color: COLOR_SECONDARY,
                                            paddingLeft: 10,
                                        }}>
                                            {t.browse} {v.viewCount ? v.viewCount : t.no}
                                        </Text>

                                        <Text style={{
                                            fontSize: N_12,
                                            color: COLOR_SECONDARY,
                                            paddingLeft: 10,
                                        }}>
                                            {t.evaluation} {v.evaluateCount ? v.evaluateCount : t.no}
                                        </Text>

                                        <Image
                                            style={{
                                                height: N_18,
                                                width: N_18,
                                                marginLeft: v.evaluateStat ? N_10 : 0,
                                            }}
                                            source={srcEvaluate(v.evaluateStat)}/>
                                    </View>

                                </View>
                            </View>

                        </View>
                        </TouchableOpacity>
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

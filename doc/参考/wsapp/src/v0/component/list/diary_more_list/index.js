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
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_GRAY_XL,

    BAD_COLOR,
    NORMAL_COLOR,
    GOOD_COLOR,
    GRADE_COLOR,
    COLOR_RED_XL,

    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_16,
    N_18,
    N_20,
    N_22,
    N_30,
    N_40,
    N_44,
} from '../../../theme/ume-theme/variable.js'
import style from './style.js'

import SRC_OPERATE from '../../../../../content/img/more/operate.png'
import SRC_COMMENT from '../../../../../content/img/icon_list/comment_gray.png'
import SRC_EYE from '../../../../../content/img/more/eye.png'
import SRC_GD1 from '../../../../../content/img/icon_comment/good1.png'
import SRC_GD2 from '../../../../../content/img/icon_comment/good2.png'
import SRC_GD3 from '../../../../../content/img/icon_comment/good3.png'
import SRC_GD4 from '../../../../../content/img/icon_comment/good4.png'
import SRC_GD5 from '../../../../../content/img/icon_comment/good5.png'

class Diary_more_list extends Component {

    constructor(prop) {
        super(prop)

        this.cur_date = ''
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

        const log_evaluate = R.cond([
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

        return (
            <Falls_list
                {...this.props}
                render_row={(v, section_index, row_index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('home_diary_diary_tab', {id: v.logId, ws_id: v.employeeId, row_index: parseInt(row_index), type: this.props.type,  job_cname: v.jobCname, name: v.name})}  activeOpacity={.5}>
                            <View style={{
                                backgroundColor: 'white',
                                borderBottomWidth: BORDER_WIDTH,
                                borderBottomColor: BORDER_COLOR,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingTop: N_20,
                                    paddingBottom: N_10,
                                    paddingRight: N_20,
                                    paddingLeft: N_20,
                                }}>
                                    <Text style={{
                                        fontSize: N_14,
                                        color: COLOR_GRAY_XD,
                                    }}>
                                        {v.date.substring(5, 7)}{t.month}{v.date.substring(8, 10)}{t.date}
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                    }}>

                                            <Text style={{
                                                color: COLOR_GRAY,
                                                fontSize: N_12,
                                                paddingRight: N_10,
                                            }}>
                                                {t.browse} {v.viewCount ? v.viewCount : t.no}
                                            </Text>

                                            <Text style={{
                                                color: COLOR_GRAY,
                                                fontSize: N_12,
                                                paddingRight: v.evaluateStat ? N_5 : 0,
                                            }}>
                                                {t.log_evaluate} {v.evaluateCount ? v.evaluateCount : t.no}
                                            </Text>

                                            <Text style={style.num_style}></Text>

                                            <Image
                                                source={log_evaluate(v.evaluateStat)}
                                                style={{
                                                    width: N_20,
                                                    height: N_20,
                                                }}/>

                                            {
                                                // <Text style={{
                                                //     height: N_18,
                                                //     fontSize: N_14,
                                                //     color:  R.cond([
                                                //         [
                                                //             R.equals(1),
                                                //             R.always(COLOR_RED_XL),
                                                //         ],
                                                //         [
                                                //             R.equals(2),
                                                //             R.always(BAD_COLOR),
                                                //         ],
                                                //         [
                                                //             R.equals(3),
                                                //             R.always(NORMAL_COLOR),
                                                //         ],
                                                //         [
                                                //             R.equals(4),
                                                //             R.always(GOOD_COLOR),
                                                //         ],
                                                //         [
                                                //             R.equals(5),
                                                //             R.always(GRADE_COLOR),
                                                //         ]
                                                //     ])(v.evaluateStat),
                                                // }}>
                                                //     {
                                                //         R.cond([
                                                //             [
                                                //                 R.equals(1),
                                                //                 () => t.far_below_expectations,
                                                //             ],
                                                //             [
                                                //                 R.equals(2),
                                                //                 () => t.below_expectations,
                                                //             ],
                                                //             [
                                                //                 R.equals(3),
                                                //                 () => t.achieve_expectation,
                                                //             ],
                                                //             [
                                                //                 R.equals(4),
                                                //                 () => t.beyond_expectation,
                                                //             ],
                                                //             [
                                                //                 R.equals(5),
                                                //                 () => t.far_beyond_expectation,
                                                //             ],
                                                //         ])(v.evaluateStat)
                                                //     }
                                                // </Text>
                                            }
                                    </View>
                                </View>

                                <Text style={{
                                    color: COLOR_GRAY_D,
                                    fontSize: N_16,
                                    height: 50,
                                    lineHeight: 26,
                                    paddingLeft: N_20,
                                    paddingRight: N_20,
                                    marginBottom: N_20,
                                }}>
                                    {v.logContent}
                                </Text>

                                {
                                    // <View style={{
                                    //     marginTop: N_10,
                                    //     padding: N_10,
                                    //     flexDirection: 'row',
                                    //     justifyContent: 'space-between',
                                    //     borderTopWidth: BORDER_WIDTH,
                                    //     borderTopColor: BORDER_COLOR,
                                    // }}>
                                    //     <View style={{
                                    //         flex: 1,
                                    //         flexDirection: 'row',
                                    //         justifyContent: 'center',
                                    //         borderRightWidth: BORDER_WIDTH,
                                    //         borderRightColor: BORDER_COLOR,
                                    //     }}>
                                    //         <Image source={SRC_COMMENT} style={style.icon_style}/>
                                    //

                                    //
                                    //         <Text style={style.num_style}>{v.evaluateCount}</Text>
                                    //     </View>
                                    //
                                    //     <View style={{
                                    //         flexDirection: 'row',
                                    //         justifyContent: 'center',
                                    //         flex: 1,
                                    //     }}>
                                    //         <Image source={SRC_EYE} style={style.icon_style}/>
                                    //
                                    //         <Text style={{
                                    //             color: COLOR_GRAY,
                                    //             fontSize: N_14,
                                    //             paddingRight: N_5,
                                    //         }}>
                                    //             {t.operation_record}
                                    //         </Text>
                                    //
                                    //         <Text style={style.num_style}>{v.viewCount}</Text>
                                    //     </View>
                                    // </View>
                                }
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
)(Diary_more_list)

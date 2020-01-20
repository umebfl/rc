import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import sprintf from 'sprintf'
import {connect} from 'react-redux'
import {Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput, Easing, Platform, Share,} from 'react-native'
import style from './style'
import Loading from '../../../../component/loading/normal'
import InputScrollView from 'react-native-inputscrollview'
import moment from 'moment'

import Header from '../../../../component/layout/header'

import Img from '../../../../component/element/img/normal'

import SRC_BUTTON_ON from '../../../../../../content/img/icon_comment/button_on.png'
import SRC_BUTTON_OFF from '../../../../../../content/img/icon_comment/button_off.png'
import SRC_ARROW_DOWN from '../../../../../../content/img/icon_comment/arrow_down.png'
import SRC_ARROW_RIGHT from '../../../../../../content/img/icon_comment/arrow_right.png'
import SRC_ARROW_RIGHT_GRAY from '../../../../../../content/img/icon_comment/arrow_right_gray.png'
import SRC_GD1 from '../../../../../../content/img/icon_comment/good1.png'
import SRC_GD2 from '../../../../../../content/img/icon_comment/good2.png'
import SRC_GD3 from '../../../../../../content/img/icon_comment/good3.png'
import SRC_GD4 from '../../../../../../content/img/icon_comment/good4.png'
import SRC_GD5 from '../../../../../../content/img/icon_comment/good5.png'
import SRC_LEFT_SLIDE from '../../../../../../content/img/icon_comment/left_slide.png'
import SRC_RIGHT_SLIDE from '../../../../../../content/img/icon_comment/right_slide.png'
import SRC_GD1_ACTIVE from '../../../../../../content/img/icon_comment/good1_active.png'
import SRC_GD2_ACTIVE from '../../../../../../content/img/icon_comment/good2_active.png'
import SRC_GD3_ACTIVE from '../../../../../../content/img/icon_comment/good3_active.png'
import SRC_GD4_ACTIVE from '../../../../../../content/img/icon_comment/good4_active.png'
import SRC_GD5_ACTIVE from '../../../../../../content/img/icon_comment/good5_active.png'
import SRC_FEEL_SO_BAD from '../../../../../../content/img/icon_dairy/feel_so_bad.png'
import SRC_FEEL_BAD from '../../../../../../content/img/icon_dairy/feel_bad.png'
import SRC_FEEL_NORMAL from '../../../../../../content/img/icon_dairy/feel_normal.png'
import SRC_FEEL_GOOD from '../../../../../../content/img/icon_dairy/feel_good.png'
import SRC_FEEL_GRADE from '../../../../../../content/img/icon_dairy/feel_grade.png'
import SRC_TRANSMIT from '../../../../../../content/img/icon_dairy/transmit.png'

import Com_toggle from '../../../../component/toggle/com_toggle'

import {component_toggle} from '../../../../component/toggle/com_toggle/reducer.js'

import {home_diary_favorite_set_log_state,} from '../favorite/reducer.js'
import {
    home_diary_staff_set_log_state,
    home_diary_staff_set_log_read_state,
    home_diary_staff_list_refresh,
    home_diary_staff_set_evaluate_state,
    home_diary_staff_set_evaluate_count_state,
    home_diary_staff_set_view_count_state,
} from '../staff/reducer.js'

import {home_diary_tab_show_duty,} from '../diary_tab/reducer.js'

import {
    home_diary_log_content_set,
} from './reducer.js'

import * as homepage_reducer from '../../homepage/reducer'

import {_fetch,} from '../../../../component/../lib/fetch'

import {MORE_TYPE,} from '../more'

import {ME_TYPE,} from '../me'

import {FAVORITE_TYPE,} from '../favorite'

import {MANAGER_TYPE,} from '../staff'

import {
    CEO_TYPE
} from '../../../../reducer/user/role'

import {
    BAD_COLOR,
    BORDER_COLOR,
    BORDER_WIDTH,
    COLOR_BLUE,
    COLOR_GRAY,
    COLOR_GRAY_D,
    COLOR_GRAY_XD,
    COLOR_GRAY_XXD,
    COLOR_GRAY_L,
    COLOR_GRAY_XL,
    COLOR_GRAY_XXL,
    COLOR_MAIN,
    COLOR_RED_XL,
    GOOD_COLOR,
    GRADE_COLOR,

    SO_BAD_COLOR_BG,
    BAD_COLOR_BG,
    NORMAL_COLOR_BG,
    GOOD_COLOR_BG,
    GRADE_COLOR_BG,

    ABS_d5,
    N_2,
    N_4,
    N_3,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_15,
    N_16,
    N_18,
    N_20,
    N_30,
    N_50,
    N_80,
    NORMAL_COLOR,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
} from '../../../../theme/ume-theme/variable.js'
import * as ume_theme from '../../../../component/../theme/ume-theme/index.js'

const project_log = '项目日志'
const duty_log = '职责日志'

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
        R.always(NORMAL_COLOR),
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

const borderTopColorFeel = R.cond([
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

const textComment = R.cond([
    [
        R.equals(1),
        R.always('远低期望'),
    ],
    [
        R.equals(2),
        R.always('略于期望'),
    ],
    [
        R.equals(3),
        R.always('达到期望'),
    ],
    [
        R.equals(4),
        R.always('超出期望'),
    ],
    [
        R.equals(5),
        R.always('远超期望'),
    ],
])

const colorEvaluate = R.cond([
    [
        R.equals('1'),
        R.always(COLOR_RED_XL),
    ],
    [
        R.equals('2'),
        R.always(BAD_COLOR),
    ],
    [
        R.equals('3'),
        R.always(NORMAL_COLOR),
    ],
    [
        R.equals('4'),
        R.always(GOOD_COLOR),
    ],
    [
        R.equals('5'),
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

const srcFeel = R.cond([
    [
        R.equals('糟糕'),
        R.always(SRC_FEEL_SO_BAD),
    ],
    [
        R.equals('较坏'),
        R.always(SRC_FEEL_BAD),
    ],
    [
        R.equals('一般'),
        R.always(SRC_FEEL_NORMAL),
    ],
    [
        R.equals('较好'),
        R.always(SRC_FEEL_GOOD),
    ],
    [
        R.equals('愉悦'),
        R.always(SRC_FEEL_GRADE),
    ],
])


const srcEvaluate = R.cond([
    [
        R.equals('1'),
        () => SRC_GD1,
    ],
    [
        R.equals('2'),
        () => SRC_GD2,
    ],
    [
        R.equals('3'),
        () => SRC_GD3,
    ],
    [
        R.equals('4'),
        () => SRC_GD4,
    ],
    [
        R.equals('5'),
        () => SRC_GD5,
    ],
])

const DATA_PATH = '/logs/details/'
const USER_DUTY_PATH = '/orgs/positions'
const LOGS_PATH = '/logs'
const SAVE_DATA_PATH = '/logs/status/save'
const EVALUATES_LIST_PATH = '/evaluates/list'
const LOGS_OPERATES_PATH = '/logs/operates'

const EVALUATES_PATH = '/evaluates'
const LOGS_COMMENTS_PATH = '/logs/comments'
const max_len = 200

const getTimeFlag = time => {
    let date = new Date(time)
    return date.getTime()
}

class Diary_content extends Component {

    constructor(prop) {
        super(prop)

        // const {
        //     data: {
        //         jobCname,
        //         name,
        //     },
        // } = prop

        this.read = false

        this.state = {
            _fetch_loading: true,
            show_duty: prop.show_duty,
            inited: false,
            max_num: '',
            now_time: '',
            data: {
                date: null,
                name: null,
                jobCname: null,
                depCnname: null,
                logDuty: [],
                suggestion: null,
                plan: null,
                experience: null,
                feel: null,
                avatar: null,
                employeeId: null,
                createTime: null,
                grade: null,
                evaluateCommentCount: null,
                operateCount: null,
            },
            log_duty_content: null,
            comment_data: [],
            operation_data: [],
            comment_show: true,
            operation_show: false,
            text: '',
            comment_height: 0,
            input_height: 40,
            evaluate_height: 0,
            scroll_height: 0,
            show_evaluate: 'none',
            text_margin: 0,
            evaluates_inited: false,
        }

    }

    // 设置已读
    set_read(rv) {

        const {
            log_id,
            // log_index,
            auth: {
                info,
            },
            i18n: {
                lang,
            },
            data_staff: {
                list,
            },
            navigation: {
                state: {
                    params: {
                        type,
                        row_index,
                    },
                },
            },
        } = this.props
        // if(!rv.readWsId || rv.readWsId.indexOf(info.id) === -1) {
        _fetch({
            fetch_type: 'POST',
            path: SAVE_DATA_PATH,
            param: {
                logId: log_id ? log_id : this.props.navigation.state.params.v.id,
            },
            token: info.token,
            lang: lang,
            success: () => {

                const param = {
                    k: 'read',
                    v: 1,
                    row_index: row_index,
                    log_id: log_id,
                }

                // 成功修改已读状态
                if (type === 'manager' ) {
                    this.props.action.home_diary_staff_set_log_read_state(param)
                    this.props.action.home_diary_staff_set_view_count_state(param)
                } else if (type === 'favorite') {
                    this.props.action.home_diary_favorite_set_log_state(param)
                }
            },
        })
        // }
    }

    componentDidMount() {

        const {
            page_num,
            log_index,
        } = this.props

        // console.log('componentDidMount:', page_num, log_index)

        if(page_num === log_index) {
            this.init()
        } else {
            this.timer = setTimeout(() => {
                this.init()
            }, 300)
        }

    }

    init() {
        // 日志详情列表
        this.log_detail_init()

        this.handle_comment_record()

    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }

    // 日志详情列表
    log_detail_init() {
        const {
            i18n: {
                t,
            },
        } = this.props
        // console.log('log_detail_init:', this.props.log_id)

        _fetch({
            fetch_type: 'GET',
            path: `${DATA_PATH}${this.props.log_id ? this.props.log_id : this.props.navigation.state.params.v.id}`,
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                let log_duty = []
                let log_content = ''
                let log_content_duty = []
                const drash = `\n- - - - - - - - - - - - - - - - - -\n`

                R.map(
                    R.when(
                        v => R.length(R.length(JSON.parse(v.logContent)) ? R.join('', JSON.parse(v.logContent)) : JSON.parse(v.logContent)),
                        v => log_duty.push(v)
                    )
                )(rv.logDuty)

                R.map(
                    R.when(
                        v => R.equals(v.logDetailType)(duty_log),
                        v => log_content_duty.push(v)
                    )
                )(log_duty)

                R.addIndex(R.map)(
                    (v, k) => {
                        if(v.logContent) {
                            const content = JSON.parse(v.logContent)
                            if(content.length) {
                                log_content += `※  ${t.duty} ${k + 1}: ${v.relateRespCurDesc} (${t.weight} : ${v.relateRespWeight})%\n\n${JSON.parse(v.logContent)}${drash}`
                            }
                        }
                    },
                )(log_content_duty)

                // R.map(
                //     R.when(
                //         v => R.length(R.length(【【】【】】) ? R.join('', content) : content),
                //         v => log_content += `※  ${JSON.parse(v.logContent)}\n\n`
                //     ),
                // )(rv.logDuty)

                let experience = rv.experience ? `${t.todays_experience_and_sharing}\n\n${rv.experience}${drash}` : ''

                let suggestion = rv.suggestion ? `${t.administrative_advice}\n\n${rv.suggestion}${drash}` : ''

                let plan = rv.plan ? `${t.tomorrow_work_plan}\n\n${rv.plan}${drash}` : ''

                log_content += experience + suggestion + plan

                this.props.action.home_diary_log_content_set({
                    k: this.props.log_index,
                    v: log_content,
                })
                // console.log('log_detail_init:', rv)
                this.setState({
                    ...this.state,
                    data: rv,
                    inited: true,

                    log_duty_content: log_content_duty,
                })

            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // 评价留言后后刷新
    handle_flush() {
        this.handle_comment_record()
        this.handle_operation_list()
    }

    //评价记录
    handle_comment_record() {

        _fetch({
            fetch_type: 'GET',
            path: EVALUATES_LIST_PATH,
            param: {
                logId: this.props.log_id ? this.props.log_id : this.props.navigation.state.params.v.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                const list = rv.list

                let log_evaluate_arr = []
                let data = []

                // 去掉项目日志
                // R.map(
                //     R.when(
                //         v => !R.equals(v.log_type)('project'),
                //         v => data.push(v)
                //     ))(list)
                // i_item.format_create_time === j_item.format_create_time &&
                if(list.length) {
                    if(list.length <= 1) {
                        data = list
                    } else {
                        for(let i = 0; i < list.length; i++) {
                            let merge = false
                            const i_item = list[i]

                            for(let j = i + 1; j < list.length; j++) {
                                const j_item = list[j]
                                if(i_item.evaluate_ws_id === j_item.evaluate_ws_id && i_item.evaluate_num === j_item.evaluate_num && i_item.between_relation !== j_item.between_relation) {
                                    i++
                                    merge = true
                                    data.push({
                                        ...i_item,
                                        between_relation: `${i_item.between_relation} ${j_item.between_relation}`
                                    })
                                    break
                                }
                            }

                            if(!merge) {
                                data.push(i_item)
                            }
                        }
                    }
                }

                if(this.props.navigation.state.params.type === MANAGER_TYPE){
                    R.map(
                        R.when(
                            v => R.equals(v.evaluate_ws_id)(this.props.info.wsId),
                            v => log_evaluate_arr.push(v.evaluate_num)
                        ))(rv.list)
                }

                const log_evaluate_max = R.apply(Math.max)(log_evaluate_arr)

                this.setState({
                    ...this.state,
                    evaluates_inited: true,
                    comment_data: data,
                    max_num: log_evaluate_max,
                    data: {
                        ...this.state.data,
                        evaluateCommentCount: data.length,
                    }
                })
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // 点击评价/留言刷新
    handle_comment_show() {
        this.handle_comment_record()

        this.setState({
            ...this.state,
            comment_show: !this.state.comment_show,
            operation_show: false,
        })
    }

    comment_record() {
        this.setState({
            ...this.state,
            comment_show: !this.state.comment_show,
        })
    }

    // 获取操作记录
    handle_operation_list() {
        _fetch({
            fetch_type: 'GET',
            path: LOGS_OPERATES_PATH,
            param: {
                // TODO: 测试
                // logId: 2103,
                logId: this.props.log_id ? this.props.log_id : this.props.navigation.state.params.v.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    ...this.state,
                    operation_data: R.reverse(rv),
                    data: {
                        ...this.state.data,
                        operateCount: rv.length,
                    }
                })
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    handle_operation_show(){
        this.handle_operation_list()

        this.setState({
            ...this.state,
            comment_show: false,
            operation_show: !this.state.operation_show,
        })
    }

    evaluates_list() {
        this.setState({
            ...this.state,
            operation_show: !this.state.operation_show,
        })
    }

    // handle_comment() {
    //     const {
    //         id,
    //         row_index,
    //         type,
    //     } = this.props.navigation.state.params
    //
    //     this.props.navigation.navigate('home_diary_my_comment', {
    //         id,
    //         type,
    //         row_index,
    //         logId: this.props.log_id,
    //         log_index: this.props.log_index,
    //         log_len: this.props.log_len,
    //         evaluate_max: this.state.max_num,
    //         goback: this.log_detail_init.bind(this),
    //         handle_next_page: this.props.handle_next_page,
    //         handle_flush: this.handle_flush.bind(this),
    //         data: this.state.data,
    //     })
    // }

    // 职责显示
    handle_show_duty() {

        this.setState({
            ...this.state,
            show_duty: this.state.show_duty === 'true' ? 'false' : 'true',
        })
        // alert(this.state.show_duty)
        this.props.action.home_diary_tab_show_duty()
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.log_index === nextProps.page_num && !this.read) {
            this.set_read()
            this.read = true
            return false
        }
        return true
    }

    // 更改已评价状态
    set_evaluate() {
        const {
            id,
            row_index,
            type,
        } = this.props.navigation.state.params

        const {
            log_id,
        } = this.props
        // 更新评价状态
        const param = {
            k: 'evaluate',
            v: 1,
            row_index: parseInt(row_index),
            log_id : log_id,
        }

        // 成功修改已评价状态
        if(type === 'manager') {
            this.props.action.home_diary_staff_set_evaluate_state(param)
        } else if(type === 'favorite') {
            this.props.action.home_diary_favorite_set_log_state(param)
        }
    }

    handle_textarea_change(v) {
        this.setState({
            ...this.state,
            text: v,
        })
    }

    handle_text_press(v) {
        this.setState({
            ...this.state,
            text: this.state.text + v
        })
    }

    // 提交评价
    handle_evaluates_submit() {
        const {
            log_id,
            i18n: {
                t,
            },
            data_staff: {
                list,
            },
        } = this.props

        const {
            id,
            row_index,
            type,
        } = this.props.navigation.state.params

        // 更新评价状态
        const param = {
            k: 'evaluateCount',
            v: list[parseInt(row_index)].evaluateCount,
            row_index: parseInt(row_index),
            log_id: log_id,
        }

        if(textComment(this.props.toggle.change) == null) {
            //
            toast(t.select_the_score_value, {position: 0})
        } else if((this.props.toggle.change == 1 || this.props.toggle.change == 5) && this.state.text.trim().length == 0) {
            toast(t.input_suggestion, {position: 0})
        } else {
            _fetch({
                fetch_type: 'POST',
                path: EVALUATES_PATH,
                param: {
                    logId: this.props.log_id,
                    value: this.props.toggle.change,
                    comment: this.state.text,
                    hasProject: 0,
                },
                token: this.props.auth.info.token,
                lang: this.props.i18n.lang,
                success: rv => {
                    this.setState({
                        text: '',
                    })

                    this.handle_flush()
                    this.set_evaluate()

                    this.props.handle_next_page()

                    this.props.action.home_diary_staff_set_evaluate_count_state(param)
                    // 跳到评价记录页
                    // this.props.navigation.goBack()
                },
                update_state: payload => {
                    this.setState({
                        ...this.state,
                        ...payload,
                    })
                },
            })
        }
     }

     // 提交留言
     handle_comments_submit() {

         const {
             i18n: {
                 t,
             },
         } = this.props

         if(this.state.text.trim().length == 0){
             toast(t.input_message, {position: 0})
         } else {
             _fetch({
                 fetch_type: 'POST',
                 path: LOGS_COMMENTS_PATH,
                 param: {
                     logId: this.props.log_id,
                     comment: this.state.text,
                 },
                 token: this.props.auth.info.token,
                 lang: this.props.i18n.lang,
                 success: rv => {
                     this.setState({
                         text: '',
                     })
                     this.handle_flush()
                     this.set_evaluate()

                     this.props.handle_next_page()
                 },
                 update_state: payload => {
                     this.setState({
                         ...this.state,
                         ...payload,
                     })
                 },
             })
         }
     }

     // 取消按钮
     handle_cancel() {

         this.setState({
             text: '',
         })

     }

     handle_focus() {
         this.setState({
             comment_height: 30,
             input_height: 100,
             evaluate_height: 90,
             text_margin: N_10,
         })
     }

     handle_blur() {
         this.props.role.type === CEO_TYPE ? this.props.action.component_toggle(null) : this.props.action.component_toggle(3)

         this.setState({
             ...this.state,
             comment_height: 0,
             input_height: 40,
             evaluate_height: 0,
             text_margin: 0,

             text: ''
         })
     }

     // 分享管理建议
     handle_shareText(exp) {
         const {
             data: {
                 date,
                 name,
                 suggestion,
                 experience,
             },
         } = this.state

         const {
             i18n: {
                 t,
             },
         } = this.props

         let title = exp ? `【${name} ${date} ${t.todays_experience_and_sharing}】` : `【${name} ${date} ${t.administrative_advice}】`
         let msg = exp ? `${title}\n\n${experience}` : `${title}\n\n${suggestion}`

         Share.share({
             message: msg,
             url: '',
             title: title,
             }, {
             dialogTitle: 'Share React Native website',
             excludedActivityTypes: [
               'com.apple.UIKit.activity.PostToTwitter'
             ],
             tintColor: 'green'
         })
         .then(this.handle_showResult)
         .catch((error) => this.setState({result: 'error: ' + error.message}));
     }

     handle_showResult(result) {
       if (result.action === Share.sharedAction) {
         if (result.activityType) {
           this.setState({result: 'shared with an activityType: ' + result.activityType});
         } else {
           this.setState({result: 'shared'});
         }
       } else if (result.action === Share.dismissedAction) {
         this.setState({result: 'dismissed'});
       }
     }

    render() {
        const {
            i18n: {
                t,
            },
            role,
            duty,
            // diary_tab: {
            //     show_duty,
            // },
            data_staff: {
                list,
            },
            info,
            user_duty,
            show_date,
            show_input,
            show_submit,
            navigation,
            page_num,
            log_index,
            action: {
                homepage_get_msg_count,
                homepage_set_msg_read,
            },
        } = this.props

        const {
            inited,
            now_time,
            data: {
                date,
                name,
                jobCname,
                depCnname,
                logDuty,
                suggestion,
                plan,
                experience,
                feel,
                avatar,
                employeeId,
                createTime,
                grade,
                evaluateCommentCount,
                operateCount,
            },
            log_duty_content,
            _fetch_loading,
            comment_data,
            operation_data,
            evaluates_inited,
        } = this.state

        // console.log('date:', log_index, date, createTime)

        const show_duty = Math.abs(log_index - page_num) <= 2 ? this.props.show_duty : this.state.show_duty

        const feeling = R.cond([
            [
                R.equals('糟糕'),
                R.always(t.feel_terrible),
            ],
            [
                R.equals('较坏'),
                R.always(t.feel_worse),
            ],
            [
                R.equals('一般'),
                R.always(t.feel_normal),
            ],
            [
                R.equals('较好'),
                R.always(t.feel_good),
            ],
            [
                R.equals('愉悦'),
                R.always(t.feel_grade),
            ],
        ])(feel)

        return (
            <View style={{
                flex: 1,
                width: SCREEN_WIDTH,
                backgroundColor: 'white',
            }}>
                {
                    navigation.state.params.type !== ME_TYPE && navigation.state.params.type !== MANAGER_TYPE
                        ? <View style={{marginBottom: 50}}>
                            <Header
                                left_option={{
                                    show_goback: true,
                                    navigation,
                                    handle_press: () => {
                                        homepage_set_msg_read(this.props.navigation.state.params.v.notifyId)
                                        homepage_get_msg_count()
                                    },
                                    // text: t.home,
                                    // text_style: {
                                    //     color: COLOR_GRAY,
                                    // },
                                }}
                                center_option={{
                                    text: t.my_dairy,
                                }}/>
                        </View>
                        : null

                }

                <Loading visiable={_fetch_loading}/>

                <InputScrollView showsVerticalScrollIndicator={false}>
                    {
                        inited && evaluates_inited
                            ? (
                                <View style={{
                                    borderTopColor: borderTopColorFeel(feel),
                                    borderTopWidth: 4,
                                }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between',
                                        paddingLeft: N_20,
                                        paddingRight: N_20,
                                        backgroundColor: backColorFeel(feel),
                                    }}>
                                        <View style={style.content_info_wrap}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                                paddingTop: N_15,
                                                paddingBottom: N_10,
                                            }}>
                                                <Text style={{
                                                    color: COLOR_GRAY_XD,
                                                    paddingRight: N_10,
                                                    fontSize: N_18,
                                                }}>
                                                    {date.substring(5, 7)}{t.month}{date.substring(8, 10)}{t.date}
                                                </Text>

                                                <Text style={{
                                                    fontSize: N_12,
                                                    color: COLOR_GRAY_L,
                                                }}>{t.submit_time}: {createTime.substring(5, 16)}</Text>
                                            </View>

                                            <TouchableOpacity activeOpacity={.5} onPress={this.handle_show_duty.bind(this)}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-end',
                                                    paddingTop: N_15,
                                                    paddingBottom: N_10,
                                                }}>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: COLOR_GRAY,
                                                        paddingRight: N_5,
                                                    }}>{t.duty_show}</Text>
                                                    <View style={{
                                                        paddingTop: N_20,
                                                    }}>
                                                        <Image
                                                            source={
                                                                show_duty === 'true'
                                                                    ? SRC_BUTTON_ON
                                                                    : SRC_BUTTON_OFF
                                                            }
                                                            style={{
                                                                height: N_16,
                                                                width: 30,
                                                            }}/>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingLeft: N_20,
                                        paddingRight: N_20,
                                        backgroundColor: backColorFeel(feel),
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('home_more_addressbook_personal_details', {id: employeeId})} activeOpacity={.5}>
                                                <Img
                                                    width={26}
                                                    src={avatar}/>
                                            </TouchableOpacity>

                                            <View style={{
                                                width: 76,
                                                height: 20,
                                                marginLeft: N_6,
                                            }}>
                                                <Image
                                                    style={{
                                                        width: 76,
                                                        height: 20,
                                                    }}
                                                    source={srcFeel(feel)}/>

                                                <View style={{
                                                    position: 'absolute',
                                                    top: Platform.OS === 'ios' ? N_4 : N_2,
                                                    backgroundColor: 'transparent',
                                                    left: N_20,
                                                }}>
                                                    <Text style={{
                                                        fontSize: 11,
                                                        color: 'white',
                                                    }}>{feeling}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <Text style={{
                                            fontSize: 12,
                                            color: COLOR_GRAY,
                                        }}>{t.rank}：{grade}</Text>
                                    </View>

                                    <View style={{
                                        backgroundColor: backColorFeel(feel),
                                    }}>
                                        {
                                            R.addIndex(R.map)((v, k) => (
                                                <View key={k} style={style.content_duty}>
                                                    {
                                                        show_duty === 'true'
                                                         ? v.logDetailType !== project_log
                                                            ? <View>
                                                                <Text style={style.content_duty_title}>
                                                                    {t.duty}{k + 1}：{v.relateRespCurDesc}
                                                                    （{t.weight}：{v.relateRespWeight}%）
                                                                </Text>
                                                            </View>
                                                            : null
                                                          : null
                                                    }

                                                    {
                                                        show_duty === 'true'
                                                            ? v.logDetailType !== project_log
                                                                ? R.addIndex(R.map)(
                                                                    R.ifElse(
                                                                        R.length,
                                                                        (v, k) => (
                                                                            <View key={k} style={{
                                                                                marginTop: N_10,
                                                                                backgroundColor: feel === '一般' ? 'rgba(242, 242, 242, .5)' : 'rgba(255, 255, 255, .5)',
                                                                                borderRadius: N_5,
                                                                            }}>
                                                                                <Text style={{
                                                                                    padding: N_10,
                                                                                    fontSize: N_16,
                                                                                    lineHeight: 26,
                                                                                    color: '#4d4d4d',
                                                                                }}>
                                                                                    {v}
                                                                                </Text>
                                                                            </View>
                                                                        ),
                                                                        () => null
                                                                    )
                                                                )(JSON.parse(v.logContent))
                                                                : null
                                                            : v.logDetailType !== project_log
                                                                ? R.addIndex(R.map)(
                                                                    R.ifElse(
                                                                        R.length,
                                                                        (v, k) => (
                                                                            <View key={k} style={{
                                                                                backgroundColor: feel === '一般' ? 'rgba(242, 242, 242, .5)' : 'rgba(255, 255, 255, .5)',
                                                                                borderRadius: N_5,
                                                                                marginTop: N_10,
                                                                                flexDirection: 'row',
                                                                            }}>

                                                                                <Text style={{
                                                                                    padding: N_10,
                                                                                    fontSize: N_16,
                                                                                    lineHeight: 26,
                                                                                    color: '#4d4d4d',
                                                                                }}>
                                                                                    {v}
                                                                                </Text>
                                                                            </View>
                                                                        ),
                                                                        () => null
                                                                    )
                                                                )(JSON.parse(v.logContent))
                                                                : null
                                                    }
                                                </View>
                                            ))(log_duty_content)
                                        }

                                        <View style={{
                                            marginTop: experience || suggestion || plan ? N_20 : 0,
                                            borderTopWidth: experience || suggestion || plan ? N_5 : 0,
                                            borderTopColor: '#f8f8f8',
                                            paddingLeft: N_20,
                                            paddingRight: N_20,
                                            backgroundColor: backColorFeel(feel),
                                            paddingBottom: N_20,
                                        }}>
                                            {
                                                experience
                                                    ? <View style={style.content_feel}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}>
                                                                <View style={{
                                                                    width: N_3,
                                                                    height: N_12,
                                                                    marginRight: N_6,
                                                                    backgroundColor: borderColorFeel(feel),
                                                                }}/>
                                                                <Text
                                                                    style={style.content_duty_text}>{t.todays_experience_and_sharing}</Text>
                                                            </View>


                                                            <TouchableOpacity onPress={this.handle_shareText.bind(this, true)}>
                                                                <Image
                                                                    style={{
                                                                        width: 22,
                                                                        height: 18,
                                                                    }}
                                                                    source={SRC_TRANSMIT}/>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{
                                                            marginTop: N_10,
                                                            backgroundColor: feel === '一般' ? 'rgba(242, 242, 242, .5)' : 'rgba(255, 255, 255, .5)',
                                                            borderRadius: N_5,
                                                        }}>
                                                            <Text style={{
                                                                padding: N_10,
                                                                fontSize: N_16,
                                                                lineHeight: 26,
                                                                color: '#4d4d4d',
                                                            }}>
                                                                {experience}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    : null
                                            }

                                            {
                                                suggestion
                                                    ? <View style={style.content_feel}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}>
                                                                <View style={{
                                                                    width: N_3,
                                                                    height: N_12,
                                                                    marginRight: N_6,
                                                                    backgroundColor: borderColorFeel(feel),
                                                                }}/>

                                                                <Text
                                                                    style={style.content_duty_text}>{t.administrative_advice}</Text>

                                                            </View>

                                                            <TouchableOpacity onPress={this.handle_shareText.bind(this, false)}>
                                                                <Image
                                                                    style={{
                                                                        width: 22,
                                                                        height: 18,
                                                                    }}
                                                                    source={SRC_TRANSMIT}/>
                                                            </TouchableOpacity>
                                                        </View>

                                                        <View style={{
                                                            marginTop: N_10,
                                                            backgroundColor: feel === '一般' ? 'rgba(242, 242, 242, .5)' : 'rgba(255, 255, 255, .5)',
                                                            borderRadius: N_5,
                                                        }}>

                                                            <Text style={{
                                                                padding: N_10,
                                                                fontSize: N_16,
                                                                lineHeight: 26,
                                                                color: '#4d4d4d',
                                                            }}>
                                                                {suggestion}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    : null
                                            }

                                            {
                                                plan
                                                    ? <View style={style.content_feel}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                width: N_3,
                                                                height: N_12,
                                                                marginRight: N_6,
                                                                backgroundColor: borderColorFeel(feel),
                                                            }}/>

                                                            <Text style={style.content_duty_text}>{t.tomorrow_work_plan}</Text>
                                                        </View>

                                                        <View style={{
                                                            marginTop: N_10,
                                                            backgroundColor: feel === '一般' ? 'rgba(242, 242, 242, .5)' : 'rgba(255, 255, 255, .5)',
                                                            borderRadius: N_5,
                                                        }}>
                                                            <Text style={{
                                                                padding: N_10,
                                                                fontSize: N_16,
                                                                lineHeight: 26,
                                                                color: '#4d4d4d',
                                                            }}>
                                                                {plan}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    : null
                                            }

                                        </View>
                                    </View>

                                    <View style={{
                                        borderTopWidth: N_5,
                                        borderTopColor: '#f8f8f8',
                                    }}>
                                        <TouchableOpacity
                                            onPress={
                                                comment_data.length === 0
                                                    ? evaluateCommentCount === 0
                                                        ? null
                                                        : this.state.comment_show
                                                            ? this.comment_record.bind(this)
                                                            : this.handle_comment_show.bind(this)
                                                    : this.comment_record.bind(this)}
                                            activeOpacity={evaluateCommentCount !== 0 ? .5 : 1}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                height: 50,
                                                borderBottomWidth: BORDER_WIDTH,
                                                borderBottomColor: BORDER_COLOR,
                                                paddingLeft: N_20,
                                                paddingRight: N_20,
                                            }}>
                                                {

                                                    this.state.comment_show && evaluateCommentCount !== 0
                                                        ? <Image source={SRC_ARROW_DOWN} style={style.icon_arrow}/>
                                                        : evaluateCommentCount !== 0
                                                            ? <Image source={SRC_ARROW_RIGHT} style={style.icon_arrow}/>
                                                            :<Image source={SRC_ARROW_RIGHT_GRAY} style={style.icon_arrow}/>
                                                }

                                                <Text style={{
                                                    fontSize: N_14,
                                                    color: evaluateCommentCount === 0 ? COLOR_GRAY : COLOR_GRAY_XD,
                                                    paddingLeft: N_5,
                                                    paddingRight: N_5,
                                                }}>{t.evaluate_or_message}</Text>

                                                <Text style={style.comment_text}>
                                                    {
                                                        evaluateCommentCount === 0
                                                            ? t.no
                                                            : evaluateCommentCount + t.item
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>


                                        {
                                            this.state.comment_show
                                                ? comment_data.length !== 0
                                                ? R.addIndex(R.map)(
                                                    (v, k) => (
                                                        <View
                                                            key={k}
                                                            style={{
                                                                paddingLeft: N_20,
                                                                paddingRight: N_20,
                                                                paddingTop: N_10,
                                                                backgroundColor: '#f8f8f8',
                                                            }}>
                                                            <View style={{
                                                                borderBottomColor: BORDER_COLOR,
                                                                borderBottomWidth: k === comment_data.length - 1 ? 0 : BORDER_WIDTH,
                                                                paddingBottom: N_10,
                                                            }}>

                                                                {
                                                                    v.evaluate_value !== null && v.evaluate_value_name !== null
                                                                        ? <View style={{
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'flex-end',
                                                                        }}>
                                                                            <View style={{
                                                                                flexDirection: 'row',
                                                                                alignItems: 'flex-end',
                                                                            }}>
                                                                                <Image
                                                                                    source={srcEvaluate(v.evaluate_value)}
                                                                                    style={style.icon_feel}/>

                                                                                <Text style={{
                                                                                    fontSize: N_14,
                                                                                    color: colorEvaluate(v.evaluate_value),
                                                                                    paddingLeft: N_5,
                                                                                }}>{v.evaluate_value_name}</Text>
                                                                            </View>

                                                                            <View style={{
                                                                                flexDirection: 'row',
                                                                            }}>
                                                                                <Text style={style.comment_text_right}>
                                                                                    {v.evaluator_name === null ? v.ws_name : v.evaluator_name}
                                                                                </Text>

                                                                                <Text style={style.comment_text_right}>
                                                                                    {
                                                                                        R.ifElse(
                                                                                            v => !!v,
                                                                                            v => v.substring(5, 16),
                                                                                            () => v.format_create_time.substring(5)
                                                                                        )(v.comment_create_time)
                                                                                    }
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                        : null
                                                                }

                                                                {
                                                                    v.comment && v.evaluate_value === null && v.evaluate_value_name === null
                                                                        ? <View style={{
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'flex-start',
                                                                        }}>
                                                                            <View style={{flex: 1,}}>
                                                                                <Text style={{
                                                                                    fontSize: N_14,
                                                                                    color: COLOR_GRAY_D,
                                                                                }}>{v.comment}</Text>
                                                                            </View>

                                                                            <View style={{
                                                                                height: N_20,
                                                                                flexDirection: 'row',
                                                                                alignItems: 'flex-end',
                                                                            }}>
                                                                                <Text style={style.comment_text_right}>
                                                                                    {v.evaluator_name === null ? v.ws_name : v.evaluator_name}
                                                                                </Text>

                                                                                <Text style={style.comment_text_right}>
                                                                                    {
                                                                                        R.ifElse(
                                                                                            v => !!v,
                                                                                            v => v.substring(5, 16),
                                                                                            () => v.format_create_time.substring(5)
                                                                                        )(v.comment_create_time)
                                                                                    }
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                        : <Text style={{
                                                                            fontSize: N_14,
                                                                            color: COLOR_GRAY_D,
                                                                            paddingTop: v.comment ? N_10 : 0,
                                                                        }}>{v.comment}</Text>
                                                                }

                                                            </View>
                                                        </View>
                                                    )
                                                )(comment_data)
                                                : null
                                                : null
                                        }

                                    </View>

                                    <View>
                                        <TouchableOpacity
                                            onPress={
                                                operation_data.length === 0
                                                    ? operateCount === 0
                                                        ? null
                                                        : this.state.operation_show
                                                            ? this.evaluates_list.bind(this)
                                                            : this.handle_operation_show.bind(this)
                                                    : this.evaluates_list.bind(this)
                                                }
                                            activeOpacity={operateCount !== 0 ? .5 : 1}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                height: 50,
                                                borderBottomColor: BORDER_COLOR,
                                                borderBottomWidth:  navigation.state.params.type === ME_TYPE || navigation.state.params.type === MORE_TYPE
                                                                        ? BORDER_WIDTH
                                                                        : this.state.operation_show
                                                                            ? BORDER_WIDTH
                                                                            : 0,
                                                paddingLeft: N_20,
                                                paddingRight: N_20,
                                            }}>
                                                {
                                                    this.state.operation_show && operateCount !== 0
                                                        ? <Image source={SRC_ARROW_DOWN} style={style.icon_arrow}/>
                                                        : operateCount !== 0
                                                        ? <Image source={SRC_ARROW_RIGHT} style={style.icon_arrow}/>
                                                        :
                                                        <Image source={SRC_ARROW_RIGHT_GRAY} style={style.icon_arrow}/>
                                                }

                                                <Text style={{
                                                    fontSize: N_14,
                                                    color: operateCount === 0 ? COLOR_GRAY : COLOR_GRAY_XD,
                                                }}> {t.operation_record}  </Text>


                                                <Text style={style.comment_text}>
                                                    {
                                                        operateCount === 0
                                                            ? t.no
                                                            : operateCount + t.item
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        {
                                            this.state.operation_show
                                                ? operation_data.length !== 0
                                                ? R.addIndex(R.map)((v, k) => (
                                                        <View key={k} style={{
                                                            paddingLeft: N_20,
                                                            paddingRight: N_20,
                                                            paddingTop: N_15,
                                                            backgroundColor: '#f8f8f8',
                                                        }}>
                                                            <View style={{
                                                                paddingBottom: N_15,
                                                                borderBottomColor: BORDER_COLOR,
                                                                borderBottomWidth: k === operation_data.length - 1 ? 0 : BORDER_WIDTH,
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: N_14,
                                                                        color: COLOR_GRAY,
                                                                    }}>
                                                                        {
                                                                        //     R.cond([
                                                                        //         [
                                                                        //             R.equals('DIRECT_SUPERIOR'),
                                                                        //             R.always(t.direct_superior),
                                                                        //         ],
                                                                        //         [
                                                                        //             R.equals('INDIRECT_SUPERIOR'),
                                                                        //             R.always(t.indirect_superior),
                                                                        //         ],
                                                                        //         [
                                                                        //             R.equals('SELF'),
                                                                        //             R.always(''),
                                                                        //         ],
                                                                        //         [
                                                                        //             R.T,
                                                                        //             R.always(v.relation),
                                                                        //         ],
                                                                        //     ])(v.relation)
                                                                        }
                                                                    </Text>

                                                                    <Text style={style.operation_text_right}>
                                                                        {R.cond([
                                                                            [
                                                                                R.equals(1),
                                                                                R.always(t.browse),
                                                                            ],
                                                                            [
                                                                                R.equals(2),
                                                                                R.always(t.establish),
                                                                            ],
                                                                            [
                                                                                R.equals(3),
                                                                                R.always(t.submit),
                                                                            ],
                                                                            [
                                                                                R.equals(4),
                                                                                R.always(t.modify),
                                                                            ],
                                                                            [
                                                                                R.equals(5),
                                                                                R.always(t.evaluate),
                                                                            ],
                                                                            [
                                                                                R.equals(6),
                                                                                R.always(t.message),
                                                                            ],
                                                                            [
                                                                                R.equals(7),
                                                                                R.always(t.delete_evaluate),
                                                                            ],
                                                                        ])(v.type)}
                                                                    </Text>

                                                                </View>


                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: N_14,
                                                                        color: COLOR_GRAY,
                                                                        paddingRight: N_10,
                                                                    }}>{v.ws_name}</Text>

                                                                    <Text
                                                                        style={style.operation_text}>{v.create_time.substring(5, 16)}</Text>
                                                                </View>

                                                            </View>
                                                        </View>
                                                    )
                                                )(operation_data)
                                                : null
                                                : null
                                        }
                                    </View>

                                    {
                                        inited && navigation.state.params.type === MANAGER_TYPE
                                            ? <View style={{
                                                borderTopWidth: N_5,
                                                borderTopColor: '#f8f8f8',
                                                paddingTop: N_20,
                                            }}>
                                                <Text style={{
                                                    paddingLeft: N_20,
                                                    paddingBottom: N_20,
                                                    fontSize: N_15,
                                                    color: COLOR_GRAY_XXD,
                                                }}>
                                                    {
                                                        navigation.state.params.type === MANAGER_TYPE && this.state.max_num < 3
                                                            ? t.input_evaluate
                                                            : t.input_message
                                                    }
                                                </Text>

                                                <TextInput
                                                 //    onFocus={this.handle_focus.bind(this)}
                                                 //    onBlur={this.handle_blur.bind(this)}
                                                    maxLength={200}
                                                    style={{
                                                        height: 100,
                                                        fontSize: N_14,
                                                        borderWidth: ABS_d5,
                                                        borderColor: COLOR_GRAY_XXL,
                                                        textAlignVertical: 'top',
                                                        borderRadius: N_5,
                                                        backgroundColor: COLOR_GRAY_XXL,
                                                        marginBottom: N_20,
                                                        marginRight: N_20,
                                                        marginLeft: N_20,
                                                        padding: N_10,
                                                        color: COLOR_GRAY_D,
                                                        lineHeight: N_20,
                                                    }}
                                                    ref='textInput1'
                                                    selectionColor='#BBBBBB'
                                                    underlineColorAndroid='transparent'
                                                    placeholder={navigation.state.params.type === MANAGER_TYPE && this.state.max_num < 3 ? t.comment : t.leave_message}
                                                    placeholderTextColor='#cccccc'
                                                    multiline={true}
                                                    value={this.state.text}
                                                    onChangeText={this.handle_textarea_change.bind(this)}/>


                                                {
                                                    navigation.state.params.type === MANAGER_TYPE && this.state.max_num < 3
                                                        ? <View style={{
                                                            paddingRight: N_20,
                                                            paddingLeft: N_20,
                                                            backgroundColor: 'white',
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            marginBottom: N_20,
                                                        }}>
                                                            <Com_toggle
                                                                text={t.far_below_expectations}
                                                                src_img={SRC_GD1}
                                                                src_img_bg={SRC_GD1_ACTIVE}
                                                                num={1}/>

                                                            <Com_toggle
                                                                text={t.below_expectations}
                                                                src_img={SRC_GD2}
                                                                src_img_bg={SRC_GD2_ACTIVE}
                                                                num={2}/>

                                                            <Com_toggle
                                                                text={t.achieve_expectation}
                                                                src_img={SRC_GD3}
                                                                src_img_bg={SRC_GD3_ACTIVE}
                                                                num={3}/>

                                                            <Com_toggle
                                                                text={t.beyond_expectation}
                                                                src_img={SRC_GD4}
                                                                src_img_bg={SRC_GD4_ACTIVE}
                                                                num={4}/>

                                                            <Com_toggle
                                                                text={t.far_beyond_expectation}
                                                                src_img={SRC_GD5}
                                                                src_img_bg={SRC_GD5_ACTIVE}
                                                                num={5}/>
                                                        </View>
                                                        : null
                                                }

                                                   <TouchableOpacity
                                                        activeOpacity={.5}
                                                        onPress={
                                                            navigation.state.params.type === MANAGER_TYPE && this.state.max_num < 3
                                                                ? this.handle_evaluates_submit.bind(this)
                                                                : this.handle_comments_submit.bind(this)
                                                    }>
                                                      <View style={{
                                                          marginLeft: N_20,
                                                          marginRight: N_20,
                                                          height: 40,
                                                          justifyContent: 'center',
                                                          alignItems: 'center',
                                                          backgroundColor: COLOR_BLUE,
                                                          borderRadius: N_30,
                                                          borderWidth: 1,
                                                          borderColor: COLOR_BLUE,
                                                      }}>
                                                          <Text style={{
                                                              color: 'white',
                                                              fontSize: 17,
                                                          }}>
                                                             {t.submit}
                                                          </Text>
                                                      </View>
                                                  </TouchableOpacity>
                                            </View>
                                        : null
                                    }

                                    {
                                        // <View style={{
                                        //     marginTop: N_20,
                                        //     marginBottom: 80,
                                        //     alignItems: 'center',
                                        // }}>
                                        //     {
                                        //         navigation.state.params.type === FAVORITE_TYPE || navigation.state.params.type === MANAGER_TYPE
                                        //             ? <TouchableOpacity activeOpacity={.5}
                                        //                                 onPress={this.handle_comment.bind(this)}>
                                        //                 <View style={{
                                        //                     height: 40,
                                        //                     width: 250,
                                        //                     justifyContent: 'center',
                                        //                     alignItems: 'center',
                                        //                     backgroundColor: COLOR_BLUE,
                                        //                     borderRadius: N_30,
                                        //                     borderWidth: 1,
                                        //                     borderColor: COLOR_BLUE,
                                        //                 }}>
                                        //                     <Text style={{
                                        //                         color: 'white',
                                        //                         fontSize: 17,
                                        //                     }}>
                                        //                         {
                                        //                             navigation.state.params.type === FAVORITE_TYPE
                                        //                                 ? t.message
                                        //                                 : navigation.state.params.type === MANAGER_TYPE
                                        //                                 ? this.state.max_num < 3
                                        //                                     ? t.immediate_evaluate
                                        //                                     : t.message
                                        //                                 : t.message
                                        //                         }
                                        //                     </Text>
                                        //                 </View>
                                        //             </TouchableOpacity>
                                        //             : null
                                        //     }
                                        //
                                        // </View>
                                    }

                                    {
                                        navigation.state.params.type === ME_TYPE || navigation.state.params.type === MANAGER_TYPE
                                            ? this.props.log_len !== 1
                                                ? <View style={{
                                                    alignItems: 'center',
                                                    marginTop: N_50,
                                                    marginBottom: N_50,
                                                }}>

                                                    <Text style={{color: '#898989',fontSize: N_14,}}>{this.props.log_index + 1}/{this.props.log_len}</Text>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>

                                                        {
                                                            this.props.log_index === this.props.log_len - 1
                                                                ? null
                                                                : <Image style={{
                                                                    width: N_15,
                                                                    height: N_10,
                                                                }} source={SRC_LEFT_SLIDE}/>
                                                        }

                                                        <Text style={{
                                                            height: 16,
                                                            fontSize: N_12,
                                                            color: '#898989',
                                                            paddingLeft: N_5,
                                                            paddingRight: N_5,
                                                        }}>
                                                            {t.sliding_diary}
                                                        </Text>

                                                        {
                                                            this.props.log_index === 0
                                                                ? null
                                                                : <Image style={{
                                                                    width: N_15,
                                                                    height: N_10,
                                                                }} source={SRC_RIGHT_SLIDE}/>
                                                        }

                                                    </View>
                                                </View>
                                                : <View style={{marginTop: N_80}}/>
                                            : <View style={{marginTop: N_80}}/>
                                    }

                                </View>
                            )
                            : null
                    }

                </InputScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        data_staff: state.Diary_staff,
        toggle: state.Component_toggle,
        diary_tab: state.Diary_tab,
        auth: state.Auth,
        i18n: state.I18n,
        role: state.User_role,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_diary_favorite_set_log_state,
            home_diary_staff_set_log_read_state,
            home_diary_staff_set_log_state,
            home_diary_staff_list_refresh,
            home_diary_tab_show_duty,
            home_diary_log_content_set,
            home_diary_staff_set_evaluate_state,
            home_diary_staff_set_evaluate_count_state,
            home_diary_staff_set_view_count_state,

            component_toggle,
            ...homepage_reducer,
        }, dispatch),
    })
)(Diary_content)

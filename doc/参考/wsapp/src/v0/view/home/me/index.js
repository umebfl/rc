import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ScrollView, TouchableOpacity} from 'react-native'

import Container from '../../../component/layout/container'
import Content from '../../../component/layout/content'
import Header from '../../../component/layout/header'
import Divider_list from '../../../component/list/divider_list'
import Img, {
    WIDTH_LG,
} from '../../../component/element/img/normal'

import conf from '../../../../../conf.js'

import style from './style'
import {
    SCROLLVIEW_BACKGROUND_COLOR,
} from '../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../lib/fetch'


import {
    CEO_TYPE,
    STAFF_TYPE,
} from '../../../reducer/user/role'

const SRC_POINT = require('../../../../../content/img/icon/point.png')
const SRC_FOLLOW = require('../../../../../content/img/icon/following.png')
const SRC_DATE = require('../../../../../content/img/icon/date_1.png')
const SRC_DATE_GRAY = require('../../../../../content/img/icon/date.png')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../content/img/icon/arrow_right_gray.png')
const SRC_SHIELD = require('../../../../../content/img/icon/shield.png')
const SRC_PROJECT = require('../../../../../content/img/icon/project.png')
const SRC_TARGET = require('../../../../../content/img/icon/target.png')
const SRC_FOLLOWS = require('../../../../../content/img/icon/follows.png')
const SRC_FANS = require('../../../../../content/img/icon/fans.png')
const SRC_SETTING = require('../../../../../content/img/icon/setting.png')
const SRC_MENU = require('../../../../../content/img/more/more_blue/menu.png')
const SRC_OA = require('../../../../../content/img/more/more_blue/OA.png')
const SRC_CONTACT = require('../../../../../content/img/more/more_blue/contact.png')
const SRC_PROJECT_GRAY = require('../../../../../content/img/icon/project_gray.png')

const CHECK_FIELD_OPERATION_PATH = '/attend/authentication'
const SRC_USERS_DETAILS = '/users/details/'

import {
    DIARY_MANAGER,
} from '../../../reducer/user/role'

class Me extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            enable: false,
            data: {},
        }
    }

    componentDidMount() {
        this.handle_detail()
        // this.check_field_operation()
    }

    // 个人信息
    handle_detail() {
        _fetch({
            fetch_type: 'GET',
            path: `${SRC_USERS_DETAILS}${this.props.auth.info.id}`,
            // param: {
            //     wsId: this.props.auth.info.id,
            // },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    ...this.state,
                    data: rv,
                })
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    check_fetch_loading: payload.payload,
                })
            },
        })
    }

    // 检测是否具有外勤权限
    // check_field_operation() {
    //     _fetch({
    //         fetch_type: 'POST',
    //         path: CHECK_FIELD_OPERATION_PATH,
    //         param: {
    //             wsId: this.props.auth.info.id,
    //         },
    //         token: this.props.auth.info.token,
    //         lang: this.props.i18n.lang,
    //         success: rv => {
    //             if (rv === true) {
    //                 this.setState({enable:true})
    //             }
    //         },
    //         update_state: payload => {
    //             this.setState({
    //                 ...this.state,
    //                 check_fetch_loading: payload.payload,
    //             })
    //         },
    //     })
    // }

    render() {
        const {
            i18n: {
                t,
            },
            role: {
                operation,
                type,
            },
            navigation: {
                navigate,
            },
            info: {
                name,
                avatar,
                jobCName,
                depCName,
            },
        } = this.props

        const {
            data: {
                avgHours,
                lateTimes,
                leaveHours,
            }
        } = this.state

        return (
            <Container style={style.container_view}>
                <Header
                    // left_option={{
                    //     source: SRC_MENU,
                    //     icon_style: {
                    //         width: 30,
                    //         height: 30,
                    //     },
                    //     handle_press: () => this.props.navigation.navigate('DrawerOpen'),
                    // }}
                    // right_option={{
                    //     source: SRC_SETTING,
                    //     handle_press: () => navigate('home_me_setting'),
                    // }}
                    center_option={{
                        text: t.me,
                    }} />

                <Content style={{
                    backgroundColor: SCROLLVIEW_BACKGROUND_COLOR,
                }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <TouchableOpacity onPress={() => navigate('home_me_info')} activeOpacity={.5}>
                            <View style={style.info_wrap}>
                                <View style={style.avatar_view}>
                                    <Img
                                        width={WIDTH_LG}
                                        style={style.avatar_image}
                                        src={avatar} />

                                    <View style={style.info_style}>
                                        <Text style={style.avatar_text_top}>
                                            {name}
                                        </Text>
                                        <Text style={style.avatar_text_btm}>
                                            {jobCName}
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={style.info_attend}>本月考勤</Text>

                                    <View style={style.info_attend_wrap}>
                                        <View style={style.info_attend_item}>
                                            <Text style={style.info_attend_time}>{avgHours === null ? 0 : avgHours}小时</Text>

                                            <Text style={style.info_attend_msg}>日均出勤时长</Text>
                                        </View>

                                        <View style={style.info_attend_border}/>

                                        <View style={style.info_attend_item}>
                                            <Text style={style.info_attend_time}>{lateTimes === null ? 0 : lateTimes}次</Text>

                                            <Text style={style.info_attend_msg}>迟到次数</Text>
                                        </View>

                                        <View style={style.info_attend_border}/>

                                        <View style={style.info_attend_item}>
                                            <Text style={style.info_attend_time}>{leaveHours === null ? 0 : leaveHours}小时</Text>

                                            <Text style={style.info_attend_msg}>休假时长</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <Divider_list
                            navigate={navigate}
                            data={[
                                // TODO: 待实现
                                // {
                                //     img_src: SRC_POINT,
                                //     title_left: '我的积分',
                                //     show_right_text: false,
                                //     image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                //     on_press: () => navigate('home_me_info'),
                                // },
                                {
                                    img_src: SRC_SHIELD,
                                    title_left: t.my_duty,
                                    show_right_text: false,
                                    image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                    on_icon_press: () => navigate('home_me_duty'),
                                    on_press: () => navigate('home_me_duty'),
                                },
                                {
                                    // hide: type === CEO_TYPE,
                                    img_src: SRC_DATE,
                                    title_left: '我的日志',
                                    show_right_text: false,
                                    enable: true,
                                    image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                    on_icon_press: () => navigate('home_diary_me'),
                                    on_press: () => navigate('home_diary_me'),
                                },
                                {
                                    hide: type === STAFF_TYPE,
                                    img_src: SRC_FOLLOW,
                                    title_left: t.my_concern,
                                    show_right_text: false,
                                    image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                    on_icon_press: () => navigate('home_me_follows'),
                                    on_press: () => navigate('home_me_follows'),
                                },
                                {
                                    img_src: SRC_CONTACT,
                                    title_left: t.my_address_book,
                                    show_right_text: false,
                                    image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                    on_icon_press: () => navigate('home_more_addressbook'),
                                    on_press: () => navigate('home_more_addressbook'),
                                },
                                // {
                                //     img_src: this.state.enable ? SRC_PROJECT : SRC_PROJECT_GRAY,
                                //     title_left: t.field_worker,
                                //     show_right_text: false,
                                //     enable: this.state.enable,
                                //     image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                //     on_icon_press: () => navigate('home_more_field'),
                                //     on_press: () => navigate('home_more_field'),
                                // },
                                // TODO: 待实现
                                // {
                                //     img_src: SRC_PROJECT,
                                //     title_left: t.my_project,
                                //     show_right_text: false,
                                //     image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                //     on_press: () => navigate('home_me_info'),
                                // },
                                // TODO: 待实现
                                // {
                                //     img_src: SRC_TARGET,
                                //     title_left: '我的目标',
                                //     show_right_text: false,
                                //     image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                //     on_press: () => navigate('home_me_info'),
                                // },
                            ]} />

                        <Divider_list
                            navigate={navigate}
                            data={[
                                {
                                    img_src: SRC_SETTING,
                                    title_left: t.my_setting,
                                    show_right_text: false,
                                    image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                    on_icon_press: () => navigate('home_me_setting'),
                                    on_press: () => navigate('home_me_setting'),
                                },
                                // {
                                //     img_src: SRC_OA,
                                //     title_left: 'OA',
                                //     show_right_text: false,
                                //     image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                //     on_icon_press: () => navigate('home_more_oa'),
                                //     on_press: () => navigate('home_more_oa'),
                                // },

                            ]} />

                        {
                            operation.indexOf(DIARY_MANAGER) !== -1
                                ? <Divider_list
                                    navigate={navigate}
                                    data={[
                                        // {
                                        //     img_src: SRC_FANS,
                                        //     title_left: t.my_fans,
                                        //     show_right_text: false,
                                        //     image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                        //     on_icon_press: () => navigate('home_me_fans'),
                                        //     on_press: () => navigate('home_me_fans'),
                                        // },
                                    ]}/>
                                : null

                        }

                    </ScrollView>
                </Content>

            </Container>
        )
    }
}

export default connect(
    state => ({
        info: state.User_info,
        i18n: state.I18n,
        auth: state.Auth,
        role: state.User_role,
    }),
    // dispatch => ({
    //     action: bindActionCreators({user_role_set_field_operation}, dispatch),
    // })
)(Me)

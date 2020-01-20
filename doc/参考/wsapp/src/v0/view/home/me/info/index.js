import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import Header from '../../../../component/layout/header'
import Divider_list from '../../../../component/list/divider_list'
import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import conf from '../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../theme/ume-theme'
import Img, {
    WIDTH_LG,
} from '../../../../component/element/img/normal'

import {
    _fetch,
} from '../../../../lib/fetch'

const SRC_AVATAR = require('../../../../../../content/img/icon_accout/avatar.png')
const SRC_NAME = require('../../../../../../content/img/icon_accout/name.png')
const SRC_SECTION = require('../../../../../../content/img/icon_accout/section.png')
const SRC_STATION = require('../../../../../../content/img/icon_accout/station.png')
const SRC_CHARGE = require('../../../../../../content/img/icon_accout/charge.png')
const SRC_RANK = require('../../../../../../content/img/icon_accout/rank.png')
const SRC_EMAIL_ACCOUT = require('../../../../../../content/img/icon_accout/email_accout.png')
const SRC_WORK_TIME_LONG = require('../../../../../../content/img/icon_accout/work_time_long.png')
const SRC_WORK_TIME_ALL = require('../../../../../../content/img/icon_accout/work_time_all.png')
const SRC_BUG = require('../../../../../../content/img/icon_accout/bug.png')
const SRC_REST = require('../../../../../../content/img/icon_accout/rest.png')

const SRC_USERS_DETAILS = '/users/details/'

class Info extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
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

    render() {
        const {
            i18n: {
                t,
            },
            info: {
                wsId,
                name,
                empGrade,
                mail,
                jobCName,
                depCName,
                reportTo,
                joinDate,
                annualLeave,
                totalLeave,
                avatar,
                hrType,
                postClassification,
            },
            navigation,
        } = this.props

        const {
            data: {
                attend,
                needAttend,
                lateTimes,
            }
        } = this.state

        return (

            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.my_profile,
                    }}/>

                <Content>

                    <View style={style.container_view}>

                        <ScrollView showsVerticalScrollIndicator={false} >
                            <TouchableOpacity onPress={() => navigation.navigate('home_me_info_avatar')} activeOpacity={.5}>
                                <View style={style.avatar_view}>
                                    <Image source={SRC_AVATAR} style={style.avatar_image_left}/>

                                    <View style={style.avatar_view_right}>
                                        <Text style={style.avatar_text_top}>
                                            {t.avatar}
                                        </Text>
                                        <Img
                                            style={style.avatar_image_right}
                                            src={avatar}/>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <Divider_list
                                data={[
                                    {
                                        img_src: SRC_NAME,
                                        title_left: t.name,
                                        title_right: name,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_SECTION,
                                        title_left: t.department,
                                        title_right: depCName,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_STATION,
                                        title_left: t.job,
                                        title_right: jobCName,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_STATION,
                                        title_left: t.classification,
                                        title_right: postClassification ? postClassification : t.secret,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_CHARGE,
                                        title_left: t.immediate_superior,
                                        title_right: reportTo,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_RANK,
                                        title_left: t.rank,
                                        title_right: empGrade,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_EMAIL_ACCOUT,
                                        title_left: t.mail,
                                        title_right: mail,
                                        show_right_text: true,
                                    },
                                ]}/>

                            <Divider_list
                                data={[
                                    {
                                        img_src: SRC_WORK_TIME_LONG,
                                        title_left: t.attendance_this_month,
                                        title_right: attend != null ? attend : t.not_statistics,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_WORK_TIME_ALL,
                                        title_left: t.need_attendance,
                                        title_right: needAttend != null ? needAttend : t.not_statistics,
                                        show_right_text: true,
                                    },
                                    {
                                        img_src: SRC_BUG,
                                        title_left: t.tardiness,
                                        title_right: lateTimes != null ? lateTimes : t.not_statistics,
                                        show_right_text: true,
                                    },
                                    // {
                                    //     img_src: SRC_REST,
                                    //     title_left: t.annual_leave,
                                    //     title_right: `${t.usable} ${annualLeave ? annualLeave : 0} / ${t.total} ${totalLeave ? totalLeave : 0}`,
                                    //     show_right_text: true,
                                    // },
                                ]}/>

                        </ScrollView>

                    </View>
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
    }),
    // dispatch => ({
    //     action: bindActionCreators(reducer, dispatch),
    // })
)(Info)

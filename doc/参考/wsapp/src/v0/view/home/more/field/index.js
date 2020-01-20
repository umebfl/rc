import R from 'ramda'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, PermissionsAndroid, Platform, NetInfo} from 'react-native'
import Geolocation from 'Geolocation'
import InputScrollView from 'react-native-inputscrollview'

import Header from '../../../../component/layout/header'
import Container from '../../../../component/layout/container'
import toast from '../../../../component/toast/normal'
import Loading from '../../../../component/loading/normal'
import Content from '../../../../component/layout/content'
import conf from '../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../theme/ume-theme'

const SRC_ARROW_RIGHT_GRAY = require('../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_CHECK_IN = require('../../../../../../content/img/icon_field/check_in.png')
const SRC_CHECK_IN_GRAY = require('../../../../../../content/img/icon_field/check_in_gray.png')
const SRC_LOG = require('../../../../../../content/img/icon_field/log.png')
const SRC_LOG_GRAY = require('../../../../../../content/img/icon_field/log_gray.png')
const SRC_CHECK_OUT = require('../../../../../../content/img/icon_field/check_out.png')
const SRC_CHECK_OUT_GRAY = require('../../../../../../content/img/icon_field/check_out_gray.png')

import {
    FIELD,
    has_operation,
    // user_role_set_field_operation,
} from '../../../../reducer/user/role'

import {
    field_sign_info_init
} from './reducer.js'

import {
    _fetch,
} from '../../../../lib/fetch'

const CHECK_FIELD_OPERATION_PATH = '/attend/authentication'
const SIGNIN_PATH = '/attend/signin'
const SIGNOUT_PATH = '/attend/signout'
const SIGNINFO_PATH = '/attend/'
const LOGS_EXIST_PATH='/logs/exist'
const LOGS_FIX_DATESS_PATH = '/logs/fix-dates'

import {
    COLOR_GRAY,
    N_10,
} from '../../../../theme/ume-theme/variable.js'

class Field extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            inited: false,
            fix_data: '',
            latitude_data: '',
            longitude_data: '',
            fix_filed_inited: false,
            filed_inited: false,
            permission: Platform.OS === 'ios'
                        ? true
                        : PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           };
    }

    componentDidMount() {
        this.sign_info_data()
        this.check_field_operation()
        // this.check_log_fix_exist()
    }

    //检查用户是否有写日志
    // check_log_exist() {
    //     _fetch({
    //         fetch_type: 'GET',
    //         path: LOGS_EXIST_PATH,
    //         param: {
    //             wsId: this.props.auth.info.id,
    //             date: this.props.signInfo.data.term,
    //         },
    //         token: this.props.auth.info.token,
    //         lang: this.props.i18n.lang,
    //         success: rv => {
    //             // alert(JSON.stringify(rv))
    //         },
    //         update_state: payload => {
    //             this.setState({
    //                 ...this.state,
    //                 ...payload,
    //             })
    //         },
    //     })
    // }

    //员工考勤数据
    async sign_info_data() {

        const {
            i18n: {
                t,
            },
        } = this.props

        if (Platform.OS === 'android') {
            result = await PermissionsAndroid.request(
                this.state.permission,
                {
                    title: t.requests_permission,
                    message: `${t.requests_permission_desc} ${this.state.permission} ${t.requests_permission_desc_1}`,
                },
            )
        }
        Geolocation.getCurrentPosition(
            location => {
                let result = `
                ${t.speed}: ${location.coords.speed}
                ${t.longitude}: ${location.coords.longitude}
                ${t.latitude}: ${location.coords.latitude}
                ${t.accuracy}: ${location.coords.accuracy}
                ${t.heading}: ${location.coords.heading}
                ${t.altitude}: ${location.coords.altitude}
                ${t.altitudeAccuracy}: ${location.coords.altitudeAccuracy}
                ${t.timestamp}: ${location.coords.timestamp}
            `

                _fetch({
                    fetch_type: 'GET',
                    path: SIGNINFO_PATH + this.props.auth.info.id,
                    param: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    },
                    token: this.props.auth.info.token,
                    lang: this.props.i18n.lang,
                    success: rv => {
                        // alert(JSON.stringify(rv))
                        this.props.action.field_sign_info_init(rv)
                        this.setState({
                            ...this.state,
                            latitude_data: location.coords.latitude,
                            longitude_data: location.coords.longitude,
                        })
                        // alert('经度' + location.coords.latitude + ',' + '纬度' + location.coords.longitude )
                    },
                    update_state: payload => {
                        this.setState({
                            ...this.state,
                            ...payload,
                        })
                    },
                })
            },
            error => {
                NetInfo.isConnected.fetch().done((isConnected) => {
                    if(isConnected) {
                        toast(t.get_location_service_failed, { position: 0 })
                    }
                })
            }
        )
    }

    // 检测是否具有外勤权限
    check_field_operation() {
        _fetch({
            fetch_type: 'POST',
            path: CHECK_FIELD_OPERATION_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    fix_filed_inited: true,
                })

                if (rv === true) {
                    this.setState({
                        filed_inited: true,
                    })
                }
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    check_fetch_loading: payload.payload,
                })
            },
        })
    }

    // 检查是否有补写日志
    // check_log_fix_exist() {
    //     _fetch({
    //         fetch_type: 'GET',
    //         path: LOGS_FIX_DATESS_PATH,
    //         param: {
    //             wsId: this.props.auth.info.id,
    //         },
    //         token: this.props.auth.info.token,
    //         lang: this.props.i18n.lang,
    //         success: rv => {
    //             this.setState({
    //                 ...this.state,
    //                 fix_data: R.values(JSON.parse(rv).data),
    //             })
    //             // alert(this.state.fix_data)
    //         },
    //         update_state: payload => {
    //             this.setState({
    //                 ...this.state,
    //                 ...payload,
    //             })
    //         },
    //     })
    // }

    //签到
    async signIn() {
        let result = true
        const {
            i18n: {
                t,
            },
        } = this.props

        if(Platform.OS === 'android') {
            result = await PermissionsAndroid.request(
                this.state.permission,
                {
                    title: t.requests_permission,
                    message: `${t.requests_permission_desc} ${this.state.permission} ${t.requests_permission_desc_1}`,
                },
            )
        }

        result
        ? Geolocation.getCurrentPosition(
            location => {
                let result = `
                    ${t.speed}: ${location.coords.speed}
                    ${t.longitude}: ${location.coords.longitude}
                    ${t.latitude}: ${location.coords.latitude}
                    ${t.accuracy}: ${location.coords.accuracy}
                    ${t.heading}: ${location.coords.heading}
                    ${t.altitude}: ${location.coords.altitude}
                    ${t.altitudeAccuracy}: ${location.coords.altitudeAccuracy}
                    ${t.timestamp}: ${location.coords.timestamp}
                `

                _fetch({
                    fetch_type: 'POST',
                    path: SIGNIN_PATH,
                    param: {
                        wsId: this.props.auth.info.id,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    },
                    token: this.props.auth.info.token,
                    lang: this.props.i18n.lang,
                    success: rv => {
                        this.sign_info_data()
                    },
                    update_state: payload => {
                        this.setState({
                            ...this.state,
                            ...payload,
                        })
                    },
                })
            },
            error => {
                NetInfo.isConnected.fetch().done((isConnected) => {
                    if(isConnected) {
                        toast(t.get_location_service_failed, { position: 0 })
                    }
                })
            }
        )
        : toast(t.location_service_is_closed, { position: 0 })
    }

    // 签出
    async signOut() {

        let result = true

        const {
            i18n: {
                t,
            },
        } = this.props

        if(Platform.OS === 'android') {
            result = await PermissionsAndroid.request(
                this.state.permission,
                {
                    title: t.requests_permission,
                    message: `${t.requests_permission_desc} ${this.state.permission} ${t.requests_permission_desc_1}`,
                },
            )
        }

        result
        ? Geolocation.getCurrentPosition(
            location => {
                let result = `
                    ${t.speed}: ${location.coords.speed}
                    ${t.longitude}: ${location.coords.longitude}
                    ${t.latitude}: ${location.coords.latitude}
                    ${t.accuracy}: ${location.coords.accuracy}
                    ${t.heading}: ${location.coords.heading}
                    ${t.altitude}: ${location.coords.altitude}
                    ${t.altitudeAccuracy}: ${location.coords.altitudeAccuracy}
                    ${t.timestamp}: ${location.coords.timestamp}
                `

                _fetch({
                    fetch_type: 'POST',
                    path: SIGNOUT_PATH,
                    param: {
                        wsId: this.props.auth.info.id,
                        latitude: location.coords.latitude + '',
                        longitude: location.coords.longitude + '',
                    },
                    token: this.props.auth.info.token,
                    lang: this.props.i18n.lang,
                    success: rv => {
                        this.sign_info_data()
                    },
                })
            },
            error => {
                NetInfo.isConnected.fetch().done((isConnected) => {
                    if(isConnected) {
                        toast(t.get_location_service_failed, { position: 0 })
                    }
                })
            }
        )
        : toast(t.location_service_is_closed, { position: 0 })
    }

    render() {
        const {
            i18n: {
                t,
            },
            role: {
                operation,
            },
            auth,
            info: {
                avatar,
            },
            signInfo: {
                data
            },
            navigation,
        } = this.props

        const {
            fix_filed_inited,
            filed_inited,
        } = this.state

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.field_worker,
                    }}/>

                <Content>
                    {/* <Loading visiable={this.state.check_fetch_loading}/> */}
                    <Loading visiable={this.state._fetch_loading}/>


                    {
                        fix_filed_inited
                            ? filed_inited
                                ? !has_operation(FIELD, operation)
                                    ? <View style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}>
                                        {
                                            data.card1 || data.card3
                                            ? <TouchableWithoutFeedback>
                                                <View  style={[style.item, style.item_gray]}>
                                                    <Image source={SRC_CHECK_IN_GRAY} style={style.item_image} />
                                                    <View>
                                                        <Text style={style.item_text}>
                                                            {t.signed_in}
                                                        </Text>

                                                        {
                                                            data.card3 || data.card1
                                                            ? <Text style={style.item_time}>
                                                                {data.card3 ? data.card3.substring(0, 5) : data.card1.substring(0, 5)}
                                                            </Text>
                                                            : null
                                                        }

                                                        <Text style={style.item_location1}>
                                                            {data.location1}
                                                        </Text>

                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            : <TouchableOpacity style={[style.item, style.item_top]} onPress={this.signIn.bind(this)} activeOpacity={.5}>
                                                <Image source={SRC_CHECK_IN} style={style.item_image} />
                                                <Text style={style.item_text}>
                                                    {t.sign_in}
                                                </Text>
                                            </TouchableOpacity>
                                        }

                                        {
                                            // (data.card1 || data.card3) && data.logflag
                                            //     ? <TouchableWithoutFeedback>
                                            //         <View style={[style.item, style.item_gray]}>
                                            //             <Image source={SRC_LOG_GRAY} style={style.item_image}/>
                                            //             <Text style={[style.item_text, style.item_text_sub]}>
                                            //                 {t.submitted_log}
                                            //             </Text>
                                            //         </View>
                                            //     </TouchableWithoutFeedback>
                                            //     : !data.card1 || data.card3
                                            //         ? <View
                                            //             style={[style.item, style.item_gray]}
                                            //             activeOpacity={.5}>
                                            //             <Image source={SRC_LOG_GRAY} style={style.item_image} />
                                            //             <Text style={style.item_text}>
                                            //                 {t.keep_diary}
                                            //             </Text>
                                            //         </View>
                                            //         : <TouchableOpacity
                                            //             style={style.item}
                                            //             onPress={() => navigation.navigate('home_more_field_diary', {time: (data.term ? data.term.substring(0, 10) : ''), goback: this.sign_info_data.bind(this), latitude: this.state.latitude_data, longitude: this.state.longitude_data,})}
                                            //             activeOpacity={.5}>
                                            //             <Image source={SRC_LOG} style={style.item_image} />
                                            //             <Text style={style.item_text}>
                                            //                 {t.keep_diary}
                                            //             </Text>
                                            //         </TouchableOpacity>
                                        }

                                        {
                                            (data.card1 || data.card3 ) && data.logflag && (data.card2 || data.card4)
                                                ? <TouchableWithoutFeedback>
                                                    <View style={[style.item, style.item_gray]}>
                                                        <Image source={SRC_CHECK_OUT_GRAY} style={style.item_image}/>

                                                        <View>
                                                            <Text style={style.item_text}>
                                                                {t.signed_out}
                                                            </Text>

                                                            {
                                                                data.card4 || data.card2
                                                                ? <Text style={style.item_time}>
                                                                    {data.card4 ? data.card4.substring(0, 5) : data.card2.substring(0, 5)}
                                                                </Text>
                                                                : null
                                                            }

                                                            <Text style={style.item_location1}>
                                                                {data.location2}
                                                            </Text>

                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                : data.card1 || data.card3
                                                    ? data.logflag
                                                        ? <TouchableOpacity style={style.item} onPress={this.signOut.bind(this)} activeOpacity={.5}>
                                                            <Image source={SRC_CHECK_OUT} style={style.item_image}/>
                                                            <Text style={style.item_text}>
                                                                {t.field_sign_out}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        : <TouchableWithoutFeedback>
                                                            <View style={[style.item, style.item_gray]}>
                                                                <Image source={SRC_CHECK_OUT_GRAY} style={style.item_image}/>
                                                                <Text style={style.item_text}>
                                                                    先提交日志后{t.field_sign_out}
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    : <TouchableWithoutFeedback>
                                                        <View style={[style.item, style.item_gray]}>
                                                            <Image source={SRC_CHECK_OUT_GRAY} style={style.item_image}/>
                                                            <Text style={style.item_text}>
                                                                {t.field_sign_out}
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                        }

                                    </View>
                                    : null
                                : <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                    <Text>你没有外勤权限</Text>
                                </View>
                            : null

                    }
                </Content>

                {
                    // this.state.fix_data.length == 0
                    // ? null
                    // : <TouchableOpacity
                    //     onPress={() => {navigation.navigate('home_more_field_diary', {fix_day: this.state.fix_data, goback: this.check_log_fix_exist.bind(this), latitude: this.state.latitude_data, longitude: this.state.longitude_data,})}}
                    //     activeOpacity={.5}>
                    //     <Text style={{
                    //         backgroundColor: '#c9eaff',
                    //         paddingTop: 15,
                    //         paddingBottom: 15,
                    //         textAlign: 'center',
                    //         fontSize: 16,
                    //     }}>
                    //         {this.state.fix_data.length}{t.patch_log}
                    //     </Text>
                    // </TouchableOpacity>
                }
            </Container>
        )
    }
}

export default connect(
    state => ({
        signInfo: state.Home_more_field,
        role: state.User_role,
        auth: state.Auth,
        info: state.User_info,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({
            // user_role_set_field_operation,
            field_sign_info_init
        }, dispatch),
    })
)(Field)

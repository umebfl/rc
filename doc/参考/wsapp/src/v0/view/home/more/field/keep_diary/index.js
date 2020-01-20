import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Platform,
    View,
    Button,
    Text,
    Image,
    ScrollView,
    TextInput,
    PermissionsAndroid,
    TouchableOpacity,
    NetInfo,
} from 'react-native'
import Geolocation from 'Geolocation'
import InputScrollView from 'react-native-inputscrollview'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import conf from '../../../../../../../conf.js'
import style from './style'
import Loading from '../../../../../component/loading/normal'
import Feel from './feel'

import {
    _fetch,
} from '../../../../../lib/fetch'

const SIGNINFO_PATH = '/attend/'
const USER_DUTY_PATH = '/orgs/positions'
const LOGS_PATH = '/logs'
const LOGS_FIX_DATESS_PATH = '/logs/fix-dates'

import {
    keep_diary_clean,
    keep_diary_set_experience,
    keep_diary_set_suggestion,
    keep_diary_set_plan,
    keep_diary_set_duty_log,
} from './reducer.js'

import {
    feel_init,
} from './feel/reducer.js'

import * as variable from '../../../../../theme/ume-theme/variable.js'

class Keep_diary extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            sign_inited: false,
            duty_inited: false,
            fix_inited: false,
            sign_data: [],
            duty_data: [],
            fix_data: [],
            fix_count: 0,
            fix_date: '',
            latitude_data: '',
            longitude_data: '',
            feel: prop.feel_data.feel,
            permission: Platform.OS === 'ios'
                        ? true
                        : PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        }
    }

    componentDidMount() {
        this.sign_info_data()
        this.user_duty()
        this.check_log_fix_exist()
    }

    // 考勤数据
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
                        this.setState({
                            ...this.state,
                            latitude_data: location.coords.latitude,
                            longitude_data: location.coords.longitude,
                            sign_data: rv,
                            sign_inited: true,
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

    // 是否有补写日志
    check_log_fix_exist() {
        _fetch({
            fetch_type: 'GET',
            path: LOGS_FIX_DATESS_PATH,
            param: {
                wsId: this.props.auth.info.id,
                notToday: 0,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                const data =  R.compose(
                    R.reverse,
                    R.values
                )(JSON.parse(rv).data)

                this.setState({
                    ...this.state,
                    fix_inited: true,
                    fix_data: data,
                    fix_date: data[0],
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

    // 职责
    user_duty() {
        _fetch({
            fetch_type: 'GET',
            path: USER_DUTY_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {

                this.setState({
                    ...this.state,
                    duty_data: rv,
                    duty_inited: true,
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

    // 填写内容
    handle_input_change(k, v) {
        this.props.action.keep_diary_set_duty_log({k, v})
    }

    // 时间选择
    handle_date_select(k, v) {
        this.setState({
            ...this.state,
            fix_count: k,
            fix_date: v,
        })
    }

    //提交日志
    set_use_job() {
        const {
            i18n: {
                t,
            },
            diary: {
                duty_log,
                duty_len,
                experience,
                suggestion,
                plan,
                weibo,
            },
        } = this.props

        if(duty_len < 50) {
            toast(t.word_should_be_more_than, {position: 0})
            return
        }

        if(experience.length && experience.length < 10 ) {
            toast(t.share_word_should_be_more_than, {position: 0})
            return
        }

        if( suggestion.length && suggestion.length < 10) {
            toast(t.manager_word_should_be_more_than, {position: 0})
            return
        }

        if( plan.length && plan.length < 10) {
            toast(t.plan_word_should_be_more_than, {position: 0})
            return
        }

        // 心情
        const feel_text = R.cond([
            [
                R.equals(0),
                R.always(t.feel_so_bad),
            ],
            [
                R.equals(1),
                R.always(t.feel_bad),
            ],
            [
                R.equals(2),
                R.always(t.feel_so_so),
            ],
            [
                R.equals(3),
                R.always(t.feel_preferably),
            ],
            [
                R.equals(4),
                R.always(t.feel_joyful),
            ],
        ])(this.state.feel)

        // 内容参数
        const duty_content = R.compose(
            R.map(v => ({
                relate_resp_id: v[0],
                log_content: [v[1]],
                log_detail_id: 0,
                log_detail_type: t.duty_log,
            })),
            R.toPairs
        )(duty_log)

        _fetch({
            fetch_type: 'POST',
            path: LOGS_PATH,
            param: {
                experienceToWeibo: Number(weibo),
                wsId: this.props.auth.info.id,
                content: duty_content,
                suggestion: suggestion,
                experience: experience,
                feel: feel_text,
                plan: plan,
                latitude: this.state.latitude_data,
                longitude: this.state.longitude_data,
                curDate: this.state.fix_date,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                toast(`${t.sumbit_success}${this.state.fix_date}${t.log}`, {position: 0})

                const len = this.state.fix_data.length

                const data =  R.filter(
                    v => !R.equals(this.state.fix_date)(v)
                )(this.state.fix_data)

                this.setState({
                    ...this.state,
                    fix_data: data,
                    fix_date: data[0],
                    fix_count: 0,
                })

                if(len <= 1){
                    this.props.navigation.goBack()
                }

                this.props.action.keep_diary_clean()
                this.props.action.feel_init()
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // 返回
    handle_goback(){
        this.props.navigation.goBack()
    }

    render() {
        const {
            i18n: {
                t,
            },
            navigation,
            info,
            diary,
        } = this.props

        const {
            sign_data,
            duty_data,
            fix_data,
            sign_inited,
            duty_inited,
            fix_inited,
        } = this.state

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.keep_diary,
                    }}/>

                {
                    duty_inited && fix_inited
                        ? fix_data.length !== 0
                            ? <Content>
                                <Loading visiable={this.state._fetch_loading}/>

                                <View style={style.time_select_wrap}>
                                    <ScrollView contentContainerStyle={{paddingVertical: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={style.time_select}>
                                            {
                                                R.addIndex(R.map)(
                                                    (v, k) => (
                                                        <TouchableOpacity key={k} activeOpacity={.5} onPress={() => this.handle_date_select(k, v)}>
                                                            <View style={this.state.fix_count === k ? style.time_text_wrap_active : style.time_text_wrap}>
                                                                <Text style={this.state.fix_count === k ? style.time_text_active : style.time_text}>{v}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                )(fix_data)
                                            }
                                        </View>
                                    </ScrollView>
                                </View>

                                <InputScrollView showsVerticalScrollIndicator={false} style={style.scroll_wrap}>
                                    <View style={style.padding_wrap}>
                                        {
                                            R.addIndex(R.map)(
                                                (v, k) => (
                                                    <View key={k} style={style.duty_item}>
                                                        <Text style={style.duty_text}>{t.duty}{k + 1} :  {v.relate_resp_cur_desc}（权重：{v.relate_resp_weight}%）</Text>

                                                        <View style={style.duty_input_wrap}>
                                                            <TextInput
                                                                style={style.duty_input}
                                                                maxLength={200}
                                                                multiline= {true}
                                                                selectionColor='#BBBBBB'
                                                                underlineColorAndroid='transparent'
                                                                placeholder={t.recommended_input}
                                                                placeholderTextColor={variable.COLOR_GRAY}
                                                                value={diary.duty_log[v.relate_resp_id]}
                                                                onChangeText={this.handle_input_change.bind(this, v.relate_resp_id)}/>
                                                        </View>
                                                    </View>
                                                )
                                            )(duty_data)
                                        }

                                    </View>

                                    <View style={style.title_items}>
                                        <View style={style.item_wrap}>
                                            <View style={style.title_wrap}>
                                                <View style={style.vertical_line}/>

                                                <Text style={style.title}>{t.todays_experience_and_sharing}</Text>
                                            </View>

                                            <View style={style.duty_input_wrap}>
                                                <TextInput
                                                    value={diary.experience}
                                                    onChangeText={v => this.props.action.keep_diary_set_experience(v)}
                                                    style={style.duty_input}
                                                    maxLength={200}
                                                    multiline= {true}
                                                    selectionColor='#BBBBBB'
                                                    underlineColorAndroid='transparent'
                                                    placeholder={t.recommended_input_personal_experience}
                                                    placeholderTextColor={variable.COLOR_GRAY}/>
                                            </View>
                                        </View>

                                        <View style={style.item_center_border}>
                                            <View style={style.item_wrap}>
                                                <View style={style.title_wrap}>
                                                    <View style={style.vertical_line}/>

                                                    <Text style={style.title}>{t.administrative_advice}</Text>
                                                </View>

                                                <View style={style.duty_input_wrap}>
                                                    <TextInput
                                                        value={diary.suggestion}
                                                        onChangeText={v => this.props.action.keep_diary_set_suggestion(v)}
                                                        style={style.duty_input}
                                                        maxLength={200}
                                                        multiline= {true}
                                                        selectionColor='#BBBBBB'
                                                        underlineColorAndroid='transparent'
                                                        placeholder={t.recommended_input_suggestions}
                                                        placeholderTextColor={variable.COLOR_GRAY}/>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={style.item_wrap}>
                                            <View style={style.title_wrap}>
                                                <View style={style.vertical_line}/>

                                                <Text style={style.title}>{t.tomorrow_work_plan}</Text>
                                            </View>

                                            <View style={style.duty_input_wrap}>
                                                <TextInput
                                                    value={diary.plan}
                                                    onChangeText={v => this.props.action.keep_diary_set_plan(v)}
                                                    style={style.duty_input}
                                                    maxLength={200}
                                                    multiline= {true}
                                                    selectionColor='#BBBBBB'
                                                    underlineColorAndroid='transparent'
                                                    placeholder={t.recommended_input_plan}
                                                    placeholderTextColor={variable.COLOR_GRAY}/>
                                            </View>
                                        </View>
                                    </View>

                                    <Feel/>

                                    <View style={[style.content_note, style.padding_wrap]}>
                                        <Text style={style.content_note_common}>
                                            {t.altogether}
                                        </Text>

                                        <Text style={style.content_note_center}>
                                            {
                                                diary.duty_len
                                            }
                                        </Text>

                                        <Text style={style.content_note_common}>
                                            {t.should_be_more_than_50_words}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            marginTop: 60,
                                            marginBottom: 60,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                        }}
                                        activeOpacity={.5}
                                        onPress={() => this.set_use_job()}>
                                        <View style={style.push_wrap}>
                                            <Text style={style.push_text}>
                                                {t.submit}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </InputScrollView>
                            </Content>
                            : <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 70,
                            }}>
                                <Text style={{color: 'gray'}}>已写日志~</Text>
                            </View>
                        : null
                }

            </Container>
        )
    }
}

export default connect(
    state => ({
        auth: state.Auth,
        i18n: state.I18n,
        diary: state.Home_more_field_keep_diary,
        feel_data: state.Home_more_field_keep_diary_feel,
    }),
    dispatch => ({
        action: bindActionCreators({
            keep_diary_clean,
            keep_diary_set_experience,
            keep_diary_set_suggestion,
            keep_diary_set_plan,
            keep_diary_set_duty_log,

            feel_init,
        }, dispatch),
    })
)(Keep_diary)

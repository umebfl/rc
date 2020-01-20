import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Platform} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import InputScrollView from 'react-native-inputscrollview'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import conf from '../../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../../theme/ume-theme'
import Loading from '../../../../../component/loading/normal'
import Button from '../../../../../component/form/button/loading'
import {user_duty_init} from '../../../../../reducer/user/duty'
import {
    diary_clean,
    set_duty_log,
    set_experience,
    set_suggestion,
    set_plan,
    home_more_field_diary_set,
} from './reducer.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
} from '../../../../../theme/ume-theme/variable.js'

const USER_DUTY_PATH = '/orgs/positions'
const LOGS_PATH = '/logs'
const LOGS_EXIST_PATH='/logs/exist'
const LOGS_FIX_DATESS_PATH = '/logs/fix-dates'

class Field_diary extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            inited: false,
            fix_data: '',
            date: '',
            fix_dates: '',
            feel: prop.diary.feel
        }
    }

    //职责
    componentDidMount() {
        this.user_duty()

        if(this.props.navigation.state.params.fix_day){
            this.check_log_fix_exist()
        }
    }

    // 填写日志。处理下拉菜单数据
    handle_fix_dates() {

        const {
            i18n: {
                t,
            },
        } = this.props

        const fix_data = R.map(v => (
            `${t.fill_in}${v}${t.log}`
        ))(this.state.fix_data)

        this.setState({
            ...this.state,
            fix_dates: fix_data,
            date: this.state.fix_data[0],
        })
    }

    dropdown(style) {
        //   console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
        style.top = Platform.OS === 'ios' ? 118 : 132
        style.right = 22
        return style
    }

    //
    handle_dropdown(k, v){
        this.setState({
            ...this.state,
            date: v.substring(2, 12)
        })
    }

    // 检查是否有补写日志
    check_log_fix_exist() {
        _fetch({
            fetch_type: 'GET',
            path: LOGS_FIX_DATESS_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    ...this.state,
                    fix_data: R.values(JSON.parse(rv).data),
                })
                this.handle_fix_dates()
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    //提交日志
    set_use_job() {
        const {
            i18n: {
                t,
            },
        } = this.props

        if(this.props.diary.duty_len < 50) {
            toast(t.word_should_be_more_than, {position: 0})
            return
        }

        if(this.props.diary.experience.length && this.props.diary.experience.length < 10 ) {
            toast(t.share_word_should_be_more_than, {position: 0})
            return
        }

        if( this.props.diary.suggestion.length && this.props.diary.suggestion.length < 10) {
            toast(t.manager_word_should_be_more_than, {position: 0})
            return
        }

        if( this.props.diary.plan.length && this.props.diary.plan.length < 10) {
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
        const duty_log = R.compose(
            R.map(v => ({
                relate_resp_id: v[0],
                log_content: [v[1]],
                log_detail_id: 0,
                log_detail_type: t.duty_log,
            })),
            R.toPairs
        )(this.props.diary.duty_log)


        // 正常提交和补写日志提交
        if(this.props.navigation.state.params.time){
            _fetch({
                fetch_type: 'POST',
                path: LOGS_PATH,
                param: {
                    experienceToWeibo: Number(this.props.diary.weibo),
                    wsId: this.props.auth.info.id,
                    content: duty_log,
                    suggestion: this.props.diary.suggestion,
                    experience: this.props.diary.experience,
                    feel: feel_text,
                    plan: this.props.diary.plan,
                    latitude: this.props.navigation.state.params.latitude,
                    longitude: this.props.navigation.state.params.longitude,
                },
                token: this.props.auth.info.token,
                lang: this.props.i18n.lang,
                success: rv => {
                    toast(t.sumbit_log_success, {position: 0})
                    this.props.navigation.goBack()
                    this.handle_goback()
                    this.props.action.diary_clean()
                },
                update_state: payload => {
                    this.setState({
                        ...this.state,
                        ...payload,
                    })
                },
            })
        }else{
            _fetch({
                fetch_type: 'POST',
                path: LOGS_PATH,
                param: {
                    experienceToWeibo: Number(this.props.diary.weibo),
                    wsId: this.props.auth.info.id,
                    content: duty_log,
                    suggestion: this.props.diary.suggestion,
                    experience: this.props.diary.experience,
                    feel: feel_text,
                    plan: this.props.diary.plan,
                    latitude: this.props.navigation.state.params.latitude,
                    longitude: this.props.navigation.state.params.longitude,
                    curDate: this.state.date,
                },
                token: this.props.auth.info.token,
                lang: this.props.i18n.lang,
                success: rv => {
                    toast(`${t.sumbit_success}${this.state.date}${t.log}`, {position: 0})
                    this.check_log_fix_exist()
                    if(this.state.fix_data.length == 1){
                        this.props.navigation.goBack()
                        this.handle_goback()
                    }
                    this.props.action.diary_clean()
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


    //获取职责
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
                this.props.action.user_duty_init(rv)

                this.setState({
                    ...this.state,
                    inited: true,
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

    //返回重新请求考勤数据
    handle_goback() {
        this.props.navigation.state.params.goback()
    }

    handle_set_feel(v) {
        this.props.action.home_more_field_diary_set({
            feel: this.props.diary.feel === v ? null : v,
        })

        this.setState({
            ...this.state,
            feel: this.props.diary.feel === v ? null : v,
        })
    }

    handle_set_weibo() {
        this.props.action.home_more_field_diary_set({
            weibo: !this.props.diary.weibo,
        })
    }

    handle_input_change(k, v) {
        this.props.action.set_duty_log({k, v})
    }

    render() {
        const {
            i18n: {
                t,
            },
            diary,
            duty: {
                data,
            },
            info: {
                avatar,
                name,
                jobCName,
                depCName,
            },
            navigation,
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                        handle_press: this.handle_goback.bind(this),
                    }}
                    center_option={{
                        text: t.keep_diary,
                    }}/>

                <Content>
                    <Loading visiable={this.state._fetch_loading}/>
                    {
                        // <View style={{height: 60, backgroundColor: 'white',}}>
                        //     <ScrollView contentContainerStyle={{paddingVertical: 20}} horizontal={true}>
                        //         <TouchableOpacity>
                        //             <View>
                        //                 <Text>{`${this.props.navigation.state.params.time.substring(5, 7)}${t.month}${this.props.navigation.state.params.time.substring(8, 10)}${t.date}`}</Text>
                        //             </View>
                        //         </TouchableOpacity>
                        //     </ScrollView>
                        // </View>
                    }


                    {
                        this.state.inited
                            ? <InputScrollView showsVerticalScrollIndicator={false}>
                                <View style={style.content_info}>
                                    <Text style={style.content_info_left}>
                                        {name}
                                    </Text>

                                    {
                                        this.props.navigation.state.params.time
                                            ? <View style={style.content_info_right}>
                                                <Text style={[style.content_info_right_text, style.right_text_bottom]}>
                                                    {jobCName}
                                                </Text>
                                                <Text style={style.content_info_right_text}>
                                                    {depCName}
                                                </Text>
                                            </View>
                                            : <View>
                                                <View style={style.row}>
                                                    <ScrollView
                                                        ref={el => this._scrollView = el}
                                                        style={style.scrollView}
                                                        contentContainerStyle={style.contentContainer}
                                                        showsVerticalScrollIndicator={true}
                                                        scrollEventThrottle={1}>

                                                    {
                                                        this.state.fix_dates[0]
                                                            ? <ModalDropdown
                                                                defaultIndex={0}
                                                                defaultValue={this.state.fix_dates[0]}
                                                                style={style.dropdown_3}
                                                                textStyle={{fontSize: 16, color: '#999'}}
                                                                options={this.state.fix_dates}
                                                                adjustFrame={style => this.dropdown(style)}
                                                                dropdownStyle={{height: 'auto',}}
                                                                dropdownTextStyle={style.dropdown_text_style}
                                                                dropdownTextHighlightStyle={style.dropdown_text_high_light}
                                                                onSelect={(k, v) => this.handle_dropdown(k, v)}/>
                                                            : null
                                                    }

                                                </ScrollView>
                                            </View>
                                        </View>
                                    }

                                </View>

                                <View  style={{padding: 20}}>
                                    <View style={style.content_time_wrap}>
                                        <Text style={style.content_time}>
                                             {t.on}{
                                                 this.props.navigation.state.params.time
                                                 ? this.props.navigation.state.params.time
                                                 : this.state.date
                                             }{t.work_product}
                                        </Text>
                                    </View>

                                    {
                                        R.addIndex(R.map)((v, k) => (
                                            <View key={k} style={style.content_duty}>
                                                <View style={style.content_duty_title}>
                                                    <Text style={style.content_duty_text}>
                                                        {`${t.duty}${k + 1}`}
                                                    </Text>
                                                    <Text style={style.content_duty_title_right}>
                                                        {v.relate_resp_weight}%
                                                    </Text>
                                                </View>

                                                <Text style={style.content_duty_caption}>
                                                    {v.relate_resp_cur_desc}
                                                </Text>

                                                <View style={style.text_input_wrap}>
                                                    <TextInput
                                                        maxLength={200}
                                                        style={style.text_input}
                                                        value={diary.duty_log[v.relate_resp_id]}
                                                        onChangeText={this.handle_input_change.bind(this, v.relate_resp_id)}
                                                        multiline= {true}
                                                        selectionColor='#BBBBBB'
                                                        underlineColorAndroid='transparent'
                                                        placeholder={t.recommended_input}
                                                        placeholderTextColor='#6BC1FF'/>
                                                </View>
                                            </View>
                                        ))(data)
                                    }

                                    <View  style={style.content_feel}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={style.content_duty_text}>{t.todays_experience_and_sharing}</Text>

                                            <TouchableWithoutFeedback onPress={this.handle_set_weibo.bind(this)}>
                                                <View style={style.feel_share}>
                                                    <View style={style.feel_share_point}>
                                                        <View style={[style.feel_share_drop_base,diary.weibo ? style.feel_share_drop_active : style.feel_share_drop]}/>
                                                    </View>
                                                    <Text style={diary.weibo ? style.feel_share_text_active : style.feel_share_text}>{t.check_send_to_micro_blog}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>

                                        <View style={style.text_input_wrap}>
                                            <TextInput
                                                value={diary.experience}
                                                onChangeText={v => this.props.action.set_experience(v)}
                                                maxLength={200}
                                                multiline= {true}
                                                style={style.text_input}
                                                selectionColor='#BBBBBB'
                                                underlineColorAndroid='transparent'
                                                placeholder={t.recommended_input_personal_experience}
                                                placeholderTextColor='#6BC1FF'/>
                                        </View>
                                    </View>

                                    <View  style={style.content_feel}>
                                        <Text style={style.content_duty_text}>{t.administrative_advice}</Text>

                                        <View style={style.text_input_wrap}>
                                            <TextInput
                                                value={diary.suggestion}
                                                onChangeText={v => this.props.action.set_suggestion(v)}
                                                maxLength={200}
                                                multiline= {true}
                                                style={style.text_input}
                                                selectionColor='#BBBBBB'
                                                underlineColorAndroid='transparent'
                                                placeholder={t.recommended_input_suggestions}
                                                placeholderTextColor='#6BC1FF'/>
                                        </View>
                                    </View>

                                    <View  style={style.content_feel}>
                                        <Text style={style.content_duty_text}>{t.tomorrow_work_plan}</Text>

                                        <View style={style.text_input_wrap}>
                                            <TextInput
                                                value={diary.plan}
                                                onChangeText={v => this.props.action.set_plan(v)}
                                                maxLength={200}
                                                multiline= {true}
                                                style={style.text_input}
                                                selectionColor='#BBBBBB'
                                                underlineColorAndroid='transparent'
                                                placeholder={t.recommended_input_plan}
                                                placeholderTextColor='#6BC1FF'/>
                                        </View>
                                    </View>

                                    <View style={style.content_feel}>
                                        <Text style={style.content_feel_text}>
                                            {t.todays_mood}
                                        </Text>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 0)}>
                                                <View style={[style.content_feel_base_wrap, this.state.feel === 0 ? style.content_so_bad_wrap_active : style.content_so_bad_wrap]}>
                                                    <Text style={[style.content_feel_base, this.state.feel === 0 ? style.content_active : style.content_so_bad]}>
                                                        {t.feel_so_bad}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 1)}>
                                                <View style={[style.content_feel_base_wrap, this.state.feel === 1 ? style.content_bad_wrap_active : style.content_bad_wrap]}>
                                                    <Text style={[style.content_feel_base, this.state.feel === 1 ? style.content_active : style.content_bad]}>
                                                        {t.feel_bad}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 2)}>
                                                <View style={[style.content_feel_base_wrap, this.state.feel === 2 ? style.content_normal_wrap_active : style.content_normal_wrap]}>
                                                    <Text style={[style.content_feel_base, this.state.feel === 2 ? style.content_active : style.content_normal]}>
                                                        {t.feel_so_so}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 3)}>
                                                <View style={[style.content_feel_base_wrap, this.state.feel === 3 ? style.content_good_wrap_active : style.content_good_wrap]}>
                                                    <Text style={[style.content_feel_base, this.state.feel === 3 ? style.content_active : style.content_good]}>
                                                        {t.feel_preferably}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 4)}>
                                                <View style={[style.content_feel_base_wrap, this.state.feel === 4 ? style.content_grade_wrap_active : style.content_grade_wrap]}>
                                                    <Text style={[style.content_feel_base, this.state.feel === 4 ? style.content_active : style.content_grade]}>
                                                        {t.feel_joyful}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    <View style={style.content_note}>
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
                                            marginTop: 80,
                                            marginBottom: 20,
                                        }}
                                        activeOpacity={.5}
                                        onPress={this.set_use_job.bind(this)}>
                                        <View style={style.push_wrap}>
                                            <Text style={style.push_text}>
                                                {t.submit}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </InputScrollView>
                            : null
                    }

                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        duty: state.User_duty,
        diary: state.Home_more_field_diary,
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_more_field_diary_set,
            user_duty_init,
            set_duty_log,
            diary_clean,
            set_experience,
            set_suggestion,
            set_plan,
        }, dispatch),
    })
)(Field_diary)

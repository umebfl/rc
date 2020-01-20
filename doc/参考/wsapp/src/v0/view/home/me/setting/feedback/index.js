import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, TouchableWithoutFeedback, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import InputScrollView from 'react-native-inputscrollview'
import DeviceInfo from 'react-native-device-info'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import Button from '../../../../../component/form/button/loading'
import toast from '../../../../../component/toast/normal'

import style from './style'

import {
    home_me_setting_feedback_type,
    setting_feedback_clean,
    feedback_suggest,
} from './reducer.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

const MSG_MAIL_FEEDBACK_PATH = '/msg/mail/feedback'

class Feedback extends Component {

    constructor(prop) {
      super(prop)

      this.state = {
          text: '',
          tip: prop.type.tip,
      }
    }

    handle_submit() {

        const device_info = 'UniqueID:  ' + DeviceInfo.getUniqueID() + '\n'
                                + 'Brand:  ' + DeviceInfo.getBrand() + '\n'
                                    + 'DeviceId:  ' + DeviceInfo.getDeviceId() + '\n'
                                        + 'UserAgent:  ' + DeviceInfo.getUserAgent() + '\n'
                                            + 'BundleId:  ' + DeviceInfo.getBundleId() + '\n'
                                                + 'App版本号:  ' + DeviceInfo.getVersion() + '\n'
                                                    + 'DeviceLocale:  ' + DeviceInfo.getDeviceLocale() + '\n'
                                                        + 'DeviceCountry:  ' + DeviceInfo.getDeviceCountry() + '\n'
                                                            + 'Timezone:  ' + DeviceInfo.getTimezone() + '\n'

        const {
            i18n: {
                t,
                lang,
            },
            info: {
                wsId,
                name,
                jobCName,
                depCName,
            },
        } = this.props

        const user_info = '工号：'+ wsId + '\n' + '姓名：' + name + '\n' + '职位：' + jobCName + '\n' + '部门：' + depCName + '\n' + 'App语言：' + lang

        const subject = R.cond([
            [
                R.equals(0),
                R.always(t.functional_feedback),
            ],
            [
                R.equals(1),
                R.always(t.program_error),
            ],
            [
                R.equals(2),
                R.always(t.experience_matters),
            ],
            [
                R.equals(3),
                R.always(t.other),
            ],
        ])(this.props.type.tip)

        if(subject == null) {
            toast(t.please_select_the_feedback_type, {position: 0})
        } else if(this.props.type.suggest.trim() == 0) {
            toast(t.please_input_your_suggestion, {position: 0})
        } else {
            _fetch({
                fetch_type: 'POST',
                path: MSG_MAIL_FEEDBACK_PATH,
                param: {
                    subject: subject,
                    text: this.props.type.suggest + '\n\n' + user_info + '\n\n' + device_info,
                },
                token: this.props.auth.info.token,
                lang: this.props.i18n.lang,
                success: rv => {
                    toast(t.submit_feedback_successfully, {position: 0})
                    this.props.action.setting_feedback_clean()
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

    handle_type_tip(v) {
        this.props.action.home_me_setting_feedback_type(this.props.type.tip === v ? null : v)

        this.setState({
            ...this.state,
            tip: this.props.type.tip === v ? null : v,
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
            type,
            navigation,
            info,
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.suggested_feedback,
                    }}/>

                <Content style={style.content}>
                    <InputScrollView style={{flex: 1, paddingLeft: 20,paddingRight: 20,}} showsVerticalScrollIndicator={false}>
                        <Text style={style.title}>
                            {t.feedback_type}
                        </Text>

                        <View style={style.tip}>
                            <TouchableWithoutFeedback onPress={this.handle_type_tip.bind(this, 0)}>
                                <View>
                                    <Text style={[style.tip_item_base, (this.state.tip === 0) ? style.tip_item_active : style.tip_item]}>
                                        {t.functional_feedback}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={this.handle_type_tip.bind(this, 1)}>
                                <View>
                                    <Text style={[style.tip_item_base, this.state.tip === 1 ? style.tip_item_active : style.tip_item]}>
                                        {t.program_error}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={this.handle_type_tip.bind(this, 2)}>
                                <View>
                                    <Text style={[style.tip_item_base, this.state.tip === 2 ? style.tip_item_active : style.tip_item]}>
                                        {t.experience_matters}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={this.handle_type_tip.bind(this, 3)}>
                                <View>
                                    <Text style={[style.tip_item_base, this.state.tip === 3 ? style.tip_item_active : style.tip_item]}>
                                        {t.other}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={style.text_input_wrap}>
                            <TextInput
                                autoFocus={true}
                                value={type.suggest}
                                onChangeText={v => this.props.action.feedback_suggest(v)}
                                multiline= {true}
                                maxLength= {200}
                                style={style.text_input}
                                selectionColor='#BBBBBB'
                                underlineColorAndroid='transparent'
                                placeholder={t.please_input_your_suggestion}
                                placeholderTextColor='#a6a6a6'/>
                        </View>

                        <Button
                            loading={this.state._fetch_loading}
                            handle_press={this.handle_submit.bind(this)}
                            text={t.submit}
                            container_style={{
                                height: 36,
                                borderRadius: 18,
                                marginTop: 20,
                            }}/>
                    </InputScrollView>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        type: state.Home_me_setting_feedback_type,
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_me_setting_feedback_type,
            setting_feedback_clean,
            feedback_suggest,
        }, dispatch),
    })
)(Feedback)

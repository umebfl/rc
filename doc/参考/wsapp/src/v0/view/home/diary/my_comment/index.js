import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import InputScrollView from 'react-native-inputscrollview'

import Header from '../../../../component/layout/header'
import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Com_toggle from '../../../../component/toggle/com_toggle'
import Text_toggle from '../../../../component/toggle/text_toggle'
import Loading from '../../../../component/loading/normal'
import conf from '../../../../../../conf.js'
import style from './style'
import Input from '../../../../component/form/input/normal'

import SRC_GD1 from '../../../../../../content/img/icon_comment/good1.png'
import SRC_GD2 from '../../../../../../content/img/icon_comment/good2.png'
import SRC_GD3 from '../../../../../../content/img/icon_comment/good3.png'
import SRC_GD4 from '../../../../../../content/img/icon_comment/good4.png'
import SRC_GD5 from '../../../../../../content/img/icon_comment/good5.png'
import SRC_GD1_ACTIVE from '../../../../../../content/img/icon_comment/good1_active.png'
import SRC_GD2_ACTIVE from '../../../../../../content/img/icon_comment/good2_active.png'
import SRC_GD3_ACTIVE from '../../../../../../content/img/icon_comment/good3_active.png'
import SRC_GD4_ACTIVE from '../../../../../../content/img/icon_comment/good4_active.png'
import SRC_GD5_ACTIVE from '../../../../../../content/img/icon_comment/good5_active.png'

import {
    home_diary_favorite_set_log_state,
} from '../favorite/reducer.js'
import {
    home_diary_manager_set_log_state,
} from '../manager/reducer.js'

import {
    _fetch,
} from '../../../../lib/fetch'

const EVALUATES_PATH = '/evaluates'
const LOGS_COMMENTS_PATH = '/logs/comments'
const max_len = 200

import {
    N_1,
    N_5,
    N_6,
    N_10,
    N_12,
    N_16,
    N_18,
    N_20,
    N_30,
    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_BLUE,
} from '../../../../theme/ume-theme/variable.js'

const textComment = R.cond([
    [
        R.equals(1),
        R.always('远低期望'),
    ],
    [
        R.equals(2),
        R.always('略低期望'),
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

class My_comment extends Component {
    constructor(props) {
      super(props)

      this.state = {
          text: '',
      }
    }

    // 更改状态
    set_evaluate() {
        const {
            id,
            row_index,
            type,
        } = this.props.navigation.state.params

        // 更新评价状态
        const param = {
            k: 'evaluate',
            v: 1,
            row_index: parseInt(row_index),
        }

        // 成功修改已读状态
        if(type === 'manager') {
            this.props.action.home_diary_manager_set_log_state(param)
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

    handle_evaluates_submit() {
        const {
            i18n: {
                t,
            },
        } = this.props

        if(textComment(this.props.toggle.change) == null) {
            toast(t.select_the_score_value, {position: 0})
        } else if((this.props.toggle.change == 1 || this.props.toggle.change == 5) && this.state.text.trim().length == 0) {
            toast(t.input_suggestion, {position: 0})
        } else {
            _fetch({
                fetch_type: 'POST',
                path: EVALUATES_PATH,
                param: {
                    logId: this.props.navigation.state.params.logId,
                    value: this.props.toggle.change,
                    comment: this.state.text,
                    hasProject: 0,
                },
                token: this.props.auth.info.token,
                lang: this.props.i18n.lang,
                success: rv => {
                    this.set_evaluate()
                    this.props.navigation.state.params.handle_flush()
                    this.props.navigation.state.params.handle_next_page()
                    // 跳到评价记录页
                    this.props.navigation.goBack()
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
                     logId: this.props.navigation.state.params.logId,
                     comment: this.state.text,
                 },
                 token: this.props.auth.info.token,
                 lang: this.props.i18n.lang,
                 success: rv => {
                     this.set_evaluate()
                     this.props.navigation.state.params.handle_flush()
                     this.props.navigation.state.params.handle_next_page()
                     // 跳到评价记录页
                     this.props.navigation.goBack()
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

    handle_goback() {
        this.props.navigation.state.params.goback && this.props.navigation.state.params.goback()
    }

    render() {
        const {
            i18n: {
                t,
            },
            auth,
            info: {
                avatar,
            },
            toggle,
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
                        text: this.props.navigation.state.params.evaluate_max < 3 && this.props.navigation.state.params.type === 'manager' ? t.evaluation : t.message,
                    }}/>

                <Content>
                    <Loading visiable={this.state._fetch_loading}/>
                    <InputScrollView style={{paddingLeft: N_20, paddingRight: N_20, flex: 1,}} showsVerticalScrollIndicator={false}>
                        {
                            this.props.navigation.state.params.evaluate_max < 3 && this.props.navigation.state.params.type === 'manager'
                            ? <View style={{flex: 1}}>
                                <Text style={{
                                        paddingTop: N_20,
                                        paddingBottom: N_20,
                                        fontSize: N_16,
                                        color: COLOR_GRAY_XD,
                                        fontWeight: 'bold',
                                    }}>
                                    {t.overall_evaluation}
                                </Text>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
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

                                <TextInput
                                    maxLength={200}
                                    style={style.text_input}
                                    selectionColor='#BBBBBB'
                                    underlineColorAndroid='transparent'
                                    placeholder={t.input_evaluate}
                                    placeholderTextColor='#cccccc'
                                    value={this.state.text}
                                    onChangeText={this.handle_textarea_change.bind(this)}
                                    multiline={true}
                                    autoFocus={true}/>

                                <TouchableOpacity activeOpacity={.5} onPress={this.handle_evaluates_submit.bind(this)}>
                                    <View style={style.push_wrap}>
                                        <Text style={style.push_text}>
                                            {
                                                this.props.navigation.state.params.log_index === this.props.navigation.state.params.log_len - 1
                                                    ? t.submit_to_goback
                                                    : t.submit_to_the_next_article
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : <View>
                                <TextInput
                                    maxLength={200}
                                    style={style.text_input}
                                    selectionColor='#BBBBBB'
                                    placeholder={t.input_message}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    value={this.state.text}
                                    onChangeText={this.handle_textarea_change.bind(this)}
                                    multiline= {true}
                                    autoFocus={true}/>

                                <TouchableOpacity activeOpacity={.5} onPress={this.handle_comments_submit.bind(this)}>
                                    <View style={style.push_wrap}>
                                        <Text style={style.push_text}>
                                            {
                                                this.props.navigation.state.params.log_index === this.props.navigation.state.params.log_len - 1
                                                    ? t.submit_to_goback
                                                    : t.submit_to_the_next_article
                                            }

                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }

                    </InputScrollView>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        toggle: state.Component_toggle,
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
        component_toggle: state.Component_toggle,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_diary_manager_set_log_state,
            home_diary_favorite_set_log_state,
        }, dispatch),
    })
)(My_comment)

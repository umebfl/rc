import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ScrollView, TouchableOpacity} from 'react-native'
import moment from 'moment'

import Container from '../../../component/layout/container'
import Content from '../../../component/layout/content'
import Header from '../../../component/layout/header'
import Divider_list from '../../../component/list/divider_list'
import Img from '../../../component/element/img/normal'

import Weather from './weather'

import style from './style'

import SRC_OA from '../../../../../content/img/icon/oa.png'
import SRC_NOTICE from '../../../../../content/img/icon/notice.png'
import SRC_TODO from '../../../../../content/img/icon/todo.png'
import SRC_BILLBOARD from '../../../../../content/img/icon/billboard.png'
import SRC_EVECTION from '../../../../../content/img/icon/evection.png'
import SRC_KEEP_DAIRY from '../../../../../content/img/icon/keep_dairy.png'

import conf from '../../../../../conf.js'

import {
    CEO_TYPE,
} from '../../../reducer/user/role'

import {
    N_26,
    N_30,
} from '../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../lib/fetch'

import * as reducer from './reducer'

const CHECK_FIELD_OPERATION_PATH = '/attend/authentication'

import {
    DIARY_MANAGER,
} from '../../../reducer/user/role'

class Homepage extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            field_inited: false,
            fix_data: [],
            date: '',
        }
    }

    componentDidMount() {
        this.props.action.homepage_get_oa_count()
        this.props.action.homepage_get_msg_count()

        this.get_date()
    }

    componentWillUnMount() {
        clearTimeout(this.timer)
    }

    get_date() {
        this.setState({
            ...this.state,
            date: `${moment().format('ll')} ${moment().format('dddd')}`,
        })

        this.timer = setTimeout(() => {
            this.get_date()
        }, 5 * 60 * 1000)
    }

    render() {
        const {
            i18n: {
                t,
            },
            homepage: {
                msg_count_text,
                oa_count_text,
            },
            info: {
                name,
                avatar,
                jobCName,
                depCName,
            },
            role: {
                type,
            },
            navigation,
        } = this.props

        return (
            <Container>
                <Content style={style.content}>
                    <View style={style.date_wrap}>
                        <Text style={style.date_wrap_text}>{this.state.date}</Text>
                        <Weather/>
                    </View>

                    <View style={style.info_wrap}>
                        <Img
                            width={50}
                            src={avatar} />

                        <View style={style.info_wrap_msg}>
                            <Text style={style.info_wrap_name}>{name}</Text>
                            <Text style={style.info_wrap_jobcn}>{jobCName}</Text>
                        </View>
                    </View>

                    <View style={style.msg_wrap}>

                        <View>
                            {
                                oa_count_text
                                    ? <View style={oa_count_text < 10 ? style.point_small_wrap : style.point_wrap}>
                                        <Text style={style.item_point_text}>{oa_count_text}</Text>
                                    </View>
                                    : null
                            }
                            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_dynamic_todo')}>
                                <View style={style.msg_item}>
                                    <View  style={style.msg_img_wrap}>
                                        <Image source={SRC_OA} style={style.msg_img}/>
                                    </View>

                                    <Text style={style.msg_item_text}>OA</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View>
                            {
                                msg_count_text
                                    ? <View style={msg_count_text < 10 ? style.point_small_wrap : style.point_wrap}>
                                        <Text style={style.item_point_text}>{msg_count_text}</Text>
                                    </View>
                                    : null
                            }
                            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_homepage_message')}>
                                <View style={style.msg_item}>
                                    <View  style={style.msg_img_wrap}>
                                        <Image source={SRC_NOTICE} style={style.msg_img}/>
                                    </View>

                                    <Text style={style.msg_item_text}>{t.news}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            {
                                // <View style={style.point_wrap}>
                                //     <Text style={style.item_point_text}>99</Text>
                                // </View>
                            }
                            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_dynamic_notice')}>
                                <View style={style.msg_item}>
                                    <View  style={[style.msg_img_wrap, style.todo_bg]}>
                                        <Image source={SRC_TODO} style={style.msg_img}/>
                                    </View>

                                    <Text style={style.msg_item_text}>{t.notice}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_dynamic_billboard')}>
                            <View style={style.msg_item}>
                                <View  style={[style.msg_img_wrap, style.billboard]}>
                                    <Image source={SRC_BILLBOARD} style={style.msg_img}/>
                                </View>

                                <Text style={style.msg_item_text}>{t.billboard}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_more_field')}>
                            <View style={style.msg_item}>
                                <View  style={style.msg_img_wrap}>
                                    <Image source={SRC_EVECTION} style={style.msg_img}/>
                                </View>

                                <Text style={style.msg_item_text}>{t.field_worker}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_more_field_keep_diary')}>
                            <View style={style.msg_item}>
                                <View  style={style.msg_img_wrap}>
                                    <Image source={SRC_KEEP_DAIRY} style={style.msg_img}/>
                                </View>

                                <Text style={style.msg_item_text}>{t.keep_diary}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        homepage: state.Homepage,
        info: state.User_info,
        i18n: state.I18n,
        auth: state.Auth,
        role: state.User_role,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(Homepage)

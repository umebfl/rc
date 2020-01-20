import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Button, TouchableWithoutFeedback} from 'react-native'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import Loading from '../../../../../component/loading/normal'
import conf from '../../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../../theme/ume-theme'
import * as variable from '../../../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

import Img from '../../../../../component/element/img/normal'

const SRC_LIKE = require('../../../../../../../content/img/icon_list/like.png')
const SRC_LIKE_GRAY = require('../../../../../../../content/img/icon_list/like_gray.png')
const SRC_TOP1_3 = require('../../../../../../../content/img/icon_list/top1-3.png')
const SRC_TOP2_3 = require('../../../../../../../content/img/icon_list/top2-3.png')
const SRC_TOP3_3 = require('../../../../../../../content/img/icon_list/top3-3.png')
const SRC_COMMENT = require('../../../../../../../content/img/icon_list/comment.png')

import {
    rank_list_detail_init,
    rank_list_detail_set_like,
    rank_list_detail_set_has_like,
} from './reducer.js'

// 榜单列表数据url
const DATA_PATH = '/analytics/wos/rank'
const SET_LINK_PATH = '/analytics/wos/rank/detail/set_link'
const RANK_LIKES_PATH = '/analytics/wos/rank/likes'

import {
    ABS_d5,
    N_10,
    N_12,
    N_14,
    N_16,
    N_18,
    N_20,
    N_22,
    N_25,
    COLOR_BLUE,
    COLOR_GRAY,
    COLOR_GRAY_XL,

    BORDER_WIDTH,
    BORDER_COLOR,
} from '../../../../../theme/ume-theme/variable.js'

const SHOW_NUM = 10
const LANG_EN = 'en'
const LANG_ZHCN = 'zh-CN'

const get_list_icon = i => {
    if(i === 0){
        return SRC_TOP1_3
    }else if(i === 1){
        return SRC_TOP2_3
    }else if(i === 2){
        return SRC_TOP3_3
    }
}

class List_detail extends Component {

    constructor(prop) {
        super(prop)
        this.state = {}
    }

    componentDidMount() {
        this.init()
    }

    init() {
        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                showNum: SHOW_NUM,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.rank_list_detail_init(rv)
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    handle_like_press(v, k){
        _fetch({
            fetch_type: 'POST',
            path: RANK_LIKES_PATH,
            param: {
                type: this.props.navigation.state.params.type,
                employeeId: v,
                currentEmployeeId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.rank_list_detail_set_has_like({type: this.props.navigation.state.params.type, k: k, v: rv})
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    handle_item_press(v) {
        // TODO: 待实现
        // 提交请求
        // this.props.action.rank_list_detail_set_like({
        //     fetch_type: 'GET',
        //     path: SET_LINK_PATH,
        //     param: {
        //         id: v,
        //     },
        //     token: this.props.auth.info.token,
        // })
    }

    render() {
        const {
            i18n: {
                t,
                lang,
            },
            rank_list_detail,
            navigation: {
                navigate,
                state: {
                    params: {
                        type,
                    },
                },
            },
        } = this.props

        const type_name = R.cond([
            [
                R.equals('attendance'),
                R.always(t.attendance),
            ],
            [
                R.equals('job_evaluate'),
                R.always(t.job_evaluate),
            ],
            [
                R.equals('job_log'),
                R.always(t.job_log),
            ],
            [
                R.equals('oa_process'),
                R.always(t.oa_process),
            ],
            [
                R.equals('oa_time'),
                R.always(t.oa_time),
            ],
            [
                R.equals('project'),
                R.always(t.project),
            ],
            [
                R.equals('weibo'),
                R.always(t.weibo),
            ],
        ])(type)

        return (
            <Container>
                <Header
                    container_option={{
                        style: {
                            backgroundColor: 'rgba(255, 255, 255, .5)',
                        },
                    }}
                    left_option={{
                        show_goback: true,
                        navigation: this.props.navigation,
                    }}
                    center_option={{
                        text: type_name,
                        text_style: {
                            fontSize: lang === LANG_EN ? N_14 : N_18,
                        }
                    }}/>

                <Content>
                    <Loading visiable={this.state._fetch_loading}/>

                    <ScrollView showsVerticalScrollIndicator={false} >
                        {
                            R.compose(
                                R.addIndex(R.map)(
                                    (v, k) => (

                                        <View
                                            key={k}
                                            style={{
                                            paddingBottom: N_12,
                                            paddingTop: N_12,
                                            paddingRight: N_20,
                                            paddingLeft: N_20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderBottomWidth: BORDER_WIDTH,
                                            borderBottomColor: BORDER_COLOR,
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                {
                                                    k > 2
                                                    ? k > 8
                                                        ? <View
                                                            style={{
                                                                width: 35,
                                                            }}>
                                                            <Text style={{
                                                                // paddingRight: 8,
                                                                // paddingLeft: 20,
                                                                fontSize: 20,
                                                                color: COLOR_GRAY,
                                                                textAlign: 'left',
                                                            }}>{k+1}</Text>
                                                        </View>
                                                        : <View
                                                            style={{
                                                                width: 35,
                                                            }}>
                                                            <Text style={{
                                                                // paddingRight: 8,
                                                                paddingLeft: 6,
                                                                fontSize: 20,
                                                                color: COLOR_GRAY,
                                                                textAlign: 'left',
                                                            }}>{k+1}</Text>
                                                        </View>
                                                    : <Image source={get_list_icon(k)} style={{width: 22.5, height: 24, marginRight: 6,}}/>
                                                }

                                                <TouchableOpacity onPress={() => navigate('home_more_addressbook_personal_details', {id: v.ws_id})} activeOpacity={.5}>
                                                    <Img
                                                        width={variable.N_50}
                                                        style={style.avatar_img}
                                                        src={v.avatar}/>
                                                </TouchableOpacity>

                                                <View>
                                                    <Text style={{
                                                        fontSize: N_16,
                                                        color: v.has_like
                                                                    ? COLOR_BLUE
                                                                    : COLOR_GRAY
                                                    }}>{v.name}</Text>
                                                </View>
                                            </View>

                                            <TouchableOpacity onPress={() => {this.handle_like_press(v.ws_id, k)}} activeOpacity={.5}>
                                                <View
                                                    style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    }}>
                                                    <Image
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                        }}
                                                        source={v.has_like
                                                                ? SRC_LIKE
                                                                : SRC_LIKE_GRAY}/>

                                                    <View style={{
                                                        width: 30,
                                                    }}>
                                                        <Text style={{
                                                            fontSize: N_16,
                                                            color: v.has_like
                                                                      ? COLOR_BLUE
                                                                      : COLOR_GRAY,
                                                            textAlign: 'center',
                                                        }}>{v.like_count}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                ),
                                R.values
                            )(rank_list_detail.data ? rank_list_detail.data[type].list : [])
                        }
                    </ScrollView>
                </Content>

            </Container>
        )
    }
}

export default connect(
    state => ({
        rank_list_detail: state.Rank_list_detail,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({
            rank_list_detail_init,
            rank_list_detail_set_like,
            rank_list_detail_set_has_like,
        }, dispatch),
    })
)(List_detail)

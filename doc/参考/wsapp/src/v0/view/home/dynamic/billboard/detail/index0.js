import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Button} from 'react-native'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import Loading from '../../../../../component/loading/normal'
import conf from '../../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../../theme/ume-theme'

import {
    _fetch,
} from '../../../../../lib/fetch'

const SRC_BG_2 = require('../../../../../../../content/img/icon_list/bg_2.jpg')
const SRC_LIKE = require('../../../../../../../content/img/icon_list/like.png')
const SRC_LIKE_GRAY = require('../../../../../../../content/img/icon_list/like_gray.png')
const SRC_P1 = require('../../../../../../../content/img/icon_list/p1.png')
const SRC_P2 = require('../../../../../../../content/img/icon_list/p2.png')
const SRC_P3 = require('../../../../../../../content/img/icon_list/p3.png')
const SRC_COMMENT = require('../../../../../../../content/img/icon_list/comment.png')
const SRC_DEFAULT = require('../../../../../../../content/img/icon/default.jpg')

import {
    LIST_RANK_RED_FIRST,
    LIST_RANK_RED_SECOND,
    LIST_RANK_RED_THIRD,
    COLOR_GRAY_XL,
} from '../../../../../theme/ume-theme/variable.js'

import {
    rank_list_detail_init,
    rank_list_detail_set_like,
} from './reducer.js'

// 榜单列表数据url
const DATA_PATH = '/analytics/wos/rank'
const SET_LINK_PATH = '/analytics/wos/rank/detail/set_link'

import {
    ABS_d5,
    N_10,
    N_14,
    N_16,
    N_20,
    N_22,
    N_25,
    COLOR_GRAY_L,
} from '../../../../../theme/ume-theme/variable.js'

const SHOW_NUM = 10

const get_icon_bg_color = i => {
    if(i === 0){
        return LIST_RANK_RED_FIRST
    }else if(i === 1){
        return LIST_RANK_RED_SECOND
    }else if(i === 2){
        return LIST_RANK_RED_THIRD
    }else{
        return COLOR_GRAY_XL
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
                R.always('劳动积极分子'),
            ],
            [
                R.equals('job_evaluate'),
                R.always('日志评价达人'),
            ],
            [
                R.equals('job_log'),
                R.always('最受赏识下属'),
            ],
            [
                R.equals('oa_process'),
                R.always('OA决策达人'),
            ],
            [
                R.equals('oa_time'),
                R.always('OA处理快手'),
            ],
            [
                R.equals('project'),
                R.always('项目参与红人'),
            ],
            [
                R.equals('weibo'),
                R.always('微博活跃分子'),
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
                        text: type_name,
                    }}/>

                <Content>
                    <Loading visiable={this.state._fetch_loading}/>

                    <View style={{
                        padding: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: .5,
                        borderBottomColor: COLOR_GRAY_L,
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image source={SRC_P3}/>

                            <Image
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    marginRight: 10,
                                    marginLeft: 10,
                                }}
                                source={SRC_DEFAULT}/>

                            <View>
                                <Text>123456</Text>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={.5}>
                            <View
                                style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                }}>
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={SRC_LIKE_GRAY}/>
                                <Text>99</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={style.content}>
                            {
                                    R.compose(
                                        R.addIndex(R.map)(
                                            (v, k) => (
                                                <View key={k} style={style.content_list}>
                                                    <View style={style.content_list_rank}>
                                                        <View style={{
                                                            ...style.content_list_num_wrap,
                                                            backgroundColor: get_icon_bg_color(k)}}>
                                                            <Text style={{
                                                                ...style.content_list_num_text,
                                                            }}>
                                                                {k + 1}
                                                            </Text>
                                                        </View>

                                                        <Text style={style.content_list_name}>
                                                            {v.name}
                                                        </Text>

                                                    </View>

                                                    <View style={style.content_list_rank}>
                                                        <TouchableOpacity style={style.content_list_item} onPress={this.handle_item_press.bind(this, v.ws_id)}>
                                                            <Image source={SRC_LIKE} style={style.icon_size}/>
                                                            <Text style={style.content_list_item_amount}>
                                                                {v.like_count}
                                                            </Text>
                                                        </TouchableOpacity>

                                                        {
                                                            // TODO: 移除评论
                                                            // <TouchableOpacity style={style.content_list_item} onPress={() => navigate('home_dynamic_billboard_m_comment')}>
                                                            //     <Image source={SRC_COMMENT} style={style.icon_size}/>
                                                            //     <Text style={{paddingLeft: 5, paddingRight: 0, width: 35}}>
                                                            //         {v.review_count}
                                                            //     </Text>
                                                            // </TouchableOpacity>
                                                        }
                                                   </View>
                                                </View>
                                            )
                                        ),
                                        R.values
                                    )(rank_list_detail.data ? rank_list_detail.data[type].list : [])
                                }
                        </View>
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
        }, dispatch),
    })
)(List_detail)

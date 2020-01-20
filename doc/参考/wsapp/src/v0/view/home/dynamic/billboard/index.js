import R from 'ramda'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    Text,
    Image,
    View,
    ScrollView,
    ListView,
    RefreshControl,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'

import Content from '../../../../component/layout/content'
import Container from '../../../../component/layout/container'
import Header from '../../../../component/layout/header'
import Loading from '../../../../component/loading/normal'
import conf from '../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../theme/ume-theme'

import { rank_list_init } from './reducer.js'

import Img, {
    WIDTH_LG,
} from '../../../../component/element/img/normal'

import {
    _fetch,
} from '../../../../lib/fetch'

// 榜单列表数据url
const DATA_PATH = '/analytics/wos/rank'

const SRC_ARROW_RIGHT = require('../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_LIKE_GRAY = require('../../../../../../content/img/icon_list/like_gray.png')
const SRC_COMMENT = require('../../../../../../content/img/icon_list/comment.png')
const SRC_TOP1 = require('../../../../../../content/img/icon_list/top1.png')
const SRC_TOP2 = require('../../../../../../content/img/icon_list/top2.png')
const SRC_TOP3 = require('../../../../../../content/img/icon_list/top3.png')

const SHOW_NUM = 3

import {
    ABS_d5,
    N_5,
    N_10,
    N_12,
    N_14,
    N_16,
    N_18,
    N_20,
    N_22,
    N_25,
    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_XL,
    COLOR_MAIN,
    BORDER_COLOR,
    BORDER_WIDTH,
} from '../../../../theme/ume-theme/variable.js'

class List extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            _fetch_loading: false,
        }
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
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
                this.props.action.rank_list_init(rv)
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
            rank_list,
            navigation,
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        // text: t.home,
                        // icon_touchable: {
                        //     marginLeft: N_10,
                        // },
                        // text_style: {
                        //     color: COLOR_GRAY,
                        // },
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.billboard,
                    }}/>
                <Content>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                onRefresh={this.init.bind(this)}
                                refreshing={this.state._fetch_loading}
                                tintColor={COLOR_MAIN}
                                title={t.drop_refresh_data} />
                        }
                        enableEmptySections={true}
                        renderRow={
                            v => (
                                <View
                                    key={v[0]}
                                    style={{
                                        flex: 1,
                                        borderBottomWidth: BORDER_WIDTH,
                                        borderBottomColor: BORDER_COLOR,
                                        paddingBottom: N_10,
                                        height: 180,
                                    }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        paddingBottom: N_10,
                                        paddingTop: N_12,
                                        paddingRight: N_20,
                                        paddingLeft: N_20,
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                        }}>
                                            <View style={{
                                                width: 4,
                                                height: N_18,
                                                backgroundColor: '#3DA8F5',
                                                marginRight: N_10,
                                            }} />

                                            <View>
                                                {
                                                    R.cond([
                                                        [
                                                            R.equals('project'),
                                                            R.always(<Text style={{
                                                                color: COLOR_GRAY_XD,
                                                                fontSize: N_16,
                                                                height: N_16,
                                                                lineHeight: N_16,
                                                            }}>
                                                                {t.project}
                                                        </Text>),
                                                        ],
                                                        [
                                                            R.equals('job_log'),
                                                            R.always(<Text style={{
                                                                color: COLOR_GRAY_XD,
                                                                fontSize: N_16,
                                                                height: N_16,
                                                                lineHeight: N_16,
                                                            }}>
                                                                {t.job_log}
                                                        </Text>),
                                                        ],
                                                        [
                                                            R.equals('job_evaluate'),
                                                            R.always(<Text style={{
                                                                color: COLOR_GRAY_XD,
                                                                fontSize: N_16,
                                                                height: N_16,
                                                                lineHeight: N_16,
                                                            }}>
                                                                {t.job_evaluate}
                                                        </Text>),
                                                        ],
                                                        [
                                                            R.equals('weibo'),
                                                            R.always(<Text style={{
                                                                color: COLOR_GRAY_XD,
                                                                fontSize: N_16,
                                                                height: N_16,
                                                                lineHeight: N_16,
                                                            }}>
                                                                {t.weibo}
                                                        </Text>),
                                                        ],
                                                        [
                                                            R.equals('attendance'),
                                                            R.always(
                                                                <Text style={{
                                                                    color: COLOR_GRAY_XD,
                                                                    fontSize: N_16,
                                                                    height: N_16,
                                                                    lineHeight: N_16,
                                                                }}>
                                                                    {t.attendance}
                                                            </Text>),
                                                        ],
                                                        [
                                                            R.equals('oa_time'),
                                                            R.always(<Text style={{
                                                                color: COLOR_GRAY_XD,
                                                                fontSize: N_16,
                                                                height: N_16,
                                                                lineHeight: N_16,
                                                            }}>
                                                                {t.oa_time}
                                                        </Text>),
                                                        ],
                                                        [
                                                            R.equals('oa_process'),
                                                            R.always(<Text style={{
                                                                color: COLOR_GRAY_XD,
                                                                fontSize: N_16,
                                                                height: N_16,
                                                                lineHeight: N_16,
                                                            }}>
                                                                {t.oa_process}
                                                        </Text>),
                                                        ],
                                                    ])(v[0])
                                                }
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => navigation.navigate('home_dynamic_billboard_detail', { type: v[0] })} activeOpacity={.5}>
                                            <View style={{
                                                flexDirection: 'row',
                                            }}>
                                                <View>
                                                    <Text style={{ color: COLOR_GRAY, fontSize: N_14, }}>{t.more}</Text>
                                                </View>

                                                <Image source={SRC_ARROW_RIGHT} style={[style.icon_size, style.content_list_arrow]} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'flex-end',
                                        paddingLeft: N_20,
                                        paddingRight: N_20,
                                    }}>
                                        <View>
                                            <Img
                                                width={58}
                                                style={{
                                                    position: 'absolute',
                                                    top: 2.7,
                                                    left: 2.6,
                                                }}
                                                src={v[1].list[1].avatar} />

                                            <TouchableWithoutFeedback onPress={() => navigation.navigate('home_more_addressbook_personal_details', { id: v[1].list[1].ws_id })}>
                                                <Image source={SRC_TOP2} style={style.background_Img_2st} />
                                            </TouchableWithoutFeedback>
                                            <View>
                                                <Text style={{
                                                    fontSize: N_14,
                                                    color: COLOR_GRAY_D,
                                                    marginTop: N_10,
                                                    textAlign: 'center'
                                                }}>
                                                    {v[1].list[1].name}
                                                </Text>
                                            </View>
                                        </View>

                                        <View>
                                            <Img
                                                width={86}
                                                style={{
                                                    position: 'absolute',
                                                    top: 3,
                                                    left: 14.2,
                                                }}
                                                src={v[1].list[0].avatar} />

                                            <TouchableWithoutFeedback onPress={() => navigation.navigate('home_more_addressbook_personal_details', { id: v[1].list[0].ws_id })}>
                                                <Image source={SRC_TOP1} style={style.background_Img_1st} />
                                            </TouchableWithoutFeedback>

                                            <View>
                                                <Text style={{
                                                    fontSize: N_14,
                                                    color: COLOR_GRAY_D,
                                                    marginTop: N_10,
                                                    textAlign: 'center'
                                                }}>
                                                    {v[1].list[0].name}
                                                </Text>
                                            </View>
                                        </View>

                                        <View>
                                            <Img
                                                width={58}
                                                style={{
                                                    position: 'absolute',
                                                    top: 3,
                                                    left: 2.6,
                                                }}
                                                src={v[1].list[2].avatar} />

                                            <TouchableWithoutFeedback onPress={() => navigation.navigate('home_more_addressbook_personal_details', { id: v[1].list[2].ws_id })}>
                                                <Image source={SRC_TOP3} style={style.background_Img_2st} />
                                            </TouchableWithoutFeedback>
                                            <View>
                                                <Text style={{
                                                    fontSize: N_14,
                                                    color: COLOR_GRAY_D,
                                                    marginTop: N_10,
                                                    textAlign: 'center'
                                                }}>
                                                    {v[1].list[2].name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        dataSource={this.ds.cloneWithRows(R.toPairs(rank_list.data))}>
                    </ListView>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        rank_list: state.Rank_list,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({ rank_list_init }, dispatch),
    })
)(List)

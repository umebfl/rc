import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import Content from '../../../../component/layout/content'
import Container from '../../../../component/layout/container'
import Loading from '../../../../component/loading/normal'
import conf from '../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../theme/ume-theme'

import {rank_list_init} from './reducer.js'

import {
    _fetch,
} from '../../../../lib/fetch'

// 榜单列表数据url
const DATA_PATH = '/analytics/wos/rank'

const SRC_DEFAULT = require('../../../../../../content/img/icon/default.jpg')
const SRC_ARROW_RIGHT = require('../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_BG_1 = require('../../../../../../content/img/icon_list/bg_1.jpg')
const SRC_BG_2 = require('../../../../../../content/img/icon_list/bg_2.jpg')
const SRC_BG_3 = require('../../../../../../content/img/icon_list/bg_3.jpg')
const SRC_BG_4 = require('../../../../../../content/img/icon_list/bg_4.jpg')
const SRC_BG_5 = require('../../../../../../content/img/icon_list/bg_5.jpg')
const SRC_BG_6 = require('../../../../../../content/img/icon_list/bg_6.jpg')
const SRC_BG_7 = require('../../../../../../content/img/icon_list/bg_7.jpg')
const SRC_LIKE_GRAY = require('../../../../../../content/img/icon_list/like_gray.png')
const SRC_COMMENT = require('../../../../../../content/img/icon_list/comment.png')
const SRC_1st = require('../../../../../../content/img/icon_list/1st.png')
const SRC_2nd = require('../../../../../../content/img/icon_list/2nd.png')
const SRC_3rd = require('../../../../../../content/img/icon_list/3rd.png')

const SHOW_NUM = 3

import {
    ABS_d5,
    N_10,
    N_14,
    N_16,
    N_20,
    N_22,
    N_25,
    COLOR_GRAY_XD,
} from '../../../../theme/ume-theme/variable.js'

class List extends Component {

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
            navigation: {
                navigate,
            },
        } = this.props

        return (
            <Content style={{
                paddingTop: 0,
            }}>
                <Loading visiable={this.state._fetch_loading}/>

                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 20,
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                width: 4,
                                height: N_16,
                                backgroundColor: '#3DA8F5',
                                marginRight: N_10,
                            }}/>

                            <View>
                                <Text style={{
                                    color: COLOR_GRAY_XD,
                                    fontSize: N_16,
                                    height: N_16,
                                    lineHeight: N_16,
                                }}>
                                    最受赏识下属
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View>
                                    <Text>更多</Text>
                                </View>

                                <Image source={SRC_ARROW_RIGHT} style={[style.icon_size, style.content_list_arrow]}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <View>
                            <Image source={SRC_2nd} style={style.background_Img_2st}/>
                            <Image source={SRC_DEFAULT} style={{
                                width: 192 * .4,
                                height: 190 * .4,
                                borderRadius: 96 * .4,
                                position: 'absolute',
                                top: 116 * .4,
                                left: 6 * .4,
                            }}/>
                        </View>

                        <View>
                            <Image source={SRC_1st} style={style.background_Img_1st}/>
                            <Image source={SRC_DEFAULT} style={{
                                width: 218 * .4,
                                height: 218 * .4,
                                borderRadius: 109 * .4,
                                position: 'absolute',
                                top: 96 * .4,
                                left: 48 * .4,
                            }}/>
                        </View>

                        <View>
                            <Image source={SRC_3rd} style={style.background_Img_2st}/>
                            <Image source={SRC_DEFAULT} style={{
                                width: 192 * .4,
                                height: 190 * .4,
                                borderRadius: 96 * .4,
                                position: 'absolute',
                                top: 116 * .4,
                                left: 6 * .4,
                            }}/>
                        </View>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        R.compose(
                            R.map(v => (
                                <TouchableOpacity key={v[0]} onPress={() => navigate('home_dynamic_billboard_detail', {type: v[0]})} activeOpacity={.5}>
                                    <View style={style.content}>

                                        {
                                            R.cond([
                                                [
                                                    R.equals('attendance'),
                                                    R.always(
                                                        <View>
                                                            <Image source={SRC_BG_1} style={style.content_bg}/>

                                                            <Text style={{
                                                                position: 'absolute',
                                                                top: 40,
                                                                left: 35,
                                                                color: 'white',
                                                                fontSize: 12,
                                                            }}>劳动积极分子</Text>
                                                        </View>),
                                                ],
                                                [
                                                    R.equals('job_evaluate'),
                                                    R.always(<Image source={SRC_BG_2} style={{
                                                        margin: 20,
                                                        width: 100,
                                                        height: 80,
                                                    }}/>),
                                                ],
                                                [
                                                    R.equals('job_log'),
                                                    R.always(<Image source={SRC_BG_3} style={style.content_bg}/>),
                                                ],
                                                [
                                                    R.equals('oa_process'),
                                                    R.always(<Image source={SRC_BG_4} style={style.content_bg}/>),
                                                ],
                                                [
                                                    R.equals('oa_time'),
                                                    R.always(<Image source={SRC_BG_5} style={style.content_bg}/>),
                                                ],
                                                [
                                                    R.equals('project'),
                                                    R.always(<Image source={SRC_BG_6} style={style.content_bg}/>),
                                                ],
                                                [
                                                    R.equals('weibo'),
                                                    R.always(<Image source={SRC_BG_7} style={style.content_bg}/>),
                                                ],
                                            ])(v[0])
                                        }



                                        <View style={style.content_list}>
                                            <View style={{
                                                    paddingBottom: 10,
                                                    flex: 1}}>
                                                    {
                                                        R.cond([
                                                            [
                                                                R.equals('attendance'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>劳动积极分子</Text>),
                                                            ],
                                                            [
                                                                R.equals('job_evaluate'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>日志评价达人</Text>),
                                                            ],
                                                            [
                                                                R.equals('job_log'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>最受赏识下属</Text>),
                                                            ],
                                                            [
                                                                R.equals('oa_process'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>OA决策达人</Text>),
                                                            ],
                                                            [
                                                                R.equals('oa_time'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>OA处理快手</Text>),
                                                            ],
                                                            [
                                                                R.equals('project'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>项目参与红人</Text>),
                                                            ],
                                                            [
                                                                R.equals('weibo'),
                                                                R.always(<Text style={{paddingBottom: 5, color: '#202020'}}>微博活跃分子</Text>),
                                                            ],
                                                        ])(v[0])
                                                    }
                                                {
                                                    R.compose(
                                                        R.addIndex(R.map)(
                                                            (item, k) => (
                                                                <View key={k} style={style.content_list_item}>
                                                                   <Text style={style.content_list_item_name}>
                                                                       {k + 1}.  {item.name}
                                                                   </Text>

                                                                   <View style={style.content_list_item_rank}>
                                                                       <Image source={SRC_LIKE_GRAY} style={style.icon_size}/>
                                                                       <Text style={style.content_list_item_amount}>
                                                                           {item.like_count}
                                                                       </Text>
                                                                   </View>
                                                                </View>
                                                            )
                                                        ),
                                                        R.take(SHOW_NUM),
                                                        R.values
                                                    )(v[1].list)
                                                }
                                             </View>

                                            <Image source={SRC_ARROW_RIGHT} style={[style.icon_size, style.content_list_arrow]}/>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )),
                            R.toPairs
                        )(rank_list.data)
                    }
                </ScrollView>
            </Content>
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
        action: bindActionCreators({rank_list_init}, dispatch),
    })
)(List)

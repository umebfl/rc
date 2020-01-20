import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native'

import {
    _fetch,
} from '../../../../../lib/fetch'

import {
    TAB_HEADER_HEIGHT,
} from '../../../index_android.js'

import * as variable from '../../../../../theme/ume-theme/variable.js'
import style from './style.js'

import * as reducer from '../reducer_filter.js'

const DEP_PATH = '/orgs/dep-list'
const TOPLV_PREFIX = '    '

const LV_TOP = 'top'
const LV_SUB = 'sub'
const LV_LEAF = 'leaf'

const SUB_ICON = require('../../../../../../../content/img/filter/b-1.png')
const SUB_ICON_DISABLE = require('../../../../../../../content/img/filter/b.png')
const LEAF_ICON = require('../../../../../../../content/img/filter/l-1.png')
const LEAF_ICON_DISABLE = require('../../../../../../../content/img/filter/l.png')

class Filter_drawer extends Component {

    constructor(prop) {
        super(prop)
    }

    componentDidMount() {

        const {
            navigation,
            auth: {
                info,
            },
            i18n,
        } = this.props

        _fetch({
            fetch_type: 'GET',
            param: {
                wsId: info.id,
            },
            path: DEP_PATH,
            token: info.token,
            lang: i18n.lang,
            success: rv => {
                // const d = R.compose(
                //     // ├ │ └ 　
                //     R.map(
                //         v => R.assoc(
                //            'value',
                //            R.replace(/│/g, ' ', v.value)
                //        )(v)
                //     ),
                //     R.drop(1)
                // )(rv.dep_data)

                this.props.action.home_diary_manager_filter_set_drawer({
                    dep_data: R.drop(1)(rv.dep_data),
                })
            },
            // update_state: payload => {
            //     this.setState({
            //         ...this.state,
            //         ...payload,
            //     })
            // },
        })
    }

    handle_reset() {
        this.props.action.home_diary_manager_filter_set_drawer({
            active: {
                ...this.props.data.drawer.active,
                seq_active: null,
                dep_active: null,
            },
        })
    }

    handle_sumbit() {
        this.props.navigation.navigate('DrawerClose')
    }

    handle_seq(k) {
        this.props.action.home_diary_manager_filter_set_drawer({
            active: {
                ...this.props.data.drawer.active,
                seq_active: this.props.data.drawer.active.seq_active === k ? null : k,
            },
        })
     }

     handle_dep(rv) {
         this.props.action.home_diary_manager_filter_set_drawer({
             active: {
                 ...this.props.data.drawer.active,
                 dep_active: this.props.data.drawer.active.dep_active === rv.k ? null : rv.k,
             },
         })
     }

    render() {
        const {
            navigation,
            auth,
            i18n: {
                t,
            },
            data: {
                drawer: {
                    dep_data,
                    active: {
                        dep_active,
                        seq_active,
                    },
                },
            },
        } = this.props

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={{
                    padding: variable.N_15,
                    borderBottomWidth: variable.BORDER_WIDTH,
                    borderBottomColor: variable.BORDER_COLOR,
                }}>
                    <Text style={style.filter_title}>{t.department}</Text>
                </View>

                <ScrollView style={{
                    flex: 1,
                }}>
                    {
                        R.addIndex(R.map)(
                            (v, k) => {
                                const active = k === dep_active
                                const match = R.match(/^(│|　|└|├)*/g)
                                // | 或 空格 使用margin
                                const margin_count = match(v.value)[0].length

                                // 移除布局元素
                                const val = R.ifElse(
                                    R.compose(
                                        v => v === '├' || v === '└',
                                        R.take(1)
                                    ),
                                    R.replace(/^(├|└){1}/, TOPLV_PREFIX),    // 一级
                                    R.replace(/^(│|　)*(└|├)*/g, '')
                                )(v.value)
                                // const val = v.value

                                let lv
                                let icon

                                if(R.indexOf(TOPLV_PREFIX)(val) !== -1) {
                                    lv = 'top'
                                    icon = null
                                } else {
                                    // 判断节点层级
                                    const next_item = dep_data[k + 1]

                                    if(next_item && margin_count < match(next_item.value)[0].length) {
                                        lv = LV_SUB
                                    } else {
                                        lv = LV_LEAF
                                    }

                                    icon = <Image
                                            square
                                            source={
                                                lv === LV_SUB
                                                    ? active
                                                        ? SUB_ICON : SUB_ICON_DISABLE
                                                    : active
                                                        ? LEAF_ICON : LEAF_ICON_DISABLE
                                            }
                                            style={{
                                                width: variable.N_14,
                                                height: variable.N_14,
                                                marginRight: variable.N_5,
                                            }}/>
                                }

                                return (
                                    <TouchableWithoutFeedback key={k} onPress={this.handle_dep.bind(this, {k, id: v.id})}>
                                        <View style={active ? style.item_active : {}}>
                                            <View style={{
                                                padding: variable.N_15,
                                                paddingLeft: 0,
                                                borderBottomWidth: variable.BORDER_WIDTH,
                                                borderBottomColor: variable.BORDER_COLOR,
                                                marginLeft: (margin_count - 1) * variable.N_36,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                {
                                                    icon
                                                }
                                                <Text style={R.merge(
                                                    {
                                                        color: lv === LV_TOP || lv === LV_SUB ? variable.COLOR_GRAY_D : variable.COLOR_GRAY,
                                                        fontWeight: lv === LV_TOP || lv === LV_SUB ? 'bold' : 'normal',
                                                    },
                                                    active ? style.item_text_active : {}
                                                )}>
                                                    {
                                                        val
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                        )(dep_data)
                    }
                </ScrollView>

                <View style={{
                    borderTopWidth: variable.BORDER_WIDTH,
                    borderTopColor: variable.BORDER_COLOR,

                    shadowColor: '#999',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.3,
                    shadowRadius: 7
                }}>
                    <Text style={[style.filter_title, {padding: variable.N_15, paddingBottom: 0,}]}>{t.sequence}</Text>
                    <View style={{
                        padding: variable.N_15,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingBottom: variable.N_12,
                        }}>
                            <TouchableOpacity activeOpacity={1} onPress={this.handle_seq.bind(this, 'M')} style={R.mergeAll([
                                style.seq_item,
                                style.seq_item_split,
                                seq_active === 'M' ? style.item_active : {}
                            ])}>
                                <View>
                                    <Text style={R.mergeAll([
                                        style.seq_item_text,
                                        seq_active === 'M' ? style.item_text_active : {}
                                    ])}>M-{t.manager}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.handle_seq.bind(this, 'P')} style={R.mergeAll([
                                style.seq_item,
                                seq_active === 'P' ? style.item_active : {}
                            ])}>
                                <View>
                                    <Text style={R.mergeAll([
                                        style.seq_item_text,
                                        seq_active === 'P' ? style.item_text_active : {}
                                    ])}>P-{t.professional_support}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity activeOpacity={1} onPress={this.handle_seq.bind(this, 'T')} style={R.mergeAll([
                                style.seq_item,
                                style.seq_item_split,
                                seq_active === 'T' ? style.item_active : {}
                            ])}>
                                <View>
                                    <Text style={R.mergeAll([
                                        style.seq_item_text,
                                        seq_active === 'T' ? style.item_text_active : {}
                                    ])}>T-{t.product_development}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.handle_seq.bind(this, 'S')} style={R.mergeAll([
                                style.seq_item,
                                seq_active === 'S' ? style.item_active : {}
                            ])}>
                                <View>
                                    <Text style={R.mergeAll([
                                        style.seq_item_text,
                                        seq_active === 'S' ? style.item_text_active : {}
                                    ])}>S-{t.marketing_management}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity activeOpacity={.7} onPress={this.handle_reset.bind(this)} style={{
                        height: TAB_HEADER_HEIGHT,
                        justifyContent: 'center',
                        backgroundColor: variable.COLOR_BLUE_XXL,
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <View>
                            <Text style={{
                                color: variable.COLOR_GRAY_D,
                                fontSize: variable.N_16,
                            }}>{t.reset}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.7} onPress={this.handle_sumbit.bind(this)} style={{
                        height: TAB_HEADER_HEIGHT,
                        justifyContent: 'center',
                        backgroundColor: variable.COLOR_MAIN,
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <View>
                            <Text style={{
                                color: 'white',
                                fontSize: variable.N_16,
                            }}>{t.complete}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        data: state.Diary_manager_filter,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(Filter_drawer)

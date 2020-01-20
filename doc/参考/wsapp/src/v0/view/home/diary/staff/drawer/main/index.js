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

import moment from 'moment'

import {
    _fetch,
} from '../../../../../../lib/fetch'

import {
    TAB_HEADER_HEIGHT,
} from '../../../../index.js'

import Date_picker from '../../../../../../component/date_picker'

import * as variable from '../../../../../../theme/ume-theme/variable.js'
import drawer_style from '../style.js'
import seq_style from '../seq/style.js'
import style from './style.js'

import Seq_filter from '../seq'

import * as reducer from '../../reducer.js'

const DEP_PATH = '/orgs/dep-list'
const TOPLV_PREFIX = '    '

const LV_TOP = 'top'
const LV_SUB = 'sub'
const LV_LEAF = 'leaf'

const SUB_ICON = require('../../../../../../../../content/img/filter/b-1.png')
const SUB_ICON_DISABLE = require('../../../../../../../../content/img/filter/b.png')
const LEAF_ICON = require('../../../../../../../../content/img/filter/l-1.png')
const LEAF_ICON_DISABLE = require('../../../../../../../../content/img/filter/l.png')

const OP_ICON = require('../../../../../../../../content/img/filter/op-1.png')
const OP_ICON_DISABLE = require('../../../../../../../../content/img/filter/op.png')
const CL_ICON = require('../../../../../../../../content/img/filter/cl-1.png')
const CL_ICON_DISABLE = require('../../../../../../../../content/img/filter/cl.png')
const CK_ICON = require('../../../../../../../../content/img/filter/selected.png')

class Filter_drawer extends Component {

    constructor(prop) {
        super(prop)
        prop.action.home_diary_staff_filter_drawer_init_dep()
    }

    handle_reset() {
        this.props.action.home_diary_staff_filter_drawer_reset()
    }

    handle_sumbit() {
        this.props.navigation.navigate('DrawerClose')
    }

    handle_read(k) {
         const {
             read_active,
         } = this.props.data.active

         this.props.action.home_diary_staff_filter_drawer_set({
             active: {
                 ...this.props.data.active,
                 read_active: k ? [k] : [],
             },
         })
     }

     handle_eva(k) {
          const {
              eva_active,
          } = this.props.data.active

          this.props.action.home_diary_staff_filter_drawer_set({
              active: {
                  ...this.props.data.active,
                  eva_active: k ? [k] : [],
              },
          })
     }

     handle_date(type, val) {
         const {
             date_active,   // custom_start_end
         } = this.props.data.active

         let active_key = ''

         if(type === 'custom-start') {
             if(has_custom_active(date_active)) {
                 const splite = R.split('_', date_active[0])
                 active_key = `custom_${val}_${splite[2]}`
             } else {
                 active_key = `custom_${val}_${moment().format('YYYY-MM-DD')}`
             }

         } else if(type === 'custom-end') {

              if(has_custom_active(date_active)) {
                  const splite = R.split('_', date_active[0])
                  active_key = `custom_${splite[1]}_${val}`
              } else {
                  active_key = `custom_${moment().format('YYYY-MM-DD')}_${val}`
              }

         } else {
             active_key = type
         }

         console.log('dev |', active_key)

         this.props.action.home_diary_staff_filter_drawer_set({
             active: {
                 ...this.props.data.active,
                 date_active: [active_key],
             },
         })
     }

     handle_fav(k) {
         const {
             fav_active,
         } = this.props.data.active

         this.props.action.home_diary_staff_filter_drawer_set({
             active: {
                 ...this.props.data.active,
                 fav_active: k ? [k] : [],
             },
         })
     }

     handle_dep(rv) {
         const {
             dep_active,
         } = this.props.data.active

         this.props.action.home_diary_staff_filter_drawer_set({
             active: {
                 ...this.props.data.active,
                 dep_active: R.compose(
                     R.ifElse(
                         R.equals(-1),
                         () => R.append(rv, dep_active),
                         k => R.remove(k, 1, dep_active),
                     ),
                     R.findIndex(
                         R.equals(rv)
                     )
                 )(dep_active)
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
                dep_data,
                active: {
                    date_active,
                    read_active,
                    eva_active,
                    fav_active,
                    dep_active,
                    seq_active,
                },
            },
            action: {
                home_diary_staff_filter_drawer_set,
                home_diary_staff_filter_drawer_dep_set_open,
                home_diary_staff_filter_drawer_dep_set_checked,
                home_diary_staff_filter_drawer_dep_checked_all,
                home_diary_staff_filter_drawer_seq_reset,
            },
            handle_change_to,
        } = this.props

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_dep_checked_all()}>
                    <View style={drawer_style.header}>
                        <Text style={R.mergeAll([
                            style.filter_title,
                            // !dep_active.length ? style.item_text_active : {}
                        ])}>{t.department}</Text>

                        {
                            !dep_active.length
                                ? <View style={{
                                    padding: 10,
                                }}>
                                    <Text style={{color: variable.COLOR_GRAY}}>{t['选择全部']}</Text>
                                </View>
                                : <View style={{
                                    padding: 10,
                                }}>
                                    <Text style={style.item_text_active}>{t['取消选择']}</Text>
                                </View>
                        }

                    </View>
                </TouchableWithoutFeedback>

                <ScrollView style={{
                    flex: 1,
                }}>
                    {
                        build_dep_list(
                            dep_data,
                            0,
                            true,
                            home_diary_staff_filter_drawer_dep_set_open,
                            home_diary_staff_filter_drawer_dep_set_checked,
                        )
                    }

                    <TouchableOpacity activeOpacity={1} onPress={() => handle_change_to(1)}>
                        <View style={{
                            shadowColor: '#999',
                            shadowOffset: {width: 0, height: 0},
                            shadowOpacity: 0.2,
                            shadowRadius: 2,

                            borderTopWidth: variable.BORDER_WIDTH,
                            borderTopColor: variable.BORDER_COLOR,
                            paddingLeft: variable.N_15,
                            paddingRight: variable.N_15,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={[style.filter_title]}>{t['序列／职级']}</Text>
                                <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_reset()}>
                                    <View>
                                        <Text style={{color: variable.COLOR_GRAY}}>{t.reset}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Seq_filter/>
                        </View>
                    </TouchableOpacity>

                    {
                        build_date_list(t, date_active, this.handle_date.bind(this))
                    }
                    {
                        build_read_list(t, read_active, this.handle_read.bind(this))
                    }
                    {
                        build_evaluate_list(t, eva_active, this.handle_eva.bind(this))
                    }
                    {
                        build_fav_list(t, fav_active, this.handle_fav.bind(this))
                    }
                </ScrollView>

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

const has_custom_active = (rv) => {
    return rv.length && R.indexOf('custom', rv[0]) !== -1
}

const build_date_list = (t, active, handle_press) => (
    <View style={{
        borderTopWidth: variable.BORDER_WIDTH,
        borderTopColor: variable.BORDER_COLOR,
        padding: variable.N_15,
        paddingTop: 0,
        paddingBottom: 0,
    }}>
        <Text style={[style.filter_title]}>{t['时间']}</Text>

        <View>
            <View style={[seq_style.seq_item_content, {marginBottom: 0,}]}>
                <TouchableWithoutFeedback onPress={() => handle_press('today')}>
                    <View style={R.mergeAll([
                        seq_style.seq_item,
                        {
                            width: 130,
                        },
                        R.contains('today', active) ? seq_style.seq_item_active : {},
                    ])}>
                        <Text style={R.mergeAll([
                            seq_style.seq_item_text,
                            R.contains('today', active) ? seq_style.seq_item_text_active : {},
                        ])}>{t['今天']}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => handle_press('yesterday')}>
                    <View style={R.mergeAll([
                        seq_style.seq_item,
                        {
                            width: 130,
                        },
                        R.contains('yesterday', active) ? seq_style.seq_item_active : {},
                    ])}>
                        <Text style={R.mergeAll([
                            seq_style.seq_item_text,
                            R.contains('yesterday', active) ? seq_style.seq_item_text_active : {},
                        ])}>{t['昨天']}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => handle_press('last_three_days')}>
                    <View style={R.mergeAll([
                        seq_style.seq_item,
                        {
                            width: 130,
                        },
                        R.contains('last_three_days', active) ? seq_style.seq_item_active : {},
                    ])}>
                        <Text style={R.mergeAll([
                            seq_style.seq_item_text,
                            R.contains('last_three_days', active) ? seq_style.seq_item_text_active : {},
                        ])}>{t['最近三天']}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => handle_press('this_week')}>
                    <View style={R.mergeAll([
                        seq_style.seq_item,
                        {
                            width: 130,
                        },
                        R.contains('this_week', active) ? seq_style.seq_item_active : {},
                    ])}>
                        <Text style={R.mergeAll([
                            seq_style.seq_item_text,
                            R.contains('this_week', active) ? seq_style.seq_item_text_active : {},
                        ])}>{t['本周']}</Text>
                    </View>
                </TouchableWithoutFeedback>

                {
                    // <TouchableWithoutFeedback onPress={() => handle_press('this_month')}>
                    //     <View style={R.mergeAll([
                    //         seq_style.seq_item,
                    //         {
                    //             width: 130,
                    //         },
                    //         R.contains('this_month', active) ? seq_style.seq_item_active : {},
                    //     ])}>
                    //         <Text style={R.mergeAll([
                    //             seq_style.seq_item_text,
                    //             R.contains('this_month', active) ? seq_style.seq_item_text_active : {},
                    //         ])}>{t['本月']}</Text>
                    //     </View>
                    // </TouchableWithoutFeedback>
                }
            </View>

            <View style={{
                ...seq_style.seq_item_content,
                alignItems: 'center',
                paddingBottom: variable.N_6,
            }}>
                <Text>{t['从']}</Text>
                <Date_picker
                    type='start'
                    active={has_custom_active(active)}
                    date={has_custom_active(active) ? R.split('_', active[0])[1] : moment().subtract(moment().date() - 1, 'days').format('YYYY-MM-DD')}
                    container_style={{width: variable.N_100}}
                    container_style_active={seq_style.seq_item_active}
                    input_style={style.seq_item}
                    input_style_active={seq_style.seq_item_text_active}
                    handle_change={v => handle_press('custom-start', v)}
                    min_date={''}
                    max_date={has_custom_active(active) ? R.split('_', active[0])[2] : moment().format('YYYY-MM-DD')}
                    maxDate={moment().format('YYYY-MM-DD')}
                    t={t}/>
                <Text>{t['到']}</Text>
                <Date_picker
                    type='end'
                    active={has_custom_active(active)}
                    date={has_custom_active(active) ? R.split('_', active[0])[2] : ''}
                    container_style={{width: variable.N_100}}
                    container_style_active={seq_style.seq_item_active}
                    input_style={style.seq_item}
                    input_style_active={seq_style.seq_item_text_active}
                    handle_change={v => handle_press('custom-end', v)}
                    min_date={has_custom_active(active) ? R.split('_', active[0])[1] : ''}
                    max_date={moment().format('YYYY-MM-DD')}
                    maxDate={moment().format('YYYY-MM-DD')}
                    t={t}/>
            </View>
        </View>

    </View>
)

const build_read_list = (t, active, handle_press) => (
    <View style={{
        borderTopWidth: variable.BORDER_WIDTH,
        borderTopColor: variable.BORDER_COLOR,
        padding: variable.N_15,
        paddingTop: 0,
        paddingBottom: 0,
    }}>
        <Text style={[style.filter_title]}>{t['阅读']}</Text>
        <View style={seq_style.seq_item_content}>
            <TouchableWithoutFeedback onPress={() => handle_press('read')}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    R.contains('read', active) ? seq_style.seq_item_active : {},
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        R.contains('read', active) ? seq_style.seq_item_text_active : {},
                    ])}>{t['已读']}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handle_press('unread')}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    R.contains('unread', active) ? seq_style.seq_item_active : {},
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        R.contains('unread', active) ? seq_style.seq_item_text_active : {},
                    ])}>{t['未读']}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handle_press()}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    active.length ? {} : seq_style.seq_item_active,
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        active.length ? {} : seq_style.seq_item_text_active,
                    ])}>{t['全部']}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
)

const build_evaluate_list = (t, active, handle_press) => (
    <View style={{
        borderTopWidth: variable.BORDER_WIDTH,
        borderTopColor: variable.BORDER_COLOR,
        padding: variable.N_15,
        paddingTop: 0,
        paddingBottom: 0,
    }}>
        <Text style={[style.filter_title]}>{t.log_evaluate}</Text>
        <View style={seq_style.seq_item_content}>
            <TouchableWithoutFeedback onPress={() => handle_press('eva')}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    R.contains('eva', active) ? seq_style.seq_item_active : {},
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        R.contains('eva', active) ? seq_style.seq_item_text_active : {},
                    ])}>{t['我已评价']}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handle_press('uneva')}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    R.contains('uneva', active) ? seq_style.seq_item_active : {},
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        R.contains('uneva', active) ? seq_style.seq_item_text_active : {},
                    ])}>{t['我未评价']}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handle_press()}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    active.length ? {} : seq_style.seq_item_active,
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        active.length ? {} : seq_style.seq_item_text_active,
                    ])}>{t['全部']}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
)

const build_fav_list = (t, fav_active, handle_fav) => (
    <View style={{
        borderTopWidth: variable.BORDER_WIDTH,
        borderTopColor: variable.BORDER_COLOR,
        padding: variable.N_15,
        paddingTop: 0,
        paddingBottom: 0,
    }}>
        <Text style={[style.filter_title]}>{t['关注']}</Text>
        <View style={seq_style.seq_item_content}>
            <TouchableWithoutFeedback onPress={() => handle_fav('fav')}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    R.contains('fav', fav_active) ? seq_style.seq_item_active : {},
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        R.contains('fav', fav_active) ? seq_style.seq_item_text_active : {},
                    ])}>{t['已关注']}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handle_fav('unfav')}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    R.contains('unfav', fav_active) ? seq_style.seq_item_active : {},
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        R.contains('unfav', fav_active) ? seq_style.seq_item_text_active : {},
                    ])}>{t['未关注']}</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handle_fav()}>
                <View style={R.mergeAll([
                    seq_style.seq_item,
                    fav_active.length ? {} : seq_style.seq_item_active,
                ])}>
                    <Text style={R.mergeAll([
                        seq_style.seq_item_text,
                        fav_active.length ? {} : seq_style.seq_item_text_active,
                    ])}>{t['全部']}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
)

const build_dep_list = (data, i, open, handle_open, handle_checked) => {
    let list = []

    if(i !== 0 && open) {
        list = [
            <TouchableWithoutFeedback key={data.k} onPress={() => handle_checked(data.k)}>
                <View style={[
                    data.ck ? style.item_active : {},
                    {
                        backgroundColor: i > 1 ? variable.COLOR_GRAY_XXXL : 'white',
                    },
                ]}>

                    <TouchableWithoutFeedback onPress={() => handle_open(data.k)}>
                        <View style={{
                            position: 'absolute',
                            zIndex: 1,
                            width: variable.N_200,
                            height: variable.N_54,
                            top: 0,
                            left: 0,
                            // backgroundColor: 'rgba(0,0,0,.1)',
                        }}>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{
                        paddingLeft: variable.N_15,
                        height: variable.N_54,
                        borderBottomWidth: variable.BORDER_WIDTH,
                        borderBottomColor: variable.BORDER_COLOR,
                        marginLeft: (i - 1) * variable.N_36,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                            square
                            source={
                                open && data.sub && data.sub.length
                                    ? data.op
                                        ? data.ck
                                            ? OP_ICON
                                            : OP_ICON_DISABLE
                                        : data.ck
                                            ? CL_ICON
                                            : CL_ICON_DISABLE
                                    : data.ck
                                        ? LEAF_ICON
                                        : LEAF_ICON_DISABLE
                            }
                            style={{
                                width: variable.N_8,
                                height: variable.N_8,
                                marginRight: variable.N_5,
                            }}/>

                        <Text style={R.merge(
                            {
                                color: variable.COLOR_GRAY_D,
                                fontWeight: i === 1 ? 'bold' : 'normal',
                            },
                            data.ck ? style.item_text_active : {}
                        )}>
                            {
                                data.v
                            }
                        </Text>

                        <Image
                            square
                            source={CK_ICON}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: data.ck ? variable.N_20 : 0,
                                height: variable.N_20,
                            }}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        ]
    }

    if(data.sub && open) {
        R.forEach(
            v => {
                list = [
                    ...list,
                    ...build_dep_list(v, i + 1, data.op, handle_open, handle_checked),
                ]
            }
        )(data.sub)
    }

    return list
}


export default connect(
    state => ({
        data: state.Diary_staff.filter_drawer_data,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(Filter_drawer)

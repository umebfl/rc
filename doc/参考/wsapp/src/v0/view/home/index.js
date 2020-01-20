import R from 'ramda'
import React, {
    Component,
} from 'react'
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Container from '../../component/layout/container'
import * as Jpush from '../../lib/jpush'

import * as variable from '../../theme/ume-theme/variable.js'

import style from './style.js'

import Dynamic from './dynamic'
import Homepage from './homepage'
import Diary from './diary'
import Weibo from './weibo'
import Me from './me'

import * as homepage_reducer from './homepage/reducer'
import * as staff_reducer from './diary/staff/reducer'

export const TAB_HEADER_HEIGHT = 58

const DYNAMIC_ICON = require('../../../../content/img/icon/flash.png')
const DYNAMIC_ACTIVE_ICON = require('../../../../content/img/icon/flash_1.png')

const HOME_ICON = require('../../../../content/img/icon/home.png')
const HOME_ACTIVE_ICON = require('../../../../content/img/icon/home_1.png')

const DATE_ICON = require('../../../../content/img/icon/date.png')
const DATE_ACTIVE_ICON = require('../../../../content/img/icon/date_1.png')

const Weibo_ICON = require('../../../../content/img/icon/share.png')
const Weibo_ACTIVE_ICON = require('../../../../content/img/icon/share_1.png')

const ACCOUNT_ICON = require('../../../../content/img/icon/account.png')
const ACCOUNT_ACTIVE_ICON = require('../../../../content/img/icon/account_1.png')

import {
    DIARY_MANAGER,
} from '../../reducer/user/role'

class Home extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            view: {
                Homepage: {
                    active: true,
                    inited: true,
                },
                Diary: {
                    active: false,
                    inited: false,
                },
                Weibo: {
                    active: false,
                    inited: false,
                },
                Me: {
                    active: false,
                    inited: false,
                },
            }
        }
    }

    componentDidMount() {
        this.props.action.home_diary_staff_list_refresh()
        Jpush.callbackListener && Jpush.callbackListener(this.props.action.homepage_get_oa_count)
    }

    handle_item_press(view) {
        this.setState({
            ...this.state,
            view: R.compose(
                R.assocPath([view, 'inited'], true),
                R.assocPath([view, 'active'], true),
                R.map(
                    R.assoc('active', false)
                )
            )(this.state.view),
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
            homepage: {
                tab_count_text,
            },
            diary_staff: {
                count,
            },
            role: {
                operation,
                type,
            },
            navigation,
        } = this.props

        const {
            view,
        } = this.state

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flex: 1,
                        // height: variable.SCREEN_HEIGHT - TAB_HEADER_HEIGHT,
                    }}>
                        <View style={view.Homepage.active ? style.view : style.hidden}>
                            {
                                view.Homepage.inited || view.Homepage.active
                                    ? <Homepage navigation={navigation}/>
                                    : null
                            }
                        </View>

                        <View style={view.Diary.active ? style.view : style.hidden}>
                            {
                                view.Diary.inited || view.Diary.active
                                    ? <Diary navigation={navigation}/>
                                    : null
                            }
                        </View>

                        <View style={view.Weibo.active ? style.view : style.hidden}>
                            {
                                view.Weibo.inited || view.Weibo.active
                                    ? <Weibo navigation={navigation}/>
                                    : null
                            }
                        </View>

                        <View style={view.Me.active ? style.view : style.hidden}>
                            {
                                view.Me.inited || view.Me.active
                                    ? <Me navigation={navigation}/>
                                    : null
                            }
                        </View>
                    </View>

                    <View style={{
                        height: TAB_HEADER_HEIGHT,
                        flexDirection: 'row',
                        borderTopWidth: variable.BORDER_WIDTH,
                        borderTopColor: variable.BORDER_COLOR,
                        justifyContent: 'space-between',
                    }}>

                        <TouchableWithoutFeedback onPress={this.handle_item_press.bind(this, 'Homepage')}>
                            <View style={style.item}>
                                <View style={style.item_wrap}>
                                    <Image source={view.Homepage.active ? HOME_ACTIVE_ICON : HOME_ICON} style={style.item_icon}/>
                                    <Text style={view.Homepage.active ? [style.item_text, style.item_text_active] : style.item_text}>{t.tab_home}</Text>
                                    {
                                        tab_count_text
                                            ? <View style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                backgroundColor: variable.COLOR_POINT,
                                                borderRadius: 8,
                                                paddingLeft: variable.N_5,
                                                paddingRight: variable.N_5,
                                                zIndex: 1000,
                                            }}>
                                                <Text style={style.item_point_text}>
                                                    {tab_count_text}
                                                </Text>
                                            </View>
                                            : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        {
                            operation.indexOf(DIARY_MANAGER) !== -1
                                ? <TouchableWithoutFeedback onPress={this.handle_item_press.bind(this, 'Diary')}>
                                    <View style={style.item}>
                                        <View style={style.item_wrap}>
                                            <Image source={view.Diary.active ? DATE_ACTIVE_ICON : DATE_ICON} style={style.item_icon}/>
                                            <Text style={view.Diary.active ? [style.item_text, style.item_text_active] : style.item_text}>{t.tab_diary}</Text>
                                            {
                                                count > 0
                                                    ?<View style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        backgroundColor: variable.COLOR_POINT,
                                                        borderRadius: 8,
                                                        paddingLeft: variable.N_5,
                                                        paddingRight: variable.N_5,
                                                        zIndex: 1000,
                                                    }}>
                                                        <Text style={style.item_point_text}>{count > 99 ? '99+' : count}</Text>
                                                    </View>
                                                    :null
                                            }
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                : null
                        }



                        <TouchableWithoutFeedback onPress={this.handle_item_press.bind(this, 'Weibo')}>
                            <View style={style.item}>
                                <Image source={view.Weibo.active ? Weibo_ACTIVE_ICON : Weibo_ICON} style={style.item_icon}/>
                                <Text style={view.Weibo.active ? [style.item_text, style.item_text_active] : style.item_text}>{t.tab_share}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={this.handle_item_press.bind(this, 'Me')}>
                            <View style={style.item}>
                                <Image source={view.Me.active ? ACCOUNT_ACTIVE_ICON : ACCOUNT_ICON} style={style.item_icon}/>
                                <Text style={view.Me.active ? [style.item_text, style.item_text_active] : style.item_text}>{t.tab_me}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        homepage: state.Homepage,
        diary_staff: state.Diary_staff,
        todo: state.Dynamic_todo,
        i18n: state.I18n,
        role: state.User_role,
    }),
    dispatch => ({
        action: bindActionCreators({
            ...homepage_reducer,
            ...staff_reducer,
        }, dispatch),
    })
)(Home)

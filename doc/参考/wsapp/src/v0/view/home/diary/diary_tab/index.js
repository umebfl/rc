import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Share,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import style from './style.js'
import Diary_content from '../diary_content'
import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Loading from '../../../../component/loading/normal'
import Header from '../../../../component/layout/header'
import toast from '../../../../component/toast/normal'

import SRC_CANCEL from '../../../../../../content/img/icon_dairy/cancel_attention.png'
import SRC_ADD from '../../../../../../content/img/icon_dairy/add_attention.png'
import SRC_TRANSMIT from '../../../../../../content/img/icon_dairy/transmit.png'

import {
    _fetch,
} from '../../../../lib/fetch'

import * as variable from '../../../../theme/ume-theme/variable.js'

const FOLLOWS_IDS = '/logs/follows/ids'
const MANAGER_IDS = '/logs/list/ids'
const MORE_IDS = '/logs/list/my/ids'
const FAVORITES_PATH = '/users/favorites'

import {
    MORE_TYPE,
} from '../more'

import {
    ME_TYPE,
} from '../me'

import {
    FAVORITE_TYPE,
} from '../favorite'

import {
    MANAGER_TYPE,
} from '../staff'

import {
    home_diary_staff_list_refresh,
    home_diary_staff_detail_ids,
    home_diary_staff_set_favorite_state,
    build_param,
} from '../staff/reducer.js'
import {
    home_diary_favorite_detail_ids,
} from '../favorite/reducer.js'
import {
    home_diary_me_detail_ids,
} from '../me/reducer.js'
import {
    home_diary_more_detail_ids,
} from '../more/reducer.js'
import {
    component_toggle,
} from '../../../../component/toggle/com_toggle/reducer.js'

import {
    ABS_d5,
    N_1,
    N_3,
    N_5,
    N_6,
    N_10,
    N_11,
    N_12,
    N_14,
    N_16,
    N_18,
    N_20,
    N_40,
    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
} from '../../../../theme/ume-theme/variable.js'

import {
    home_diary_tab_set,
} from './reducer.js'

class Diary_tab extends Component {

    constructor(prop) {
        super(prop)

        const {
            navigation: {
                state: {
                    params: {
                        id,
                        type,
                    },
                },
            },
        } = prop

        let data = []
        let page_num = 0

        if(type === MANAGER_TYPE && !prop.diary_staff.search_list_update_flag) {
            data = prop.diary_staff.ids
        }

    	// 处理日志tab页不刷新的问题
    	else if(type === FAVORITE_TYPE && !prop.diary_favorite.search_list_update_flag) {
            data = prop.diary_favorite.ids
        } else if(type === ME_TYPE && !prop.diary_me.search_list_update_flag) {
            data = prop.diary_me.ids
        } else if(type === MORE_TYPE && !prop.diary_more.search_list_update_flag) {
            data = prop.diary_more.ids
        }

        data.map((v, k) => {
            if(id === v.id) {
                page_num = k
            }
        })

        this.state = {
            data,

            init_page_num: page_num,
            page_num,

            id: prop.navigation.state.params.id,
            row_index: prop.navigation.state.params.row_index,

            isOpen: false,
        }

        // console.log('-tab constructor:', data, page_num, prop.navigation.state.params.id, prop.navigation.state.params.row_index)

        this.props.action.home_diary_tab_set({
            name: prop.navigation.state.params.name,
            job: prop.navigation.state.params.job_cname,
        })
    }

    componentDidMount() {
        const {
            navigation: {
                state: {
                    params: {
                        type,
                    },
                },
            },
        } = this.props

        if(type === MANAGER_TYPE) {
            if(this.props.diary_staff.search_list_update_flag) {
                // console.log('-tab componentDidMount:', this.props.diary_staff.search_list_update_flag)
                this.get_ids()
            }
        }
    	// 处理日志tab页不刷新的问题
    	else if(type === FAVORITE_TYPE) {
            if(this.props.diary_favorite.search_list_update_flag) {
                this.get_ids()
            }
        } else if(type === ME_TYPE) {
            if(this.props.diary_me.search_list_update_flag) {
                this.get_ids()
            }
        } else if(type === MORE_TYPE) {
            if(this.props.diary_more.search_list_update_flag) {
                this.get_ids()
            }
        }
    }

    handle_next_page() {
        const len = this.state.data.length - 1

        if(len === this.state.page_num) {
            return
        }

        // this.tabView.goToPage(this.page_num + 1)
        this.setState({
            ...this.state,
            page_num: this.state.page_num + 1,
        })

    }

    handle_log_change(rv) {
        // this.setState({
        //     ...this.state,
        //     page: i,
        //     id,
        //     row_index,
        //     name,
        //     job,
        // })
        // const {
        //     id,
        // } = this.state

        // this.props.action.home_diary_tab_set({
        //     job: data[i].jobCname,
        //     name: data[i].name,
        // })

        // this.page_num = rv.i
        // this.props.action.home_diary_staff_list_refresh()
        this.props.action.component_toggle(null)

        this.setState({
            ...this.state,
            page_num: rv.i,
        })

        // console.log('handle_log_change:', rv)
    }

    // componentWillUnMount() {
    //     this.timer && clearTimeout(this.timer)
    // }

    get_ids() {
        const {
            navigation: {
                state: {
                    params: {
                        id,
                        row_index,
                        type,
                        ws_id,
                        job,
                    },
                },
            },
            auth: {
                info,
            },
            i18n: {
                lang,
            },
            filter,
        } = this.props

        let param_id
        let path = ''
        let param = {}

        if(type === FAVORITE_TYPE) {
            path = FOLLOWS_IDS
            param_id = info.id
        } else if(type === MANAGER_TYPE) {
            path = MANAGER_IDS
            param_id = info.id
            // const bar_filter = build_bar_filter_param(this.props)
            // const drawer_filter = build_drawer_filter_param(this.props)

            const filter_param = build_param(this.props.state)

            param = {
                ...param,
                ...filter_param,
            }
        } else {
            // more
            // 我
            path = MORE_IDS
            param_id = ws_id

            // this.setState({
            //     ...this.state,
            //     data: [
            //         {
            //             id,
            //         },
            //     ],
            //     page: 0,
            // })
            //
            // return
        }

        _fetch({
            fetch_type: 'GET',
            param: {
                wsId: param_id,
                ...param,
            },
            path,
            token: info.token,
            lang,
            success: rv => {

                let page = 0

                rv = rv ? rv : []

                rv.map((v, k) => {
                    if(id === v.id) {
                        page = k
                    }
                })

                // this.page_num = page

                this.setState({
                    ...this.state,
                    data: rv,
                    init_page_num: page,
                    page_num: page,
                })

                // console.log('-tab get_ids', rv, page)

                if(type === MANAGER_TYPE) {
                    this.props.action.home_diary_staff_detail_ids(rv)
                }
        		// 处理日志tab页不刷新的问题
        		else if(type === FAVORITE_TYPE) {
                    this.props.action.home_diary_favorite_detail_ids(rv)
                } else if(type === ME_TYPE) {
                    this.props.action.home_diary_me_detail_ids(rv)
                } else if(type === MORE_TYPE) {
                    this.props.action.home_diary_more_detail_ids(rv)
                }
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // 关注
    handle_favorite(employeeId, isFavorite, id) {

        const {
            i18n: {
                t,
            },
        } = this.props

        _fetch({
            fetch_type: isFavorite ? 'DELETE' : 'POST',
            path: FAVORITES_PATH,
            param: {
                wsId: employeeId,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                // this.get_ids()
                // this.props.action.home_diary_staff_list_refresh()
                isFavorite ? toast(t.cancel_attention, {position: 0}) : toast(t.attention_success, {position: 0})

                this.props.action.home_diary_staff_set_favorite_state(employeeId)

                let data = R.map(
                    R.when(
                        v => R.equals(v.employeeId)(employeeId),
                        v => R.assoc('isFavorite', v.isFavorite ? 0 : 1, v)
                    )
                )(this.state.data)

                this.setState({
                    ...this.state,
                    data: data,
                })
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // share
    handle_shareText(data, activeTab) {
        const {
            i18n: {
                t,
            },
            diary_content: {
                log_content,
            },
        } = this.props

        let title = `${data.name} ${data.date} ${t.diary}`

        Share.share({
            message: `【${title}】\n- - - - - - - - - - - - - - - - - -\n ${log_content[activeTab]} \n`,
            url: '',
            title: title,
            }, {
            dialogTitle: 'wondershare',
            // excludedActivityTypes: [
            //   'com.apple.UIKit.activity.PostToTwitter'
            // ],
            tintColor: 'green'
        })
        .then(this.handle_showResult)
        .catch((error) => this.setState({result: 'error: ' + error.message}))
    }

    handle_showResult(result) {
        const {
            i18n: {
                t,
            },
        } = this.props

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: t['已成功分享到'] + result.activityType})
            } else {
                this.setState({result: t['分享成功']})
            }
        } else if (result.action === Share.dismissedAction) {
                this.setState({result: t['分享失败']})
        }
    }

    render() {
        const {
            data,
            page_num,
            init_page_num,
        } = this.state

        const {
            i18n: {
                t,
            },
            auth: {
                info: id,
            },
            info: {
                avatar,
            },
            navigation,
            diary_tab: {
                name,
                job,
                show_duty,
            },
        } = this.props

        // console.log('-tab render:', data.length, init_page_num, page_num)
        return (
            <Container>
                <Loading visiable={this.state._fetch_loading}/>
                <ScrollableTabView
                    style={{
                        backgroundColor: 'white',
                    }}
                    initialPage={init_page_num}
                    page={page_num}
                    prerenderingSiblingsNumber={2}
                    renderTabBar={({activeTab}) => {
                        // alert(JSON.stringify(data[activeTab]))
                        return (
                            <View style={{
                                height: variable.HEADER_HEIGHT,
                            }}>
                                <Header
                                    left_option={{
                                        show_goback: true,
                                        handle_press: this.get_ids.bind(this),
                                        navigation,
                                        text: this.props.navigation.state.params.type === MANAGER_TYPE
                                                ? t.worker_diary
                                                : this.props.navigation.state.params.type === FAVORITE_TYPE
                                                    ? t.attention_diary
                                                    : this.props.navigation.state.params.type === MORE_TYPE
                                                        ? t.view_log
                                                        : t.me,
                                        text_style: {
                                            color: COLOR_GRAY_XD,
                                            fontSize: N_16,
                                            paddingLeft: this.props.navigation.state.params.type === ME_TYPE ? N_5 : 0,
                                        },
                                        icon_touchable: {
                                            width: this.props.navigation.state.params.type === ME_TYPE ? 60 : 110,
                                            alignItems: 'center',
                                        }
                                    }}
                                    center_option={{
                                        content: (
                                            this.props.navigation.state.params.type === ME_TYPE
                                            ? <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{
                                                    fontSize: N_18,
                                                    color: COLOR_GRAY_XD,
                                                }}>
                                                    {t.diary_detail}
                                                </Text>
                                            </View>
                                            : <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{
                                                    fontSize: N_16,
                                                    color: COLOR_GRAY_XD,
                                                }}>
                                                    {data.length ? data[activeTab].name : ''}
                                                </Text>
                                                <Text style={{
                                                    paddingTop: 1,
                                                    fontSize: N_10,
                                                    color: COLOR_GRAY,
                                                    textAlign: 'center',
                                                }}>
                                                    {data.length ? data[activeTab].jobCname : ''}
                                                </Text>
                                            </View>
                                        )
                                    }}
                                    right_option={{
                                        content: (
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                {
                                                    this.props.navigation.state.params.type === ME_TYPE
                                                        ? null
                                                        : <TouchableOpacity onPress={this.handle_favorite.bind(this, data.length ? data[activeTab].employeeId : '',  data.length ? data[activeTab].isFavorite : '',)} acitveOpacity={.5}>
                                                            <View style={{
                                                                padding: N_10,
                                                            }}>
                                                                <Image
                                                                    style={{
                                                                        width: 20,
                                                                        height: 22,
                                                                    }}
                                                                    source={
                                                                        data.length
                                                                            ? data[activeTab].isFavorite
                                                                                ? SRC_CANCEL
                                                                                : SRC_ADD
                                                                            : ''}/>
                                                            </View>
                                                        </TouchableOpacity>
                                                }

                                                <TouchableOpacity onPress={this.handle_shareText.bind(this, data[activeTab], activeTab)} acitveOpacity={.5}>
                                                    <View  style={{
                                                        paddingLeft: N_5,
                                                        paddingRight: N_5,
                                                        paddingTop: N_10,
                                                        paddingBottom: N_10,
                                                    }}>
                                                        <Image
                                                            style={{
                                                                width: 22,
                                                                height: 18,
                                                                marginRight: N_20,
                                                            }}
                                                            source={SRC_TRANSMIT}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}/>
                            </View>
                        )
                    }}
                    scrollWithoutAnimation={true}
                    onChangeTab={this.handle_log_change.bind(this)}
                    ref={(tabView) => {this.tabView = tabView}}>

                    {
                        R.addIndex(R.map)((v, k) => {
                            return (
                                <Diary_content
                                    key={k}
                                    tabLabel={`diary_content_${k}`}
                                    data={v}
                                    log_index={k}
                                    log_id={v.id}
                                    show_duty={show_duty}
                                    page_num={page_num}
                                    log_len={data.length}
                                    handle_next_page={this.handle_next_page.bind(this)}
                                    {...this.props}/>
                            )
                        })(data)
                    }

                </ScrollableTabView>

            </Container>
        )
    }
}

export default connect(
    state => ({
        state: state,
        diary_tab: state.Diary_tab,
        diary_content: state.Diary_content,

        diary_me: state.Diary_me,
        diary_more: state.Diary_more,
        diary_favorite: state.Diary_favorite,
        diary_staff: state.Diary_staff,
        info: state.User_info,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_diary_staff_list_refresh,
            home_diary_staff_detail_ids,
            home_diary_favorite_detail_ids,
            home_diary_me_detail_ids,
            home_diary_more_detail_ids,
            home_diary_staff_set_favorite_state,

            component_toggle,

            home_diary_tab_set,
        }, dispatch),
    })
)(Diary_tab)

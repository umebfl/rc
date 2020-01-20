import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    RefreshControl,
} from 'react-native'

import Header from '../../../../component/layout/header'
import Divider_list from '../../../../component/list/divider_list'
import Container from '../../../../component/layout/container'
import Loading from '../../../../component/loading/normal'
import Content from '../../../../component/layout/content'
import Img from '../../../../component/element/img/normal'
import {
    user_follows_search,
    user_be_invite_me,
    user_follows_cancel,
} from '../../../../reducer/user/follows'
import conf from '../../../../../../conf.js'

const SRC_ARROW_RIGHT_GRAY = require('../../../../../../content/img/icon/arrow_right_gray.png')
import SRC_ADD from '../../../../../../content/img/icon_dairy/add_attention.png'

import {
    N_6,
    N_10,
    N_14,
    N_15,
    N_16,
    N_20,
    N_22,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_BLUE_L,
    COLOR_BLUE_XL,
    COLOR_MAIN,

    BORDER_COLOR,
    BORDER_WIDTH,
} from '../../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../../lib/fetch'

const USER_FOLLOWS_PATH = '/users/favorites/'
const FAVORITES_PATH = '/users/favorites'
const USER_INVITE_ME_PATH = '/users/follows/be-invite'

class Follows extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            favorites_init: false,
        }
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    }

    componentDidMount() {
        this.init()
    }

    init() {
        // 邀请我关注的人数
        // _fetch({
        //     fetch_type: 'GET',
        //     path: USER_INVITE_ME_PATH,
        //     param: {
        //         wsId: this.props.auth.info.id,
        //     },
        //     token: this.props.auth.info.token,
        //     lang: this.props.i18n.lang,
        //     success: rv => {
        //         this.props.action.user_be_invite_me(rv)
        //     },
        //     update_state: payload => {
        //         this.setState({
        //             ...this.state,
        //             ...payload,
        //         })
        //     },
        // })

        // 关注我的列表
        _fetch({
            fetch_type: 'GET',
            path: `${USER_FOLLOWS_PATH}${this.props.auth.info.id}`,
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.user_follows_search(rv)
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    handle_cancel_favorites(employeeId) {
        const {
            i18n: {
                t,
            },
            follows: {
                data,
            },
        } = this.props

        _fetch({
            fetch_type: 'DELETE',
            path: FAVORITES_PATH,
            param: {
                wsId: employeeId,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.user_follows_cancel(employeeId)
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
            navigation,
            follows: {
                data,
                total_data,
                inited,
            },
            auth: {
                info: {
                    id,
                },
            },
        } = this.props

        return (
            <Container>

                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                        text: '我',
                    }}
                    center_option={{
                        text: t.my_concern,
                    }}
                    // right_option={{
                    //     source: SRC_ADD,
                    //     handle_press: () => this.props.navigation.navigate('home_me_follows_search',{goback: this.init.bind(this)}),
                    //     icon_style: {
                    //         width: N_22,
                    //         height: N_22,
                    //     }
                    // }}
                    />


                <Content>
                    {
                        // inited && R.isEmpty(data)
                        // ? <View style={{
                        //      flex: 1,
                        //      alignItems: 'center',
                        //      paddingTop: N_15,
                        // }}>
                        //     <Text style={{
                        //         fontSize: N_14,
                        //         color: COLOR_GRAY,
                        //     }}>{t.no_cares}~</Text>
                        // </View>
                        // : null
                    }

                    <ListView
                        refreshControl={
                            <RefreshControl
                                onRefresh={this.init.bind(this)}
                                refreshing={this.state._fetch_loading}
                                tintColor={COLOR_MAIN}
                                title={t.drop_refresh_data} />
                        }
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        renderRow={
                            v => (
                                <TouchableOpacity onPress={() => navigation.navigate('home_more_addressbook_personal_details', {id: v.employeeId, goback: this.init.bind(this)})} activeOpacity={.5}>
                                    <View style={{
                                        paddingLeft: N_20,
                                        paddingRight: N_20,
                                        paddingTop: N_10,
                                        paddingBottom: N_10,
                                        borderBottomColor: BORDER_COLOR,
                                        borderBottomWidth: BORDER_WIDTH,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Img
                                                width={50}
                                                src={v.avatar}/>

                                            <Text style={{
                                                fontSize: N_16,
                                                color: COLOR_GRAY_D,
                                                paddingLeft: N_20,
                                            }}>{v.name}</Text>
                                        </View>

                                         {
                                              v.isFavorite
                                                ? <View style={{
                                                    padding: N_10,
                                                    borderColor: 'transparent',
                                                    borderRadius: N_6,
                                                    backgroundColor: COLOR_BLUE_L,
                                                }}>
                                                    <Text style={{
                                                        fontSize: N_14,
                                                        color: 'white',
                                                    }}>取消成功</Text>
                                                </View>
                                                : <TouchableOpacity activeOpacity={.5} onPress={this.handle_cancel_favorites.bind(this, v.employeeId)}>
                                                    <View style={{
                                                        padding: N_10,
                                                        borderColor: 'transparent',
                                                        borderRadius: N_6,
                                                        backgroundColor: COLOR_BLUE_L,
                                                    }}>
                                                        <Text style={{
                                                            fontSize: N_14,
                                                            color: 'white',
                                                        }}>取消关注</Text>
                                                    </View>
                                                </TouchableOpacity>
                                         }
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        dataSource={this.ds.cloneWithRows(data)}>
                    </ListView>

                    {
                        // R.isEmpty(total_data)
                        // ? null
                        // : <TouchableOpacity
                        //     onPress={() => {navigation.navigate('home_me_follows_request', {data: total_data, goback: this.init.bind(this)})}}
                        //     activeOpacity={.5}>
                        //     <Text style={{
                        //         backgroundColor: COLOR_BLUE_XL,
                        //         paddingTop: N_15,
                        //         paddingBottom: N_15,
                        //         textAlign: 'center',
                        //         fontSize: N_16,
                        //     }}>
                        //         {total_data.length}{t.invite_you_to_pay_attention_to_them}
                        //     </Text>
                        // </TouchableOpacity>
                    }
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        follows: state.User_follows,
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({
            user_follows_search,
            user_follows_cancel,
            user_be_invite_me,
        }, dispatch),
    })
)(Follows)

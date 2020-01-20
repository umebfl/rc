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
import Content from '../../../../component/layout/content'
import Loading from '../../../../component/loading/normal'
import {user_fans_search, user_fans_be_invite} from '../../../../reducer/user/fans'
import conf from '../../../../../../conf.js'

const SRC_SEARCH = require('../../../../../../content/img/more/search.png')
const SRC_DEFAULT = require('../../../../../../content/img/icon/default.jpg')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_ATTENTION = require('../../../../../../content/img/icon_address_book/attention.png')

import {
    N_14,
    N_15,
    N_20,
    N_22,
    N_16,
    COLOR_GRAY,
    COLOR_BLUE_XL,
    COLOR_MAIN,
} from '../../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../../lib/fetch'

const USER_FANS_PATH = '/users/fans'
const USER_FANS_BE_INVITE_PATH = '/users/fans/be-invite'

class Fans extends Component {

    constructor(prop) {
        super(prop)
        this.state = {}
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    }

    componentWillMount() {
        this.init()
    }

    init() {
        // 申请粉丝数量
        _fetch({
            fetch_type: 'GET',
            path: USER_FANS_BE_INVITE_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.user_fans_be_invite(rv)
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })

        // 请求粉丝列表
        _fetch({
            fetch_type: 'GET',
            path: USER_FANS_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                // alert(JSON.stringify(rv))
                this.props.action.user_fans_search(rv)
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
            fans: {
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
                    }}
                    center_option={{
                        text: t.my_fans,
                    }}
                    right_option={{
                        source: SRC_ATTENTION,
                        handle_press: () => this.props.navigation.navigate('home_me_fans_search'),
                        icon_style: {
                            width: N_22,
                            height: N_22,
                        }
                    }}/>

                <Content>
                    {
                        inited && R.isEmpty(data)
                        ? <View style={{
                             flex: 1,
                             alignItems: 'center',
                             paddingTop: N_15,
                        }}>
                            <Text style={{
                                fontSize: N_14,
                                color: COLOR_GRAY,
                            }}>{t.no_fans}~</Text>
                        </View>
                        : null
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
                                <Divider_list
                                    key={v.fans_id}
                                    show_marginBottom={true}
                                    is_border_radius={true}
                                    show_bottom_border={true}
                                    data={[
                                        {
                                            img_type: 'url',
                                            img_src: v.avatar,
                                            title_left: v.Name,
                                            show_right_text: false,
                                            image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                            on_icon_press: () => navigation.navigate('home_more_addressbook_personal_details', {id: v.fans_id}),
                                            on_press: () => navigation.navigate('home_more_addressbook_personal_details', {id: v.fans_id}),
                                        }
                                    ]}/>
                            )
                        }
                        dataSource={this.ds.cloneWithRows(data)}>
                    </ListView>

                    {
                        R.isEmpty(total_data)
                        ? null
                        : <TouchableOpacity
                            onPress={() => {navigation.navigate('home_me_fans_request', {data: total_data, goback: this.init.bind(this)})}}
                            activeOpacity={.5}>
                            <Text style={{
                                backgroundColor: COLOR_BLUE_XL,
                                paddingTop: N_15,
                                paddingBottom: N_15,
                                textAlign: 'center',
                                fontSize: N_16,
                            }}>
                                {total_data.length}{t.apply_to_be_your_fan}
                            </Text>
                        </TouchableOpacity>
                    }
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        fans: state.User_fans,
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({user_fans_search, user_fans_be_invite}, dispatch),
    })
)(Fans)

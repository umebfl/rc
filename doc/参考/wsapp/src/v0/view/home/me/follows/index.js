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
    TextInput,
    Image,
} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'

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
import style from './style.js'

const SRC_ARROW_RIGHT_GRAY = require('../../../../../../content/img/icon/arrow_right_gray.png')
import SRC_CANCEL from '../../../../../../content/img/icon_dairy/cancel.png'
import SRC_SEARCH from '../../../../../../content/img/icon_dairy/search.png'

import {
    N_2,
    N_3,
    N_4,
    N_6,
    N_10,
    N_12,
    N_14,
    N_15,
    N_16,
    N_20,
    N_22,
    N_26,
    N_60,
    N_80,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE_L,
    COLOR_BLUE_XL,
    COLOR_MAIN,

    BORDER_COLOR,
    BORDER_WIDTH,

    SCREEN_WIDTH,
} from '../../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../../lib/fetch'

const USER_FOLLOWS_PATH = '/users/favorites/'
const FAVORITES_PATH = '/users/favorites'
const USER_INVITE_ME_PATH = '/users/follows/be-invite'
const UERS_FAVORITES_SELECT_PATH = '/users/favorites/select'

class Follows extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            favorites_init: false,
            input_inited: true,
            list: [],
            followSelect: {},
            text: '',
        }
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    }

    componentDidMount() {
        this.hanle_follow()
        this.handle_follow_select()
    }

    // 选择关注的人列表
    handle_follow_select() {
        _fetch({
            fetch_type: 'GET',
            path: UERS_FAVORITES_SELECT_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            success: rv => {
                this.setState({
                    ...this.state,
                    init: true,
                    followSelect: rv,
                    list: R.values(rv),
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

    handle_search(text) {
        // 查询文本是否在结果集内
        var list = []

        if(R.isEmpty(this.state.followSelect)){
            this.setState({
                ...this.state,
                text: text,
            })
            return
        }

        this.state.followSelect.map(
            v => {
                if(v.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                    list.push(v)
                }
            }
        )

        this.setState({
            ...this.state,
            text: text,
            list,
        })

    }

    // 关注我的列表
    hanle_follow() {
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

    // 取消关注
    handle_cancel_favorites(employeeId, isFavorite) {
        const {
            i18n: {
                t,
            },
            follows: {
                data,
            },
        } = this.props

        _fetch({
            fetch_type: isFavorite ? 'POST' : 'DELETE',
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

    handle_change() {
        this.setState({
            ...this.state,
            input_inited: !this.state.input_inited,
            text: '',
        })

    }

    handle_cancel() {
        this.setState({
            ...this.state,
            input_inited: !this.state.input_inited,
            text: '',
        })
    }

    handle_goback() {
        this.hanle_follow()
        this.handle_follow_select()
    }

    // 跳转到搜索
    handle_go_search(list, text, handle) {

        if(text.length !== 0 && list.length === 0){
            toast('没有匹配的下属，请重新输入~', {position: 0})
            return
        }

        if(R.values(this.state.followSelect).length === 0){
            toast('已经没有可以关注的下属了~', {position: 0})
            return
        }

        dismissKeyboard()
        this.props.navigation.navigate('home_me_follows_search', {list: list.length === 0 ? R.values(this.state.followSelect) : list, text: text, goback: handle})
        this.setState({
            text: '',
        })
    }

    render() {
        const {
            input_inited,
            list,
            text,
        } = this.state

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
                    }}
                    center_option={{
                        text: t.my_concern,
                    }}/>

                <Content>
                    <View style={style.input_wrap}>
                        {
                            input_inited
                                ?<TouchableOpacity onPress={() => this.handle_change()} activeOpacity={.5}>
                                    <View style={style.search_wrap}>
                                        <Image source={SRC_SEARCH} style={style.search_img}/>
                                        <Text style={style.search_text}>搜索员工</Text>
                                    </View>
                                </TouchableOpacity>
                                : <View style={style.search_wrap_active}>
                                    <View style={style.search_input_wrap_active}>
                                        <View style={style.text_input_wrap}>
                                            <Image source={SRC_SEARCH} style={style.search_img_active}/>

                                            <TextInput
                                                style={style.text_input}
                                                maxLength={10}
                                                selectionColor='#BBBBBB'
                                                autoFocus='true'
                                                underlineColorAndroid='transparent'
                                                placeholderTextColor='#a6a6a6'
                                                value={this.state.text}
                                                onChangeText={this.handle_search.bind(this)}/>
                                        </View>

                                        <TouchableOpacity  onPress={() => this.handle_change()}  activeOpacity={.5}>
                                            <View style={style.search_img_active_wrap}>
                                                <Image source={SRC_CANCEL} style={style.search_img_active}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity onPress={() => this.handle_go_search(list, text, this.handle_goback.bind(this))}>
                                        <View style={style.search_sure}>
                                            <Text style={style.search_text}>搜索</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>

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
                                }}>没有关注的员工~</Text>
                            </View>
                            : null
                    }

                    <ListView
                        refreshControl={
                            <RefreshControl
                                onRefresh={this.hanle_follow.bind(this)}
                                refreshing={this.state._fetch_loading}
                                tintColor={COLOR_MAIN}
                                title={t.drop_refresh_data} />
                        }
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        renderRow={
                            v => (
                                <TouchableOpacity onPress={() => navigation.navigate('home_more_addressbook_personal_details', {id: v.employeeId, goback: this.hanle_follow.bind(this)})} activeOpacity={.5}>
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
                                                width={N_26}
                                                src={v.avatar}/>

                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                            }}>
                                                <Text
                                                    style={{
                                                        fontSize: N_14,
                                                        color: COLOR_GRAY_D,
                                                        paddingLeft: N_10,
                                                    }}>{v.name.length > 9 ? `${v.name.substr(0, 9)}...` : v.name}</Text>

                                                <Text
                                                    style={{
                                                        fontSize: N_12,
                                                        color: COLOR_GRAY,
                                                        paddingLeft: N_10,
                                                    }}>{v.jobCname.length > 9 ? `${v.jobCname.substr(0, 9)}...` : v.jobCname}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity activeOpacity={.5} onPress={this.handle_cancel_favorites.bind(this, v.employeeId, v.isFavorite)}>
                                            <View style={{
                                                width: N_80,
                                                padding: N_4,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: BORDER_WIDTH,
                                                borderColor:  v.isFavorite ? COLOR_MAIN : COLOR_GRAY,
                                                borderRadius: N_20,
                                            }}>
                                                <Text style={{
                                                    fontSize: N_12,
                                                    color: v.isFavorite ? COLOR_MAIN : COLOR_GRAY,
                                                }}>{v.isFavorite ? '+ 关注' : '已关注'}</Text>
                                            </View>
                                        </TouchableOpacity>

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

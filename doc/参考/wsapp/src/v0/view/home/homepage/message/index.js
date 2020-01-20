import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
} from 'react-native'

import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Header from '../../../../component/layout/header'
import Msg_list from '../../../../component/list/msg_list'

import {
    _fetch,
} from '../../../../lib/fetch'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

import {
    DATA_PATH,
    SRC_MSG_NOTIFIES,
    NOTICE_INIT_PAGE_NUMBER,
    homepage_message_init,
    homepage_message_search,
} from './reducer.js'

// const SRC_MSG_NOTIFIES = '/msg/notifies'
const SRC_MSG_NOTIFIES_COUNT = '/msg/notifies/count'

import SRC_SORT_TOP from '../../../../../../content/img/filter/sort-l-top.png'
import SRC_SORT_DOWN from '../../../../../../content/img/filter/sort-l-down.png'

import {
    COLOR_MAIN,

    BORDER_WIDTH,
    BORDER_COLOR,
    BORDER_SHADOW_COLOR,

    HEADER_HEIGHT,
    HEADER_BACKGROUND_COLOR,
    HEADER_TEXT_COLOR,
    HEADER_TEXT_ACTIVE_COLOR,
    HEADER_ICON_TOUCH_WIDTH,
    STATUSBAR_FILLUP_HEIGHT,

    COLOR_GRAY_XD,
    COLOR_GRAY,
    COLOR_GRAY_L,

    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_15,
    N_16,
    N_18,
    N_20,
    N_40,
    N_44,
} from '../../../../theme/ume-theme/variable.js'

class Notice extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            top_refreshing: false,
            order_type: 'desc',
        }
    }

    componentDidMount() {
        // this.init()
        this.handle_message_list()
    }

    search() {
        _fetch({
            fetch_type: 'GET',
            path: SRC_MSG_NOTIFIES,
            param: {
                employeeId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: this.props.notice.page_number + 1,
                order: this.state.order_type,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => this.props.action.homepage_message_search(rv),
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // 消息列表
    handle_message_list(order_type) {
        _fetch({
            fetch_type: 'GET',
            path: SRC_MSG_NOTIFIES,
            param: {
                employeeId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: NOTICE_INIT_PAGE_NUMBER,
                order: order_type ? order_type : 'desc',
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.homepage_message_init(rv)
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                    // 首次加载不出现加载icon
                    top_refreshing: payload._fetch_loading,
                })
            },
        })
    }

    handle_order() {

        const order_type = this.state.order_type === 'desc' ? 'asc' : 'desc'
        this.handle_message_list(order_type)

        this.setState({
            ...this.state,
            order_type,
        })

    }

    render() {
        const {
            navigation,
            notice: {
                inited,
                data,
                no_more_data,
            },
            auth,
            i18n: {
                t,
            },
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
                    text: t.news,
                }}
                right_option={{
                    content: (
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.handle_order()}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingRight: N_20,
                            }}>
                                <Text style={{
                                    fontSize: N_16,
                                    color: COLOR_MAIN,
                                    paddingRight: N_5,
                                }}>时间排序</Text>

                                <Image source={this.state.order_type === 'desc' ? SRC_SORT_DOWN : SRC_SORT_TOP} style={{width: N_15, height: N_18,}}/>

                            </View>
                        </TouchableOpacity>
                    )
                }}/>
                <Content>
                    <Msg_list
                        navigation={navigation}
                        data={data}
                        inited={inited}
                        fetch_error={this.state._fetch_error}
                        no_more_data={no_more_data}
                        top_refreshing={this.state.top_refreshing}
                        on_end_reached={this.search.bind(this)}
                        on_refresh={this.handle_message_list.bind(this)}/>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        notice: state.Homepage_message,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            homepage_message_init,
            homepage_message_search,
        }, dispatch),
    })
)(Notice)

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    Animated,
    TouchableOpacity,
} from 'react-native'

import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Header from '../../../../component/layout/header'
import Msg_list from '../../../../component/list/msg_list'

import {
    _fetch,
} from '../../../../lib/fetch'

import ume_theme from '../../../../theme/ume-theme'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

import {
    OA_INIT_PAGE_NUMBER,
    home_dynamic_todo_init_search,
    home_dynamic_todo_first_search,
    home_dynamic_todo_search,
    // home_dynamic_todo_search_total,
} from './reducer.js'

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
    COLOR_BLUE_XL,

    SCREEN_WIDTH,

    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_16,
    N_20,
    N_30,
    N_40,
    N_44,
    N_80,
} from '../../../../theme/ume-theme/variable.js'

import * as homepage_reducer from '../../homepage/reducer'

const DATA_PATH = '/oa/workflows'
const TOTAL_DATA_PATH = '/oa/workflows/total'

class Todo extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            top_refreshing: false,
            data_inited: true,
            scroll_y: null,
            fadeAnim:new Animated.Value(1),
            spaceAnim: new Animated.Value(30),
        }
    }

    componentDidMount() {
        this.init()
    }

    handle_goback() {
        this.get_init_search()
        this.get_oa_total()
    }

    init() {
        this.get_oa_total()
        this.get_first_search()
    }

    get_oa_total() {
        this.props.action.homepage_get_oa_count()
        // 获取待办数
        // _fetch({
        //     token: this.props.auth.info.token,
        //     lang: this.props.i18n.lang,
        //     fetch_type: 'GET',
        //     path: TOTAL_DATA_PATH,
        //     param: {
        //         wsId: this.props.auth.info.id,
        //     },
        //     success: rv => {
        //         this.props.action.home_dynamic_todo_search_total(rv)
        //     },
        //     error: () => { },
        // })
    }

    get_init_search() {
        // 获取第一页日志
        _fetch({
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,

            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: OA_INIT_PAGE_NUMBER,
            },
            success: rv => this.props.action.home_dynamic_todo_init_search(rv),
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

    get_first_search() {
        // 获取第一页日志
        _fetch({
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,

            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: OA_INIT_PAGE_NUMBER,
            },
            success: rv => this.props.action.home_dynamic_todo_first_search(rv),
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

    search() {
        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: this.props.todo.page_number + 1,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => this.props.action.home_dynamic_todo_search(rv),
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // hanlde_scroll(event) {
    //     let scrollView = event.nativeEvent
    //     let y = scrollView.contentOffset.y
    //
    //     if(y > 50) {
    //          Animated.parallel([
    //              Animated.spring(this.state.fadeAnim,{
    //                  toValue: 0,
    //                  duration: 200,
    //              }),
    //              Animated.spring(this.state.spaceAnim,{
    //                  toValue: 0,
    //                  duration: 200,
    //              })
    //          ]).start();
    //
    //     }else{
    //         Animated.parallel([
    //             Animated.spring(this.state.fadeAnim,{
    //                 toValue: 1,
    //                 duration: 200,
    //             }),
    //             Animated.spring(this.state.spaceAnim,{
    //                 toValue: 30,
    //                 duration: 200,
    //             })
    //         ]).start();
    //     }
    //
    //     this.setState({
    //         scroll_y: y,
    //     })
    // }

    render() {
        const {
            navigation,
            todo: {
                inited,
                data,
                total_data,
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
                        //     fontSize: N_16,
                        // },
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: 'OA',
                    }}
                    right_option={{
                        content: (
                            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('home_more_oa')}>
                                <View style={{
                                    paddingRight: N_20,
                                }}>
                                    <Text style={{
                                        fontSize: N_16,
                                        color: COLOR_MAIN,
                                    }}>新建流程</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}/>

                <Content>
                    {
                        // total_data
                        //     ? <Animated.View style={{
                        //         position: 'absolute',
                        //         opacity: this.state.fadeAnim,
                        //         zIndex: 100,
                        //         top: 0,
                        //         left: 0,
                        //         alignItems:'center',
                        //         justifyContent: 'center',
                        //         width: SCREEN_WIDTH,
                        //         height: N_30,
                        //         backgroundColor: COLOR_BLUE_XL,
                        //     }}>
                        //         <Text style={ume_theme.tip_text}>
                        //             {t.total}{total_data}{t.item_todo}
                        //         </Text>
                        //     </Animated.View>
                        //     : null
                    }

                    <Msg_list
                        handle_goback={this.handle_goback.bind(this)}
                        navigation={navigation}
                        data={data}
                        inited={inited}
                        fetch_error={this.state._fetch_error}
                        no_more_data={no_more_data}
                        top_refreshing={this.state.top_refreshing}
                        on_end_reached={this.search.bind(this)}
                        // on_scroll={(event) => {
                        //     this.hanlde_scroll(event);
                        // }}
                        on_refresh={this.init.bind(this)}/>
            </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        todo: state.Dynamic_todo,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_dynamic_todo_init_search,
            home_dynamic_todo_first_search,
            home_dynamic_todo_search,
            // home_dynamic_todo_search_total,
            ...homepage_reducer,
        }, dispatch),
    })
)(Todo)

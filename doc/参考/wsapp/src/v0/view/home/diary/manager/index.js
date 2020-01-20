import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
} from 'react-native'

import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Header from '../../../../component/layout/header'
import Diary_list from '../../../../component/list/diary_list'
import Filter_bar, {
    PARAM_TYPE_DIRECT,
    PARAM_ADVANCE,
    PARAM_READ_EVALUATE,
    PARAM_TYPE,
    PARAM_READ_EVALUATE_TYPE_NOREAD,
    PARAM_READ_EVALUATE_TYPE_NOEVALUATE,
    PARAM_READ_EVALUATE_TYPE_EVALUATE,
} from './filter_bar'
import {
    FILTER_HEIGHT,
} from '../../../../component/filter/filter_bar/normal'

import {
    PAGE_SIZE,
    SCREEN_WIDTH,
} from '../../../../../variable.js'

import {
    OA_INIT_PAGE_NUMBER,
    home_diary_manager_init,
    home_diary_manager_search,
    home_diary_manager_clear,
} from './reducer.js'

import {
    _fetch,
} from '../../../../lib/fetch'

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
    N_20,
    N_40,
    N_44,
} from '../../../../theme/ume-theme/variable.js'

export const MANAGER_TYPE = 'manager'

const DATA_PATH = '/logs/list'

export const build_bar_filter_param = prop => {
    let type = {
        // type: null,
    }
    let is_read = {
        // read: null,
    }
    let is_evaluate = {
        // evaluate: null,
    }
    // let dep
    // let empGrade
    const bar_filter_data = prop.filter.data

    bar_filter_data.map(
        v => {
            if(v.id === PARAM_READ_EVALUATE) {
                const k = v.data[v.active].k

                if(k === PARAM_READ_EVALUATE_TYPE_NOREAD) {
                    is_read = {
                        read: 0,
                    }
                } else if(k === PARAM_READ_EVALUATE_TYPE_NOEVALUATE) {
                    is_evaluate = {
                        evaluate: 0,
                    }
                } else if(k === PARAM_READ_EVALUATE_TYPE_EVALUATE) {
                    is_evaluate = {
                        evaluate: 1,
                    }
                }
            } else if(v.id === PARAM_TYPE) {
                const val = v.data[v.active].v

                if(val !== '') {
                    type = {
                        type: val,
                    }
                }
            }
        }
    )

    return {
        ...type,
        ...is_read,
        ...is_evaluate,
    }
}

export const build_drawer_filter_param = prop => {
    const filter_active = prop.filter.drawer.active
    let param = {}

    if(filter_active.dep_active !== null) {
        param = {
            ...param,
            dep: prop.filter.drawer.dep_data[filter_active.dep_active].id
        }
    }

    if(filter_active.seq_active !== null) {
        param = {
            ...param,
            empGrade: filter_active.seq_active,
        }
    }

    return param
}

class Manager extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            top_refreshing: false,
        }
    }

    // componentDidMount() {
    //     this.init()
    // }

    handle_init_search(param) {
        this.props.action.home_diary_manager_clear()
        this.init_search(param || this.build_filter_param(this.props))
    }

    init_search(param) {

        // if(!R.isEmpty(this.filter_param)) {
        // }

        // if(param) {

            // if(typeof param.type === 'undefined') {
            //     this.filter_param = R.dissoc('type')(this.filter_param)
            // }
            // if(typeof param.dep === 'undefined') {
            //     this.filter_param = R.dissoc('dep')(this.filter_param)
            // }
            // if(typeof param.empGrade === 'undefined') {
            //     this.filter_param = R.dissoc('empGrade')(this.filter_param)
            // }
        // }

        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: OA_INIT_PAGE_NUMBER,
                ...param,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.home_diary_manager_init(rv.lists)
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

    search() {
        const param = this.build_filter_param(this.props)

        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: this.props.manager.page_number + 1,
                ...param,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => this.props.action.home_diary_manager_search(rv),
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    build_filter_param(prop) {
        const bar_param = build_bar_filter_param(prop)
        const drawer_param = build_drawer_filter_param(prop)

        return {
            ...bar_param,
            ...drawer_param,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let param = {}

        const bar_filter_data = this.props.filter.data
        const bar_next_filter_data = nextProps.filter.data

        const filter_active = this.props.filter.drawer.active
        const next_filter_active = nextProps.filter.drawer.active

        // 处理全部取消参数的情况
        let diff = false

        // 普通过滤
        const bar_filter_active = R.map(
            R.prop('active')
        )(bar_filter_data)

        const bar_next_filter_active = R.map(
            R.prop('active')
        )(bar_next_filter_data)

        if(!R.equals(bar_filter_active, bar_next_filter_active) || JSON.stringify(filter_active) !== JSON.stringify(next_filter_active)) {
            const bar_param = build_bar_filter_param(nextProps)
            const drawer_param = build_drawer_filter_param(nextProps)
            param = {
                ...param,
                ...bar_param,
                ...drawer_param,
            }
            diff = true
        }

        if(diff || !R.isEmpty(param)) {
            this.handle_init_search(param)
            return false
        }

        return true
    }

    render() {
        const {
            navigation,
            manager: {
                data,
                inited,
                _fetch_error,
                no_more_data,
            },
            auth,
            i18n: {
                t,
            },
        } = this.props

        return (
            <Content style={{
                paddingTop: 0,
            }}>

                <Filter_bar navigation={navigation}/>

                <View style={{
                    // marginTop: FILTER_HEIGHT,
                    // position: 'absolute',
                    flex: 1,
                    marginTop: FILTER_HEIGHT,
                }}>
                    <Diary_list
                        type={MANAGER_TYPE}
                        navigation={navigation}
                        data={data}
                        inited={inited}
                        fetch_error={this.state._fetch_error}
                        no_more_data={no_more_data}
                        top_refreshing={this.state.top_refreshing}
                        on_end_reached={this.search.bind(this)}
                        on_refresh={this.handle_init_search.bind(this)}/>
                </View>
            </Content>
        )
    }
}

export default connect(
    state => ({
        manager: state.Diary_manager,
        filter: state.Diary_manager_filter,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_diary_manager_init,
            home_diary_manager_search,
            home_diary_manager_clear,
        }, dispatch),
    })
)(Manager)

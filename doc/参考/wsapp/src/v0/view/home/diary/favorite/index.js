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

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

import {
    OA_INIT_PAGE_NUMBER,
    home_diary_favorite_init,
    home_diary_favorite_search,
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

const DATA_PATH = '/logs/follows'

export const FAVORITE_TYPE = 'favorite'

class Favorite extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            top_refreshing: false,
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: OA_INIT_PAGE_NUMBER,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.home_diary_favorite_init(rv)
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
        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            param: {
                wsId: this.props.auth.info.id,
                pageSize: PAGE_SIZE,
                pageNumber: this.props.favorite.page_number + 1,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => this.props.action.home_diary_favorite_search(rv),
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
            navigation,
            favorite: {
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
                <Diary_list
                    type={FAVORITE_TYPE}
                    navigation={navigation}
                    data={data}
                    inited={inited}
                    fetch_error={this.state._fetch_error}
                    no_more_data={no_more_data}
                    top_refreshing={this.state.top_refreshing}
                    on_end_reached={this.search.bind(this)}
                    on_refresh={this.init.bind(this)}/>
            </Content>
        )
    }
}

export default connect(
    state => ({
        favorite: state.Diary_favorite,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({
            home_diary_favorite_init,
            home_diary_favorite_search,
        }, dispatch),
    })
)(Favorite)

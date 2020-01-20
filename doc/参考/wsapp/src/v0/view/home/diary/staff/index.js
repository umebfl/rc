import React, {
    Component,
} from 'react'

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import * as reducer from './reducer'

import Loading from '../../../../component/loading/normal'
import Filter_bar from '../../../../component/filter/filter_bar/normal'
import Diary_list from '../../../../component/list/diary_list'
import {
    FILTER_HEIGHT,
} from '../../../../component/filter/filter_bar/normal'

export const MANAGER_TYPE = 'manager'

class Staff extends Component {

    componentDidMount() {
        this.props.action.home_diary_staff_list_refresh()
    }

    render() {
        const {
            data: {
                filter_bar_data,
                filter_drawer_data,
                _fetch_loading,
                _fetch_error,
                list,
                inited,
                no_more_data,
                top_refreshing,
                type,
            },
            action: {
                home_diary_staff_select,
                home_diary_staff_list_next,
                home_diary_staff_list_refresh,
                home_diary_staff_top_refreshing_set,
            },
            navigation,
        } = this.props

        return (
            <View style={{
                flex: 1,
            }}>
                <Filter_bar
                    data={{
                        data: filter_bar_data,
                        drawer: filter_drawer_data,
                    }}
                    navigation={this.props.navigation}
                    handle_select={home_diary_staff_select}/>

                <Loading visiable={inited && !top_refreshing && _fetch_loading && type !== 'append'}/>

                <View style={{
                    flex: 1,
                    marginTop: FILTER_HEIGHT,
                }}>
                    <Diary_list
                        type={MANAGER_TYPE}
                        navigation={navigation}
                        data={list}
                        no_more_data={no_more_data}
                        on_end_reached={home_diary_staff_list_next}
                        fetch_error={_fetch_error}
                        inited={inited}
                        top_refreshing={top_refreshing}
                        on_refresh={home_diary_staff_list_refresh}/>
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        data: state.Diary_staff,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(Staff)

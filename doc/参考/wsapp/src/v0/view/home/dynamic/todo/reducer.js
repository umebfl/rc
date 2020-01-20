import R from 'ramda'
import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

import * as Jpush from '../../../../lib/jpush'

// 起始分页页码
export const OA_INIT_PAGE_NUMBER = 1

const init_state = {
    // 初始化状态
    inited: false,
    // 分页页码
    page_number: OA_INIT_PAGE_NUMBER,
    // 数据
    data: [],
    // 没有更多数据
    no_more_data: false,
    // 待办总数
    total_data: 0,
}

// 状态清理
export const home_dynamic_todo_clean = createAction('home_dynamic_todo_clean')
// 列表初始化
export const _home_dynamic_todo_init_search = createAction('_home_dynamic_todo_init_search')
export const home_dynamic_todo_init_search = payload => (dispatch, getState) => {
    const state = getState()
    const title = state.I18n.t['待办']
    dispatch(_home_dynamic_todo_init_search({title, data: payload}))
}
// 列表初始化
export const _home_dynamic_todo_first_search = createAction('_home_dynamic_todo_first_search')
export const home_dynamic_todo_first_search = payload => (dispatch, getState) => {
    const state = getState()
    const title = state.I18n.t['待办']
    dispatch(_home_dynamic_todo_first_search({title, data: payload}))
}
// 下拉刷新
export const _home_dynamic_todo_search = createAction('_home_dynamic_todo_search')
export const home_dynamic_todo_search = payload => (dispatch, getState) => {
    const state = getState()
    const title = state.I18n.t['待办']
    dispatch(_home_dynamic_todo_search({title, data: payload}))
}
// 待办数量
// export const home_dynamic_todo_search_total = createAction('home_dynamic_todo_search_total')

// 构建列表数据
const build_data = (data, title) => R.map(v => ({
    text: v.title,
    time: v.date,
    finish: v.status === 1 ? false : true,
    open: {
        path: 'home_dynamic_todo_detail',
        url: v.link,
        // title: `${v.title.substring(0, 10)}...`,
        title: title,
        finish: v.status === 1 ? false : true,
    },
}))(data === null ? [] : data)

export default handleActions({

    [home_dynamic_todo_clean]: () => init_state,

    // [home_dynamic_todo_search_total]: (state, {payload}) => {
    //     Jpush.setBadge(payload)
    //
    //     return {
    //         ...state,
    //         total_data: payload,
    //     }
    // },

    [_home_dynamic_todo_init_search]: (state, {payload}) => ({
        ...init_state,
        total_data: state.total_data,
        inited: true,
        page_number: OA_INIT_PAGE_NUMBER,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: build_data(payload.data, payload.title),
    }),

    [_home_dynamic_todo_first_search]: (state, {payload}) => ({
        ...state,
        inited: true,
        page_number: OA_INIT_PAGE_NUMBER,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: build_data(payload.data, payload.title),
    }),

    [_home_dynamic_todo_search]: (state, {payload}) => ({
        ...state,
        inited: true,
        page_number: state.page_number + 1,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: R.concat(
            state.data,
            build_data(payload.data, payload.title)
        ),
    }),

}, init_state)

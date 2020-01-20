import R from 'ramda'
import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

export const DATA_PATH = '/news'

// 起始分页页码
export const NOTICE_INIT_PAGE_NUMBER = 0

const init_state = {
    inited: false,
    page_number: NOTICE_INIT_PAGE_NUMBER,
    data: [],
}

// 状态清理
export const home_dynamic_notice_clean = createAction('home_dynamic_notice_clean')
// 列表初始化
export const home_dynamic_notice_init = createAction('home_dynamic_notice_init')
// 下拉刷新
export const home_dynamic_notice_search = createAction('home_dynamic_notice_search')

const build_data = data => R.map(v => ({
    text: v.title,
    time: v.updated,
    type: v.depCname,
    finish: true,
    open: {
        path: 'home_dynamic_notice_detail',
        url: `${DATA_PATH}/${v.id}`,
        full_title: v.title,
    },
}))(data === null ? [] : data)

export default handleActions({

    [home_dynamic_notice_clean]: () => init_state,

    [home_dynamic_notice_init]: (state, {payload}) => ({
        ...init_state,
        inited: true,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: build_data(payload),
    }),

    [home_dynamic_notice_search]: (state, {payload}) => ({
        ...state,
        inited: true,
        page_number: state.page_number + 1,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: R.concat(
            state.data,
            build_data(payload)
        ),
    }),

}, init_state)

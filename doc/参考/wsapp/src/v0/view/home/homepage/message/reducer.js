import R from 'ramda'
import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

export const DATA_PATH = '/news'
export const SRC_MSG_NOTIFIES = '/msg/notifies'

// 起始分页页码
export const NOTICE_INIT_PAGE_NUMBER = 1

import {ME_TYPE,} from '../../diary/me'

const init_state = {
    inited: false,
    page_number: NOTICE_INIT_PAGE_NUMBER,
    data: [],
}

// 状态清理
export const homepage_message_clean = createAction('homepage_message_clean')
// 列表初始化
export const homepage_message_init = createAction('homepage_message_init')
// 下拉刷新
export const homepage_message_search = createAction('homepage_message_search')
// 设置已读
export const homepage_message_set_read = createAction('homepage_message_set_read')

const build_data = data => R.map(v => ({
    text: v.content,
    time: v.createAt,
    // type: v.depCname,
    finish: v.read === '1' ? true : false,
    open: {
        path: 'home_diary_diary_content',
        url: `${SRC_MSG_NOTIFIES}/${v.user}`,
        full_title: v.title,
        id: v.logId,
        notifyId: v.id,
        ws_id: v.user,
        row_index: null,
        type: ME_TYPE,
        job_cname: null,
        name: null,
    },
}))(data === null ? [] : data)

export default handleActions({

    [homepage_message_clean]: () => init_state,

    [homepage_message_set_read]: (state, {payload}) => {
        return {
            ...state,
            data: R.map(
                v => {
                    if(v.open.notifyId === payload) {
                        return {
                            ...v,
                            finish: 'xx',
                        }
                    } else {
                        return v
                    }
                }
            )(state.data)
        }
    },

    [homepage_message_init]: (state, {payload}) => ({
        ...init_state,
        inited: true,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: build_data(payload),
    }),

    [homepage_message_search]: (state, {payload}) => ({
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

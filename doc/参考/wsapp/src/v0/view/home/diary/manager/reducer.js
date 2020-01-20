import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'
import {
    PAGE_SIZE,
} from '../../../../../variable.js'

import {
    set_log_state,
} from '../favorite/reducer.js'

export const OA_INIT_PAGE_NUMBER = 0

const init_state = {
    inited: false,
    page_number: OA_INIT_PAGE_NUMBER,
    data: [],
    search_list_update_flag: false,
    ids: [],
}

export const home_diary_manager_clear = createAction('home_diary_manager_clear')
export const home_diary_manager_init = createAction('home_diary_manager_init')
export const home_diary_manager_search = createAction('home_diary_manager_search')
export const home_diary_manager_detail_ids = createAction('home_diary_manager_detail_ids')
export const home_diary_manager_set_log_state = createAction('home_diary_manager_set_log_state')

export const set_show_date = data => {
    let cur_date = ''

    return R.map(
        v => {
            let show_date = false

            if(cur_date !== v.date) {
                cur_date = v.date
                show_date = true
            }

            return {
                ...v,
                show_date,
            }
        }
    )(data)
}

const build_data =
    data => data === null
                ? init_state.data
                : data

export default handleActions({

    [home_diary_manager_clear]: (state, {payload}) => init_state,

    [home_diary_manager_detail_ids]: (state, {payload}) => ({
        ...state,
        search_list_update_flag: false,
        ids: payload,
    }),

    [home_diary_manager_init]: (state, {payload}) => ({
        ...init_state,
        inited: true,
        search_list_update_flag: true,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: set_show_date(build_data(payload)),
    }),

    [home_diary_manager_search]: (state, {payload}) => ({
        ...state,
        inited: true,
        page_number: state.page_number + 1,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: payload
            ? set_show_date(
                R.concat(
                    state.data,
                    build_data(payload)
                )
            )
            : state.data,
    }),

    [home_diary_manager_set_log_state]: (state, {payload}) => ({
        ...state,
        data: R.adjust(R.assoc(payload.k, payload.v), payload.row_index, state.data),
    }),

}, init_state)

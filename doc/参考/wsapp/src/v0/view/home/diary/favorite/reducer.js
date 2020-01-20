import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

import {
    set_show_date,
} from '../manager/reducer.js'

export const OA_INIT_PAGE_NUMBER = 0

const init_state = {
    inited: false,
    page_number: OA_INIT_PAGE_NUMBER,
    data: [],
    search_list_update_flag: true,
    ids: [],
}

export const home_diary_favorite_init = createAction('home_diary_favorite_init')
export const home_diary_favorite_search = createAction('home_diary_favorite_search')
export const home_diary_favorite_set_log_state = createAction('home_diary_favorite_set_log_state')
export const home_diary_favorite_detail_ids = createAction('home_diary_favorite_detail_ids')

const build_data = data => data === null ? init_state.data : data

export default handleActions({

    [home_diary_favorite_detail_ids]: (state, {payload}) => ({
        ...state,
        search_list_update_flag: false,
        ids: payload,
    }),

    [home_diary_favorite_init]: (state, {payload}) => ({
        ...init_state,
        inited: true,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: payload ? set_show_date(build_data(payload)) : init_state.data,
    }),

    [home_diary_favorite_search]: (state, {payload}) => ({
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

    [home_diary_favorite_set_log_state]: (state, {payload}) => ({
        ...state,
        data: R.adjust(R.assoc(payload.k, payload.v), payload.row_index, state.data),
    }),

}, init_state)

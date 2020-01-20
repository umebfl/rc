import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import {
    PAGE_SIZE,
} from '../../../../../variable.js'

export const OA_INIT_PAGE_NUMBER = 0

const init_state = {
    inited: false,
    page_number: OA_INIT_PAGE_NUMBER,
    data: [],
    search_list_update_flag: true,
    ids: [],
}

export const home_diary_me_init = createAction('home_diary_me_init')
export const home_diary_me_search = createAction('home_diary_me_search')
export const home_diary_me_detail_ids = createAction('home_diary_me_detail_ids')

const build_data = data => data === null ? init_state.data : data

export default handleActions({

    [home_diary_me_detail_ids]: (state, {payload}) => ({
        ...state,
        search_list_update_flag: false,
        ids: payload,
    }),

    [home_diary_me_init]: (state, {payload}) => ({
        ...init_state,
        inited: true,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: payload ? build_data(payload) : init_state.data,
    }),

    [home_diary_me_search]: (state, {payload}) => ({
        ...state,
        inited: true,
        page_number: state.page_number + 1,
        no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
        data: payload
            ? R.concat(
                state.data,
                build_data(payload)
            )
            : state.data,
    }),

}, init_state)

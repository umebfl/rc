import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'
import {
    PAGE_SIZE,
} from '../../../../../variable.js'

export const INIT_PAGE_NUMBER = 0

const init_state = {
    inited: false,
    page_number: INIT_PAGE_NUMBER,
    data: [],

    search_list_update_flag: false,
    ids: [],
}

const build_data = data => data === null ? init_state.data : data

export const home_diary_more_init = createAction('home_diary_more_init')
export const home_diary_more_search = createAction('home_diary_more_search')
export const home_diary_more_detail_ids = createAction('home_diary_more_detail_ids')

export default handleActions({

    [home_diary_more_init]: (state, {payload}) => {
        return ({
            ...init_state,
            no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
            inited: true,
            data: build_data(payload),
            search_list_update_flag: true,
        })
    },

    [home_diary_more_search]: (state, {payload}) => {
        return ({
            ...state,
            page_number: state.page_number + 1,
            no_more_data: payload === null || payload && payload.length < PAGE_SIZE,
            data: payload
                ? R.concat(
                    state.data,
                    build_data(payload)
                )
                : state.data,
        })
    },

    [home_diary_more_detail_ids]: (state, {payload}) => ({
        ...state,
        search_list_update_flag: false,
        ids: payload,
    }),

}, init_state)

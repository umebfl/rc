import R from 'ramda'

import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    _fetch,
} from '../../../lib/fetch'

import {
    homepage_message_set_read,
} from './message/reducer'

import * as Jpush from '../../../lib/jpush'

const MAX_COUNT_TEXT = 99

const OA_PATH = '/oa/workflows/total'
const MSG_PATH = '/msg/notifies/unread/count'
const MSG_READ_PATH = '/msg/notifies/status'


const init_state = {
    msg_count: 0,
    oa_count: 0,
    msg_count_text: null,
    oa_count_text: null,
    tab_count_text: null,
}

export const _homepage_set_msg_read = createAction('_homepage_set_msg_read')
export const homepage_set_msg_read = (payload) => (dispatch, getState) => {
    const state = getState()

    const {
        Auth: {
            info: {
                id,
                token,
            },
        },
        I18n: {
            lang,
        },
    } = state

    _fetch({
        fetch_type: 'POST',
        path: MSG_READ_PATH,
        param: {
            notifyId: payload,
        },
        token,
        lang,
        success: rv => {
            if(rv === 'true') {
                dispatch(homepage_message_set_read(payload))
                dispatch(_homepage_set_msg_read(rv))
            }
        },
    })
}

export const _homepage_get_oa_count = createAction('homepage_get_oa_count')
export const homepage_get_oa_count = (payload) => (dispatch, getState) => {
    const state = getState()

    const {
        Auth: {
            info: {
                id,
                token,
            },
        },
        I18n: {
            lang,
        },
    } = state

    _fetch({
        fetch_type: 'GET',
        path: OA_PATH,
        param: {
            wsId: id,
        },
        token,
        lang,
        success: rv => dispatch(_homepage_get_oa_count(rv)),
    })
}

export const _homepage_get_msg_count = createAction('homepage_get_msg_count')
export const homepage_get_msg_count = (payload) => (dispatch, getState) => {
    const state = getState()

    const {
        Auth: {
            info: {
                id,
                token,
            },
        },
        I18n: {
            lang,
        },
    } = state

    _fetch({
        fetch_type: 'GET',
        path: MSG_PATH,
        param: {
            employeeId: id,
        },
        token,
        lang,
        success: rv => dispatch(_homepage_get_msg_count(rv)),
    })
}

const get_string = (a = 0, b = 0) => {
    const total = a + b
    return total > MAX_COUNT_TEXT ? '99+' : total
}

export default handleActions({

    [_homepage_set_msg_read]: (state, {payload}) => ({
        ...state,
        msg_count: state.msg_count - 1,
        msg_count_text: get_string(state.msg_count - 1 : state.msg_count),
        tab_count_text: get_string((state.msg_count - 1 : state.msg_count) + state.oa_count),
    }),

    [_homepage_get_oa_count]: (state, {payload}) => {
        Jpush.setBadge(state.msg_count + payload)

        return {
            ...state,
            oa_count: payload,
            oa_count_text: get_string(payload),
            tab_count_text: get_string(state.msg_count + payload),
        }
    },

    [_homepage_get_msg_count]: (state, {payload}) => {
        Jpush.setBadge(state.oa_count + payload)

        return {
            ...state,
            msg_count: payload,
            msg_count_text: get_string(payload),
            tab_count_text: get_string(state.oa_count + payload),
        }
    },

}, init_state)

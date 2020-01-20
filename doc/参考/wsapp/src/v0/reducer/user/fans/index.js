import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    data: [],
    total_data: {},
    inited: false,
}

export const user_fans_search = createAction('user_fans_search')
export const user_fans_be_invite = createAction('user_fans_be_invite')

export default handleActions({

    [user_fans_be_invite]: (state, {payload}) => ({
        ...state,
        total_data: payload,
    }),

    [user_fans_search]: (state, {payload}) => ({
        ...state,
        data: payload === null ? init_state.data : payload,
        inited: true,
    }),

}, init_state)

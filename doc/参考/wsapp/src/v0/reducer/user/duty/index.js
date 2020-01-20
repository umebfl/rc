import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    data: [],
}

export const user_duty_init = createAction('user_duty_init')

export default handleActions({

    [user_duty_init]: (state, {payload}) => ({
        ...state,
        data: payload,
    }),

}, init_state)

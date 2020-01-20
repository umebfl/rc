import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    data: [],
}

export const field_sign_info_init = createAction('field_sign_info_init')

export default handleActions({

    [field_sign_info_init]: (state, {payload}) => ({
        ...state,
        data: payload,
    }),

}, init_state)

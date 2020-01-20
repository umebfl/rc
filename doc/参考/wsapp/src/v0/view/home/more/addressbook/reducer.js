import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    data: [],
    inited: false,
}

export const users_contacts_init = createAction('users_contacts_init')


export default handleActions({

    [users_contacts_init]: (state, {payload}) => ({
        ...state,
        data: payload ? payload : init_state.data,
        inited: true,
    }),

}, init_state)

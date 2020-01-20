import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    data: [],
}

export const users_contacts_search_init = createAction('users_contacts_search_init')


export default handleActions({

    [users_contacts_search_init]: (state, {payload}) => ({
        ...state,
        data: payload,
    }),

}, init_state)

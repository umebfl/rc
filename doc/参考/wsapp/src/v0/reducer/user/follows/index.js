import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    data: [],
    total_data: {},
    inited: false,
}

export const user_follows_search = createAction('user_follows_search')
export const user_follows_cancel = createAction('user_follows_cancel')
export const user_be_invite_me = createAction('user_be_invite_me')
export const user_invite_me = createAction('user_invite_me')

export default handleActions({

    [user_be_invite_me]: (state, {payload}) => ({
        ...state,
        total_data: payload,
    }),

    [user_follows_search]: (state, {payload}) => ({
        ...state,
        data: payload === null ? init_state.data : payload,
        inited: true,
    }),

    [user_follows_cancel]: (state, {payload}) => {
        return ({
            ...state,
            data: R.map(
                    R.ifElse(
                        v => R.equals(payload)(v.employeeId),
                        v => R.assoc('isFavorite', v.isFavorite? 0 : 1, v),
                        v => v,
                    )
            )(state.data)
        })
    }
}, init_state)

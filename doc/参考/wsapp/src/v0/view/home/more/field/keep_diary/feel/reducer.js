import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    feel: 2, // 0...5
}

export const feel_init = createAction('feel_init')

export const home_more_field_diary_set = createAction('home_more_field_diary_set')

export default handleActions({

    [feel_init]: () => init_state,

    [home_more_field_diary_set]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),

}, init_state)

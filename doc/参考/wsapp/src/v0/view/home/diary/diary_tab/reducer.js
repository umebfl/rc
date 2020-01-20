import {createAction, handleActions} from 'redux-actions'

import {
    set,
} from '../../../../lib/persist'
import {
    SHOW_DUTY,
} from '../../../../lib/persist/constant'

const init_state = {
    name: '',
    job: '',
    show_duty: true,
}

export const home_diary_tab_set = createAction('home_diary_tab_set')
export const init_show_duty = createAction('init_home_diary_tab_show_duty')
export const home_diary_tab_show_duty = createAction('home_diary_tab_show_duty')

export default handleActions({

    [home_diary_tab_set]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),

    [init_show_duty]: (state, {payload}) => {

        let show_duty = payload

        if(!payload) {
            show_duty = true
        }

        // set(SHOW_DUTY, show_duty)

        return {
            ...state,
            show_duty,
        }
    },

    [home_diary_tab_show_duty]: (state, {payload}) => {

        let show_duty = state.show_duty === 'true' ? 'false' : 'true'

        set(SHOW_DUTY, show_duty)

        return {
            ...state,
            show_duty,
        }
    },

}, init_state)

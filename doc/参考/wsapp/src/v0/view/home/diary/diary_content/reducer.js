import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    log_content: {},
}

export const home_diary_log_content_set = createAction('home_diary_log_content_set')

export default handleActions({

    [home_diary_log_content_set]: (state, {payload}) => {

        return {
            ...state,
            log_content: {
                ...state.log_content,
                [payload.k]: payload.v,
            },
        }
    },

}, init_state)

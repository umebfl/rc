import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    tip: 0, // 0...5
    suggest: '',
}

export const home_me_setting_feedback_type = createAction('home_me_setting_feedback_type')

export const feedback_suggest = createAction('feedback_suggest')

export const setting_feedback_clean = createAction('setting_feedback_clean')

export default handleActions({

    [setting_feedback_clean]: () => init_state,

    [feedback_suggest]: (state, {payload}) => ({
        ...state,
        suggest: payload,
    }),

    [home_me_setting_feedback_type]: (state, {payload}) => ({
        ...state,
        tip: payload,
    }),

}, init_state)

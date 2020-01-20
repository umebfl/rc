import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    feel: 2, // 0...5
    weibo: true,
    duty_log: {},
    duty_len: 0,
    experience: '',
    suggestion: '',
    plan: '',
}

export const home_more_field_diary_set = createAction('home_more_field_diary_set')

export const set_duty_log = createAction('home_more_field_diary_set_duty_log')

export const set_experience = createAction('home_more_field_diary_set_experience')

export const set_suggestion = createAction('home_more_field_diary_set_suggestion')

export const set_plan = createAction('home_more_field_diary_set_plan')

export const diary_clean = createAction('home_more_field_diary_clean')

export default handleActions({

    [diary_clean]: () => init_state,

    [home_more_field_diary_set]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),

    // 日志内容
    [set_duty_log]: (state, {payload}) => {
        // 
        const duty_log = {
            ...state.duty_log,
            [payload.k]: payload.v,
        }

        const duty_len = R.compose(
            R.length,
            R.join(''),
            R.values
        )(duty_log)

        return ({
            ...state,
            duty_log,
            duty_len,
        })
    },

    // 分享
    [set_experience]: (state, {payload}) => ({
        ...state,
        experience: payload,
      }),

    // 建议
    [set_suggestion]: (state, {payload}) => ({
        ...state,
        suggestion: payload,
    }),

    // 计划
    [set_plan]: (state, {payload}) => ({
        ...state,
        plan: payload,
    }),

}, init_state)

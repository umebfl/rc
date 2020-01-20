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

export const keep_diary_set_duty_log = createAction('keep_diary_set_duty_log')

export const keep_diary_set_experience = createAction('keep_diary_set_experience')

export const keep_diary_set_suggestion = createAction('keep_diary_set_suggestion')

export const keep_diary_set_plan = createAction('keep_diary_set_plan')

export const keep_diary_clean = createAction('keep_diary_clean')

export default handleActions({

    [keep_diary_clean]: () => init_state,

    // 日志内容
    [keep_diary_set_duty_log]: (state, {payload}) => {
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
    [keep_diary_set_experience]: (state, {payload}) => ({
        ...state,
        experience: payload,
      }),

    // 建议
    [keep_diary_set_suggestion]: (state, {payload}) => ({
        ...state,
        suggestion: payload,
    }),

    // 计划
    [keep_diary_set_plan]: (state, {payload}) => ({
        ...state,
        plan: payload,
    }),

}, init_state)

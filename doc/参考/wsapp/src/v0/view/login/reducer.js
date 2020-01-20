import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    check: {
        checked: false,
        name: {
            checked: false,
        },
        pwd: {
            checked: false,
        },
    },
    error: {
        msg: '',
    },
}

// export const set_form = createAction('Login_set_form')
export const handle_error_msg = createAction('Login_handle_error_msg')
export const handle_check = createAction('Login_handle_check')

export default handleActions({

    [handle_check]: (state, {payload}) => {

        let msg = ''
        const name_checked = false
        const pwd_checked = false

        return {
            ...state,
            check: {
                ...state.check,
                checked: name_checked && pwd_checked,
                name: {
                    ...state.check.name,
                    checked: name_checked,
                },
                pwd: {
                    ...state.check.pwd,
                    checked: pwd_checked,
                },
            },
            error: {
                ...state.error,
                msg,
            },
        }
    },

    [handle_error_msg]: (state, {payload}) => ({
        ...state,
        error: {
            ...state.error,
            msg: payload,
        },
    }),

}, init_state)

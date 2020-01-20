/*

TODO:
* 角色定义 权限定义

*/
import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'
import {
    set,
} from '../../../lib/persist'

import {
    USER_ROLE,
} from '../../../lib/persist/constant'

export const DIARY_MANAGER = 'diary_manager'
export const DIARY_ME = 'diary_me'
export const FIELD = 'field'
export const OA = 'OA'

const CEO_ID = '03100001'

export const CEO_TYPE = 'CEO'
export const MANAGER_TYPE = 'MANAGER'
export const STAFF_TYPE = 'STAFF'

export const HRBP = 'hrbp'
export const HRD = 'hrd'

const CEO = [
    DIARY_MANAGER,
]

const MANAGER = [
    DIARY_MANAGER,
    DIARY_ME,
]

const STAFF = [
    DIARY_ME,
]

const init_state = {
    type: STAFF_TYPE, // CEO MANAGER STAFF
    hr_type: null,  // null hrbp hrd
    operation: [],
}

export const has_operation = (key, data) => data.indexOf(key) !== -1

// action
export const user_role_restore = createAction('user_role_restore')
export const user_role_init = createAction('user_role_init')
export const user_role_set_field_operation = createAction('user_role_set_field_operation')

export default handleActions({

    [user_role_restore]: (state, {payload}) => payload,

    [user_role_init]: (state, {payload}) => {
        let operation
        let type
        let hr_type = payload.hrType
        // hrType ？

        if(payload.wsId === CEO_ID) {
            operation = CEO
            type = CEO_TYPE
        } else if(payload.empGrade.indexOf('M') !== -1 || payload.hrType === 'hrbp') {
            operation = MANAGER
            type = MANAGER_TYPE
        } else {
            operation = STAFF
            type = STAFF_TYPE
        }

        const data = {
            ...state,
            type,
            hr_type,
            operation,
        }

        set(USER_ROLE, data)

        return data
    },

    [user_role_set_field_operation]: (state, {payload}) => {

        const role = {
            ...state,
            operation: payload
                ? [
                    ...state.operation,
                    FIELD,
                ]
                : state.operation
        }

        set(USER_ROLE, role)

        return role
    },

}, init_state)

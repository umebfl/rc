import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'
import {
    set,
} from '../../../lib/persist'

import {
    USER_INFO,
} from '../../../lib/persist/constant'

const init_state = {}

export const user_info_restore = createAction('user_info_restore')
export const user_info_init = createAction('user_info_init')
export const user_info_set_avatar = createAction('user_info_set_avatar')

const MAX_TOTAL_LEAVE = 5

export default handleActions({

    [user_info_restore]: (state, {payload}) => payload,

    [user_info_set_avatar]: (state, {payload}) => {

        const rv = {
            ...state,
            avatar: payload || state.avatar,
        }

        set(USER_INFO, rv)

        return rv
    },

    [user_info_init]: (state, {payload}) => {

        const rv = {
            wsId: payload.wsId ? payload.wsId : null,
            name: payload.name ? payload.name : '-',
            empGrade: payload.empGrade ? payload.empGrade : '-',
            mail: payload.mail ? payload.mail : '-',
            jobCName: payload.jobCName ? payload.jobCName : '-',
            depCName: payload.depCName ? payload.depCName : '-',
            reportTo: payload.reportTo ? payload.reportTo : '-',
            joinDate: payload.joinDate ? payload.joinDate : '-',
            avatar: payload.avatar ? payload.avatar : null,
            hrType: payload.hrType ? payload.hrType : null,

            postClassification: payload.postClassification,
            attend: payload.attend,
            avgHours: payload.avgHours,
            needAttend: payload.needAttend,
            lateTimes: payload.lateTimes,
            leaveHours: payload.leaveHours,
            // totalLeave: payload.totalLeave  != null ? payload.totalLeave : MAX_TOTAL_LEAVE,
            // annualLeave: payload.annualLeave != null ? payload.annualLeave : MAX_TOTAL_LEAVE,
            totalLeave: payload.totalLeave,
            annualLeave: payload.annualLeave,
        }

        set(USER_INFO, rv)

        return rv
    },

}, init_state)

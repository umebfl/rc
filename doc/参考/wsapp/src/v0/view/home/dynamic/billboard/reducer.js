import R from 'ramda'
import {
    createAction,
    handleActions,
} from 'redux-actions'

const MAX_LIST = 3

const init_state = {
    data: {},
}

export const rank_list_init = createAction('rank_list_init')

export default handleActions({

    [rank_list_init]: (state, {payload}) => {

        let data = R.pick([
            'project',
            'job_log',
            'job_evaluate',
            'weibo',
            'attendance',
            'oa_time',
            'oa_process',
        ])(payload)

        return ({
            ...init_state,
            data: R.map(
                v => ({
                    ...v,
                    list: R.values(v.list),
                })
            )(data),
        })
    }

}, init_state)

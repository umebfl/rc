import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import * as persist from '../../../lib/persist'

import breed from '../../../../data/品种'

const MODULE_KEY = 'breed'

const init_state = {
    data: breed,
}


export const action = {

    set_disable: (index, disable) => (dispatch, get_state) => {
        const state = get_state()
        const module_state = state[MODULE_KEY]

        const data = R.adjust(index, R.assoc('disable', disable))(module_state.data)

        dispatch(
            module_setter({
                data,
            })
        )

        persist.set(MODULE_KEY, {data})
    },

}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)

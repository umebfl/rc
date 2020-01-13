import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const MODULE_KEY = 'deal'

const init_state = {

}


export const action = {

}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)

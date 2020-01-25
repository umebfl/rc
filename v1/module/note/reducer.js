import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import idea from '../../../data/理念'

const MODULE_KEY = 'note'

const init_state = {

    idea: idea,

}


export const action = {
    // test: payload => (dispatch, get_state) => {
    //     const state = get_state()
    //     const module_state = state[MODULE_KEY]
    //
    //     dispatch(
    //         module_setter({
    //             test: !module_state.test,
    //         })
    //     )
    // },
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)

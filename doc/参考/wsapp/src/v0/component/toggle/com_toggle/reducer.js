import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    change: null, // 0...5
}

export const component_toggle = createAction('component_toggle')

export default handleActions({

    [component_toggle]: (state, {payload}) => {
        return ({
            change: payload,
        })
    }

}, init_state)

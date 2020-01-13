import {combineReducers} from 'redux'

import data from './module/data/reducer'
import deal from './module/deal/reducer'
import experiment from './module/experiment/reducer'
import note from './module/note/reducer'
import RC from './module/RC/reducer'

export const AUTH_SIGNOUT = 'redux_auth_signout'

const app_reducer = combineReducers({
    data,
    deal,
    experiment,
    note,
    RC,
})

const rootReducer = (state, action) => {

    // 重置store
    if (action.type === AUTH_SIGNOUT) {
        state = undefined
    }

    return app_reducer(state, action)
}

export default rootReducer

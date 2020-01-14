import * as R from 'ramda'
import {combineReducers} from 'redux'

import data from './module/data/reducer'
import deal from './module/deal/reducer'
import experiment from './module/experiment/reducer'
import note from './module/note/reducer'
import RC from './module/RC/reducer'
import breed from './module/RC/breed/reducer'
import {REHYDRATE_KEY} from './module/rehydrate'

export const AUTH_SIGNOUT = 'redux_auth_signout'

const app_reducer = combineReducers({
    data,
    deal,
    experiment,
    note,

    RC,
    breed,
})

const rootReducer = (state, action) => {

    // 重置store
    if(action.type === AUTH_SIGNOUT) {
        state = undefined
    }

    // 数据持久化恢复
    if(action.type === REHYDRATE_KEY) {
        state = R.mergeDeepRight(state, action.payload)
    }


    return app_reducer(state, action)
}

export default rootReducer

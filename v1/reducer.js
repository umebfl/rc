import {combineReducers} from 'redux'

import home from './module/home/reducer'

export const AUTH_SIGNOUT = 'redux_auth_signout'

const app_reducer = combineReducers({
    home,
})

const rootReducer = (state, action) => {

    // 重置store
    if (action.type === AUTH_SIGNOUT) {
        state = undefined
    }

    return app_reducer(state, action)
}

export default rootReducer

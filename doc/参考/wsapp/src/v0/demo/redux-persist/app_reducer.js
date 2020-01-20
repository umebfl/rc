import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'
import {REHYDRATE} from 'redux-persist/constants'
import {persistStore, autoRehydrate, processSpecial} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const init_state = {
    // 准备就绪
    test: false,
    saveCounter: 0,
    rehydrateCounter: 1,
}

// 登录状态检测
export const init = createAction('App_init')
export const re = createAction(REHYDRATE)

export default handleActions({

    [re]: (state, {payload}) => {
        console.log(`re ${payload}`)
        AsyncStorage.getAllKeys(v => {
            console.log(`key: ${v}`)
        })
        return {...state, g: 123, specialKey: {a:1}}
    },

    [init]: (state, {payload}) => {
        return ({
            ...state,
            test: '123',
        })
    },

}, init_state)

import * as R from 'ramda'
import {AsyncStorage} from 'react-native'

// API
// 获取单个
export const get = async (key, cb) => {
    try {
        const val = await AsyncStorage.getItem(key)
        cb && cb(val)
        // console.log(`persist | get: ${key} | val: ${val}`)
        return val
    } catch(e) {
        handle_error(e)
    }
}
// 获取多个
export const get_list = async (key, cb) => {
    try {
        const val = await AsyncStorage.multiGet(key)
        cb && cb(val)
        // console.log(`persist | get_list: ${key} | val: ${val}`)
        return val
    } catch(e) {
        handle_error(e)
    }
}
// 设置单个
export const set = async (key, val) => {
    try {
        // console.log(`persist | set: ${key} | val:`, val)
        if(typeof val !== 'string') {
            val = JSON.stringify(val)
        }

        await AsyncStorage.setItem(key, val)
    } catch(e) {
        handle_error(e)
    }
}

// 设置多个
export const set_list = async (data, cb) => {
    try {

        const rv = R.map(
            R.adjust(
                R.ifElse(
                    v => typeof v === 'string',
                    v => v,
                    v => JSON.stringify(v)
                ),
                1
            )
        )(data)

        // console.log(`persist | set_list: ${JSON.stringify(rv, true)}`)

        await AsyncStorage.multiSet(rv)
        cb && cb()
    } catch(e) {
        handle_error(e)
    }
}

// 删除一个
export const remove = async (key, cb) => {
    try {
        await AsyncStorage.removeItem(key)
        cb && cb()
    } catch(e) {
        handle_error(e)
    }
}
// 删除多个
export const remove_list = async (key, cb) => {
    try {
        await AsyncStorage.multiRemove(key)
        cb && cb()
    } catch(e) {
        handle_error(e)
    }
}
// 删除全部
export const clear = async cb => {
    try {
        await AsyncStorage.clear()
        cb && cb()
        // console.log('clear | 本地存储清理完成。')
    } catch(e) {
        handle_error(e)
    }
}
// 获取所有数据的key
export const get_key_list = async () => {
    try {
        const val = await AsyncStorage.getAllKeys()
        // console.log('get_key_list | ', val)
        return val
    } catch(e) {
        handle_error(e)
    }
}
// 清除所有进行中的查询操作
export const flush = async cb => {
    try {
        await AsyncStorage.flushGetRequests()
        cb && cb()
    } catch(e) {
        handle_error(e)
    }
}

export const get_all = async () => {
    try {
        const k = await AsyncStorage.getAllKeys()
        const data = await AsyncStorage.multiGet(k)

        // console.log(`get_all | ${JSON.stringify(data, true)}`)

        return R.compose(
            R.fromPairs,
            R.map(
                R.adjust(1, JSON.parse)
            )
        )(data)
    } catch(e) {
        handle_error(e)
    }
}

const handle_error = e => {
    console.log('本地存储操作异常:', e)
}

import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'
import md5 from 'react-native-md5'
import {Buffer} from 'buffer'

import {
    get_id_pwd_token,
} from '../../lib/auth'

import {
    set,
    set_list,
    clear,
    get_all,
} from '../../lib/persist'

import {
    AUTH_ID,
    AUTH_TOKEN,
    AUTH_MD5_BASE64_PWD,
    AUTH_MD5_PWD,
    AUTH_LOGINED,
} from '../../lib/persist/constant'

const init_state = {

    // 同步状态
    sync: false,

    // 登录状态
    authed: false,

    // 账号信息
    info: {
        id: null,
        md5_pwd: null,
        md5_base64_pwd: null,
        token: null,

        pwd: null,
    },

    // 认证通过
    authed: false,
}

export const AUTH_SIGNOUT = 'auth_signout'

export const auth_set_info = createAction('auth_set_info')

// 设置同步状态
export const auth_set_sync = createAction('auth_set_sync')

// 设置登录状态
export const auth_set_authed = createAction('auth_set_authed')

// 退出登录
export const auth_signout = createAction(AUTH_SIGNOUT)

// 设置信息
export const auth_set_id_pwd = createAction('auth_set_id_pwd')

export default handleActions({

    [auth_set_info]: (state, {payload}) => {
        return ({
            ...state,
            info:{
                ...state.info,
                ...payload,
            },
        })
    },

    [auth_set_sync]: (state, {payload}) => {
        return ({
            ...state,
            sync: payload,
        })
    },

    [auth_signout]: (state, {payload}) => {

        clear()

        return {
            ...state,
            authed: false,
            info: {
                ...state.info,
                // id: null,
                pwd: null,
                md5_pwd: null,
                md5_base64_pwd: null,
                token: null,
            },
        }
    },

    [auth_set_authed]: (state, {payload}) => {
        set(AUTH_LOGINED, !!payload)

        return ({
            ...state,
            authed: !!payload,
        })
    },

    [auth_set_id_pwd]: (state, {payload}) => {

        if(payload.pwd) {
            const md5_pwd = md5.hex_md5(payload.pwd)
            const token = get_id_pwd_token(state.info.id, md5_pwd)
            const md5_base64_pwd = new Buffer(md5.hex_md5(payload.pwd)).toString('base64')

            // 写入本地存储
            set_list([
                [AUTH_TOKEN, token],
                [AUTH_MD5_PWD, md5_pwd],
                [AUTH_MD5_BASE64_PWD, md5_base64_pwd],
            ])

            return {
                ...state,
                info: {
                    ...state.info,
                    pwd: payload.pwd,
                    md5_pwd,
                    md5_base64_pwd,
                    token,
                },
            }
        } else if(payload.id) {

            const token = get_id_pwd_token(payload.id, state.info.pwd)

            set_list([
                [AUTH_ID, payload.id],
                [AUTH_TOKEN, token],
            ])

            return {
                ...state,
                info: {
                    ...state.info,
                    id: payload.id,
                    token,
                },
            }
        } else {
            return {
                ...state,
                info: {
                    ...state.info,
                    ...payload,
                },
            }
        }
    },

}, init_state)

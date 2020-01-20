import R from 'ramda'
import {
    NetInfo,
} from 'react-native'

import {
    get_parse_param,
    is_uri_param,
} from '../url'
import conf from '../../../../conf.js'
import toast from '../../component/toast/normal'

const TIMEOUT_SEC = 30 * 1000
// export const build_timeout_fetch = () => {
//     const oldFetchfn = fetch
//
//     window.fetch = (input, opts) => {
//
//         const fetchPromise = oldFetchfn(input, opts)
//         const timeoutPromise = new Promise(function(resolve, reject) {
//             setTimeout(()=>{
//                  reject(() => {
//                      alert('123')
//                      new Error('请求超时，请稍后再试。')
//                  })
//             }, 2000)
//         })
//
//         return Promise.race([fetchPromise, timeoutPromise])
//     }
// }

// export const check_network = () => {
//     return NetInfo.isConnected
// }

// 生成请求头
export const get_fetch_header = (fetch_type, auth, is_upload, lang) => ({
    'Accept-Language': lang,
    'authorization': `Basic ${auth}`,
    'Access-Control-Allow-Origin': 'http://localhost',
    'Content-Type': is_uri_param(fetch_type)
                        ? 'Content-Type:text/html'
                        : is_upload
                            ? 'multipart/form-data'
                            : 'application/x-www-form-urlencoded',
})

// 生成请求body
export const get_fetch_body = (fetch_type, param, is_upload) => {
    if(is_upload) {
        return param
    }

    if(is_uri_param(fetch_type)) {
        return null
    }

    return get_parse_param(param)
}

// 生成请求url
export const get_fetch_url = (fetch_type, host, path, param) => {
    const url = `${host}${path}`

    if(is_uri_param(fetch_type)) {
        return `${url}?${get_parse_param(param)}`
    } else {
        return url
    }
}

// 执行fetch请求
export const _fetch = async ({
    token,
    lang,
    host,
    is_upload,
    path,
    param,
    fetch_type,
    update_state,
    error,
    error_flow,
    success,
}) => {
    let res
    let rv
    let finish
    let timeouted
    const url = get_fetch_url(fetch_type, host ? host : conf.server.host, path, param)

    console.log(`| fetch info:`, {
        url,
        token,
        fetch_type,
        headers: JSON.stringify(get_fetch_header(fetch_type, token, is_upload, lang)),
        body: JSON.stringify(get_fetch_body(fetch_type, param, is_upload)),
        param: JSON.stringify(param),
    })

    update_state = update_state ? update_state : () => {}

    setTimeout(() => {
        // 超时
        if(!finish) {
            update_state({
                _fetch_loading: false,
                _fetch_error: true,
            })

            toast('网络连接超时，请重试。')
            error_flow && error_flow()

            timeouted = true
        }
    }, TIMEOUT_SEC)

    // 启动加载中状态
    update_state({
        _fetch_loading: true,
        _fetch_error: false,
    })

    try {
        res = await fetch(
            url,
            {
                credentials: 'include',
                method: fetch_type,
                headers: get_fetch_header(fetch_type, token, is_upload, lang),
                body: get_fetch_body(fetch_type, param, is_upload),
            }
        )
        console.log('_fetch res')
        rv = await res.json()
    } catch(e) {
        console.log('| _fetch catch error | e:', JSON.stringify(e))

        finish = true

        // 关闭加载中状态
        update_state({
            _fetch_loading: false,
            _fetch_error: true,
        })

        NetInfo.isConnected.fetch().done((isConnected) => {
            if(isConnected) {
                if(error) {
                    error('请求数据异常，请稍后再试')
                } else {
                    toast('请求数据异常，请稍后再试')
                }
            } else {
                toast('无可用网络，请检查当前网络连接状态。')
            }

            error_flow && error_flow(rv)
            return
        })

        return
    }

    if(timeouted) {
        return
    }

    // console.log('_fetch parse json | rv:', JSON.stringify(rv))
    console.log(`| _fetch parse json | url: ${url} rv:`, rv)
    // console.log('_fetch parse json')

    // 关闭加载中状态
    update_state({
        _fetch_loading: false,
        _fetch_error: false,
    })

    finish = true

    if(rv.status == 200) {
        console.log('| _fetch success start')
        success && success(rv.data)
        console.log('| _fetch success end')
    } else {
        if(error) {
            error(rv)
        } else {
            toast(rv.message ? rv.message : '请求数据异常，请稍后再试。')
            error_flow && error_flow(rv)
        }
    }
}

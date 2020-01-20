// import {
//     // NativeAppEventEmitter,
//     // DeviceEventEmitter,
// } from 'react-native'

import JPushModule from 'jpush-react-native'

export const init = () => {

}

export const destory = () => {
    // ios的移除事件函数无法生效，使用替换wsid实现移除推送
    setting('00000000', 'A')
    setBadge(0)
    // NativeAppEventEmitter.removeListener('ReceiveNotification')
}

export const listener = () => {
    if(typeof NativeAppEventEmitter !== 'undefined') {
        NativeAppEventEmitter.addListener(
           'ReceiveNotification',
           (notification) => console.log(notification)
       )
    }
}

export const setBadge = (wsId = 0) => {
    
    JPushModule.setBadge(wsId, rv => {})
}

export const setting = (wsId, empGrade) => {
    if (wsId !== undefined) {
        JPushModule.setAlias(wsId, () => {
            console.log('Set alias succeed')
        }, () => {
            console.log('Set alias failed')
        })
    }

    if (empGrade !== undefined) {
        JPushModule.setTags([empGrade.substring(0,1)], () => {
            console.log('Set tag succeed')
        }, () => {
            console.log('Set tag failed')
        })
    }
}

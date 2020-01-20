import JPushModule from 'jpush-react-native'
import BadgeAndroid from 'react-native-android-badge'

const receiveCustomMsgEvent = "receivePushMsg";
const receiveNotificationEvent = "receiveNotification";
const openNotificationEvent = "openNotification";
const getRegistrationIdEvent = "getRegistrationId";

export const init = () => {
    JPushModule.initPush()
}

export const destory = () => {
    setBadge(0)
    JPushModule.removeReceiveCustomMsgListener(receiveCustomMsgEvent)
    JPushModule.removeReceiveNotificationListener(receiveNotificationEvent)
    JPushModule.removeReceiveOpenNotificationListener(openNotificationEvent)
    JPushModule.removeGetRegistrationIdListener(getRegistrationIdEvent)
    JPushModule.clearAllNotifications()
}

export const listener = () => {
    JPushModule.notifyJSDidLoad((resultCode) => {
        if (resultCode === 0) {
        }
    })

    // JPushModule.addReceiveOpenNotificationListener((map) => {
    //     console.log('Opening notification!')
    //     console.log('map.extra: ' + map.extras)
    //     JPushModule.jumpToPushActivity('SecondActivity')
    // })
}

export const callbackListener = (callback) => {
    JPushModule.addReceiveCustomMsgListener((map) => {
        // this.setState({
        //     pushMsg: map.message
        // })
        console.log('extras: ' + map.extras)
        callback()
    })
    JPushModule.addReceiveNotificationListener((map) => {
        console.log('alertContent: ' + map.alertContent)
        console.log('extras: ' + map.extras)
        // var extra = JSON.parse(map.extras)
        // console.log(extra.key + ': ' + extra.value)
        callback()
    })
}

export const setBadge = (wsId) => {
    BadgeAndroid.setBadge(wsId);
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
        JPushModule.setTags([empGrade.substring(0, 1)], () => {
            console.log('Set tag succeed')
        }, () => {
            console.log('Set tag failed')
        })
    }
}

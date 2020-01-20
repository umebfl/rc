import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native'

// 清理存储
// await AsyncStorage.clear()

/*
getItem
setItem
removeItem
clear
getAllKeys
flushGetRequests
multiGet
multiSet
multiRemove
*/

// const storage_get = key => {
//     try {
//         return AsyncStorage.getItem(key)
//     } catch(e) {
//         handle_error(e)
//     }
// }
//
// const test = async () => {
//     try {
//
//         const value = await storage_get('A')
//
//         // await AsyncStorage.setItem('A', 'A1')
//         // await AsyncStorage.setItem('B', 'B1')
//         // await AsyncStorage.setItem('C', 'C1')
//         //
//         // await AsyncStorage.multiRemove(key)
//         // // const value = await AsyncStorage.multiRemove(key)
//         // const key2 = await AsyncStorage.getAllKeys()
//         // console.log('key2:' + key2)
//         // // const value = await AsyncStorage.multiGet(key)
//         // // const value = await AsyncStorage.getItem('A')
//
//         if (value !== null) {
//             // We have data!!
//             console.log(value)
//         }
//     } catch (error) {
//       // Error saving data
//     }
// }

// API
const storage_get = async (key, cb) => {
    try {
        const val = await AsyncStorage.getItem('A')
        cb && cb(val)
    } catch(e) {
        handle_error(e)
    }
}


const handle_error = e => {
    console.log(e)
}

class wsapp extends Component {

    constructor(prop) {
        super(prop)
        storage_get('A', console.log)
    }

    render() {
        return (
            <Text name='fifth'>Fifth</Text>
        )
    }
}

export default wsapp

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Text, AsyncStorage} from 'react-native'
import {REHYDRATE} from 'redux-persist/constants'

import * as reducer from './app_reducer.js'

// const storage_get_key_list = async cb => {
//     try {
//         const val = await AsyncStorage.getAllKeys()
//         cb && cb(val)
//     } catch(e) {
//         handle_error(e)
//     }
// }

class App extends Component {

    constructor(prop) {
        super(prop)
        // storage_get_key_list(v => console.log(v))
        console.log(prop.action)
        prop.action.init()
    }

    render() {
        const {state} = this.props

        return (
            <Text>{JSON.stringify(state)}</Text>
        )
    }
}

export default connect(
    state => ({
        state: state,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(App)

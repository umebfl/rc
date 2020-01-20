import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {AsyncStorage} from 'react-native'

import configureStore from './store'
import App from './app'

// AsyncStorage.clear()
AsyncStorage.getAllKeys(v => {
    console.log(`key: ${v}`)
})

export default class wsapp extends Component {
    constructor() {
        super()
        this.state = {
            store: configureStore(() => this.setState({ isLoading: true })),
        }

        // 移除react-native底部黄色警告框
        console.disableYellowBox = true
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <App/>
            </Provider>
        )
    }
}

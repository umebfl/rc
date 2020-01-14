import React, { Component } from 'react'
import * as R from 'ramda'

import { Provider } from 'react-redux'

import {
  Provider as RNProvider,
} from '@ant-design/react-native';

import Rehydrate from './module/rehydrate'
import configureStore from './store'

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            store: configureStore(),
        }
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <RNProvider>
                    <Rehydrate/>
                </RNProvider>
            </Provider>
        )
    }
}

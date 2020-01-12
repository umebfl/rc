import React, { Component } from 'react'
import * as R from 'ramda'

import { Provider } from 'react-redux'

import configureStore from './store'
import Router from './router'

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
                <Router/>
            </Provider>
        )
    }
}

import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducer.js'
// import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import conf, {
    DEV,
    PRO,
} from '../conf'

export default function configureStore() {

    let store

    if(conf.env === 'PRO') {
        store = createStore(
            rootReducer,
            applyMiddleware(thunk),
            // applyMiddleware(thunk, promiseMiddleware),
        )
    } else {
        store = createStore(
            rootReducer,
            // applyMiddleware(thunk),
            applyMiddleware(thunk, logger),
            // applyMiddleware(thunk, promiseMiddleware, logger),
        )
    }


    // if(module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('./v0/reducer.js', () => {
    //         const nextReducer = require('./v0/reducer.js').default
    //         store.replaceReducer(nextReducer)
    //     })
    // }

    return store
}

import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducer.js'
// import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

export default function configureStore() {

    let store

    store = createStore(
        rootReducer,
        // applyMiddleware(thunk),
        applyMiddleware(thunk, logger),
        // applyMiddleware(thunk, promiseMiddleware, logger),
    )


    // if(module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('./v0/reducer.js', () => {
    //         const nextReducer = require('./v0/reducer.js').default
    //         store.replaceReducer(nextReducer)
    //     })
    // }

    return store
}

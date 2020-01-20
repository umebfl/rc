import {AsyncStorage} from 'react-native'
// import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'
// import {persistStore, autoRehydrate, createTransform} from 'redux-persist'
// import {persistStore, autoRehydrate} from 'redux-persist'

// export default function configureStore(onCompletion:()=>void):any {
//
//     // const store = createStore(
//     //     reducer,
//     //     applyMiddleware(thunkMiddleware, logger)
//     // )
//
//     const store = createStore(reducer, autoRehydrate())
//     persistStore(store, {storage: AsyncStorage}, onCompletion)
//
//     return store
// }

import {compose, applyMiddleware, createStore} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'

// add `autoRehydrate` as an enhancer to your store (note: `autoRehydrate` is not a middleware)
export default function configureStore(onCompletion:()=>void):any {
    const store = createStore(
        reducer,
        undefined,
        compose(
            applyMiddleware(thunkMiddleware, logger),
            autoRehydrate()
        )
    )

    // begin periodically persisting the store
    // persistStore(store)
    persistStore(store, {storage: AsyncStorage}, onCompletion)

    return store
}

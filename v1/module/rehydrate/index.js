import React, { Component } from 'react'
import * as R from 'ramda'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    createAction,
} from 'redux-actions'

import Router from '../../router'
import * as persist from '../../lib/persist'

export const REHYDRATE_KEY = 'rehydrate'

const rehydrate_action = createAction(REHYDRATE_KEY)

const do_rehydrate = async action => {
    // persist.clear()

    const data = await persist.get_all()

    action(data)
}

class Module extends Component {

    componentDidMount() {
        do_rehydrate(this.props.action.rehydrate_action)
    }

    render() {
        return <Router/>
    }
}

export default connect(
    state => ({

    }),
    dispatch => ({
        action: bindActionCreators({rehydrate_action}, dispatch),
    })
)(Module)

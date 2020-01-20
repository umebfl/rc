import R from 'ramda'

import React, {
    Component,
} from 'react'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Main from './main'
// import Seq from './seq'

class Filter_drawer extends Component {

    constructor(prop) {
        super(prop)

        this.state = {
            page: 0,
        }
    }

    handle_change_to(i) {
        this.setState({
            ...this.state,
            page: i,
        })
    }

    render() {
        const {
            navigation,
        } = this.props

        const {
            page,
        } = this.state

        // <ScrollableTabView
        //     page={page}
        //     locked={true}
        //     // prerenderingSiblingsNumber={2}
        //     renderTabBar={() => <View/>}
        //     ref={(tabView) => {this.tabView = tabView}}>
        //
        //     <Main tabLabel='main' navigation={navigation} handle_change_to={this.handle_change_to.bind(this)}/>
        //     <Seq tabLabel='seq' navigation={navigation} handle_change_to={this.handle_change_to.bind(this)}/>
        //
        // </ScrollableTabView>
        return <Main tabLabel='main' navigation={navigation} handle_change_to={this.handle_change_to.bind(this)}/>
    }
}

export default connect(
    state => ({
        data: state.Diary_staff.filter_drawer_data,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        // action: bindActionCreators(reducer, dispatch),
    })
)(Filter_drawer)

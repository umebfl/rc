import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import Container from '../../../component/layout/container'
import Header from '../../../component/layout/header'
import Tab_header from '../../../component/layout/tab_header'

// import Favorite from './favorite'
// import Manager from './manager'
import Staff from './staff'
import Me from './me'

import {
    CEO_TYPE,
    DIARY_ME,
    DIARY_MANAGER,
} from '../../../reducer/user/role'

class Diary extends Component {
    render() {
        const {
            role: {
                operation,
                type,
            },
            i18n: {
                t,
            },
            navigation,
        } = this.props

        return (
            <Container>
                <ScrollableTabView
                    style={{
                        backgroundColor: 'white',
                    }}
                    scrollWithoutAnimation={true}
                    renderTabBar={() => <Tab_header/>}
                    tabBarBackgroundColor='white'
                    ref={(tabView) => {this.tabView = tabView}}>

                    {
                        operation.indexOf(DIARY_MANAGER) !== -1
                        ? <Staff tabLabel={t.worker_diary} navigation={navigation}></Staff>
                        : null
                    }

                    {
                        // this.props.auth.info.id
                        // ? <Favorite tabLabel={t.attention} navigation={navigation}></Favorite>
                        // : null
                    }

                    {
                        // operation.indexOf(DIARY_ME) !== -1
                        // ? <Me tabLabel={t.me} navigation={navigation}></Me>
                        // : null
                    }

                </ScrollableTabView>
            </Container>
        )
    }
}

export default connect(
    state => ({
        auth: state.Auth,
        role: state.User_role,
        i18n: state.I18n,
    }),
    // dispatch => ({
    //     action: bindActionCreators(reducer, dispatch),
    // })
)(Diary)

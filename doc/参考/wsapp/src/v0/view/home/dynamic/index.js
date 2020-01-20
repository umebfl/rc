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

import Todo from './todo'
import Billboard from './billboard'
import Notice from './notice'

class Dynamic extends Component {

    render() {
        const {
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

                    <Todo tabLabel={t.todo} navigation={navigation}/>
                    <Notice tabLabel={t.notice} navigation={navigation}/>
                    <Billboard tabLabel={t.billboard} navigation={navigation}/>

                </ScrollableTabView>
            </Container>
        )
    }
}

// Dynamic.navigationOptions.tabBarLabel = 'dey'

export default connect(
    state => ({
        i18n: state.I18n,
    }),
    // dispatch => ({
    //     action: bindActionCreators(reducer, dispatch),
    // })
)(Dynamic)

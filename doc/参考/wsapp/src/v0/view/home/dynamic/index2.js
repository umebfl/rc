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
import Tab_bar from './tab_bar.js'

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
                    scrollWithoutAnimation={false}
                    renderTabBar={() => <Tab_bar/>}
                    tabBarBackgroundColor='white'
                    ref={(tabView) => {this.tabView = tabView}}>

                    <Todo tabLabel='待办' navigation={navigation}/>
                    <Notice tabLabel='通知' navigation={navigation}/>
                    <Billboard tabLabel='榜单' navigation={navigation}/>

                </ScrollableTabView>
            </Container>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
    // dispatch => ({
    //     action: bindActionCreators(reducer, dispatch),
    // })
)(Dynamic)

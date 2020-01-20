import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'

class Dynamic_header extends Component {
    render() {
        const {
            navigation,
        } = this.props

        return (
            <View>
                <Text>
                    123
                </Text>
            </View>
        )
    }
}

export default connect(
    state => ({
        info: state.User_info,
        auth: state.Auth,
    }),
)(Dynamic_header)

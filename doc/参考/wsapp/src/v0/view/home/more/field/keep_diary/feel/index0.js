import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, TouchableOpacity,} from 'react-native'

import style from './style'

class Feel extends Component {

    constructor(prop) {
      super(prop)

      this.state = {

      }

    }


    render() {
        const {
            i18n: {
                t,
            },
        } = this.props

        return(
            <View>
                
            </View>
        )
    }

}

export default connect(
    state => ({
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        // action: bindActionCreators({user_duty_init}, dispatch),
    })
)(Feel)

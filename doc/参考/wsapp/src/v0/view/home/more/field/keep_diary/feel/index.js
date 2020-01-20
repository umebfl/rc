import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, TouchableWithoutFeedback,} from 'react-native'

import style from './style'

import {
    home_more_field_diary_set,
} from './reducer.js'

class Feel extends Component {

    constructor(prop) {
      super(prop)

      this.state = {
          feel: prop.diary.feel,
      }

    }

    handle_set_feel(v) {
        this.props.action.home_more_field_diary_set({
            feel: this.props.diary.feel === v ? null : v,
        })

        this.setState({
            ...this.state,
            feel: this.props.diary.feel === v ? null : v,
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
            diary: {
                feel,
            },
        } = this.props

        return(
            <View style={style.content_feel}>
                <View style={style.feel_text_wrap}>
                    <Text style={style.content_feel_text}>
                        {t.todays_mood}
                    </Text>

                    <Text style={style.content_feel_title}>
                        工作一天了,你的心情还好么
                    </Text>
                </View>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 0)}>
                        <View style={[style.content_feel_base_wrap, feel === 0 ? style.content_so_bad_wrap_active : style.content_so_bad_wrap]}>
                            <Text style={[style.content_feel_base, feel === 0 ? style.content_active : style.content_so_bad]}>
                                {t.feel_so_bad}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 1)}>
                        <View style={[style.content_feel_base_wrap, feel === 1 ? style.content_bad_wrap_active : style.content_bad_wrap]}>
                            <Text style={[style.content_feel_base, feel === 1 ? style.content_active : style.content_bad]}>
                                {t.feel_bad}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 2)}>
                        <View style={[style.content_feel_base_wrap, feel === 2 ? style.content_normal_wrap_active : style.content_normal_wrap]}>
                            <Text style={[style.content_feel_base, feel === 2 ? style.content_active : style.content_normal]}>
                                {t.feel_so_so}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 3)}>
                        <View style={[style.content_feel_base_wrap, feel === 3 ? style.content_good_wrap_active : style.content_good_wrap]}>
                            <Text style={[style.content_feel_base, feel === 3 ? style.content_active : style.content_good]}>
                                {t.feel_preferably}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.handle_set_feel.bind(this, 4)}>
                        <View style={[style.content_feel_base_wrap, feel === 4 ? style.content_grade_wrap_active : style.content_grade_wrap]}>
                            <Text style={[style.content_feel_base, feel === 4 ? style.content_active : style.content_grade]}>
                                {t.feel_joyful}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

}

export default connect(
    state => ({
        auth: state.Auth,
        i18n: state.I18n,
        diary: state.Home_more_field_keep_diary_feel,
    }),
    dispatch => ({
        action: bindActionCreators({home_more_field_diary_set}, dispatch),
    })
)(Feel)

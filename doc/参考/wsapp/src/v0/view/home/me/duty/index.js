import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Platform,
    View,
    Button,
    Text,
    Image,
    ScrollView,
} from 'react-native'

import Header from '../../../../component/layout/header'
import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Loading from '../../../../component/loading/normal'
import {user_duty_init} from '../../../../reducer/user/duty'

import style from './style'
import ume_theme from '../../../../theme/ume-theme'

import {
    _fetch,
} from '../../../../lib/fetch'

const USER_DUTY_PATH = '/orgs/positions'

class Duty extends Component {

    constructor(prop) {
        super(prop)
        this.state = {}
    }

    componentDidMount() {
        this.init()
    }

    init() {
        _fetch({
            fetch_type: 'GET',
            path: USER_DUTY_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.user_duty_init(rv)
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
            navigation,
            duty: {
                data,
            },
            info,
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.my_duty,
                        // loading: {
                        //     visiable: this.state._fetch_loading,
                        // },
                    }}/>

                <Content>
                    <Loading visiable={this.state._fetch_loading}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={ume_theme.tip}>
                            <Text style={ume_theme.tip_text}>
                                {t.my_duty_tips}
                            </Text>
                        </View>

                        <View style={style.body}>
                            {
                                R.addIndex(R.map)((v, k) => (
                                    <View key={k} style={style.item}>
                                        <View style={style.title}>
                                            <Text style={style.title_left}>
                                                {`${t.duty}${k + 1}`}
                                            </Text>
                                            <Text style={style.title_right}>
                                                {v.relate_resp_weight}%
                                            </Text>
                                        </View>

                                        <Text style={style.msg}>
                                            {v.relate_resp_cur_desc}
                                        </Text>
                                    </View>
                                ))(data)
                            }
                        </View>

                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        duty: state.User_duty,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({user_duty_init}, dispatch),
    })
)(Duty)

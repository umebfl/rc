import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import conf from '../../../../../../../conf.js'
import Loading from '../../../../../component/loading/normal'
import Img from '../../../../../component/element/img/normal'

const SRC_SEARCH = require('../../../../../../../content/img/more/search.png')
const SRC_DEFAULT = require('../../../../../../../content/img/icon/default.jpg')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../../../content/img/icon/arrow_right_gray.png')

import {
    ABS_d5,
    N_5,
    N_10,
    N_14,
    N_15,
    N_16,
    N_20,
    N_22,
    N_30,
    N_50,
    N_60,
    BORDER_WIDTH,
    BORDER_COLOR,
    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE_L,
    COLOR_BLUE_XL,
} from '../../../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

const USERS_FANS_ACCEPT_INVITE_PATH = '/users/fans/accept-invite'

class Dynamic_header extends Component {

    constructor(prop) {
        super(prop)
        const data = prop.navigation.state.params.data
        this.state = {
            data,
            data_leg: data.length,
        }
    }

    handle_accept(fans_id, event) {
        _fetch({
            fetch_type: 'POST',
            path: USERS_FANS_ACCEPT_INVITE_PATH,
            param: {
                wsId: this.props.auth.info.id,
                employeeIds: fans_id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.handle_accept_invite(fans_id)
                this.setState({
                    ...this.state,
                    data_leg: this.state.data_leg - 1,
                })
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    handle_accept_invite(id) {
        this.setState({
            ...this.state,
            data: R.map(
                R.ifElse(
                    v => R.equals(v.fans_id)(id),
                    v => ({
                        ...v,
                        accept_invite_flag: true,
                    }),
                    v => v
                )
            )(this.state.data)
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
            navigation,
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                        handle_press: this.props.navigation.state.params.goback,
                    }}
                    center_option={{
                        text: t.i_received_the_application,
                    }}/>

                <Content>
                    <Loading visiable={this.state._fetch_loading}/>
                    <ScrollView>
                        <Text style={{
                            paddingTop: N_5,
                            paddingBottom: N_5,
                            textAlign: 'center',
                            backgroundColor: COLOR_BLUE_XL,
                        }}>
                            {this.state.data_leg}{t.apply_to_be_your_fan}
                        </Text>

                        {
                            R.compose(
                                R.map(
                                    v => (
                                        <View
                                            key={v.fans_id}
                                            style={{
                                                paddingLeft: N_20,
                                                paddingRight: N_20,
                                                paddingTop: N_10,
                                                paddingBottom: N_10,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderBottomWidth: BORDER_WIDTH,
                                                borderBottomColor: BORDER_COLOR,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Img
                                                    width={N_50}
                                                    src={v.avatar}/>

                                                <View style={{
                                                    marginLeft: N_10,
                                                }}>
                                                    <Text style={{
                                                        fontSize: N_16,
                                                        color: COLOR_GRAY_XD,
                                                    }}>
                                                        {v.Name}
                                                    </Text>
                                                    <Text style={{
                                                        paddingTop: 5,
                                                        fontSize: N_14,
                                                        color: COLOR_GRAY_D,
                                                    }}>
                                                        {v.ePosition}
                                                    </Text>
                                                </View>
                                            </View>

                                            {
                                                v.accept_invite_flag
                                                ? <View style={{
                                                    backgroundColor: COLOR_BLUE_L,
                                                    borderRadius: N_10,
                                                    padding: N_5,
                                                    paddingRight: N_15,
                                                    paddingLeft: N_15,
                                                    fontSize: N_14,
                                                }}>
                                                    <Text style={{
                                                        color: 'white',
                                                    }}>
                                                        {t.have_agreed}
                                                    </Text>
                                                </View>
                                                : <TouchableOpacity onPress={() => {
                                                    this.handle_accept(v.fans_id)
                                                }}>
                                                    <View style={{
                                                        backgroundColor: COLOR_BLUE_L,
                                                        borderRadius: N_10,
                                                        padding: N_5,
                                                        paddingRight: N_15,
                                                        paddingLeft: N_15,
                                                        fontSize: N_14,
                                                    }}>
                                                        <Text style={{
                                                            color: 'white',
                                                        }}>
                                                            {t.agree}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>)
                                    ),
                                    R.values
                                )(this.state.data)
                            }
                        </ScrollView>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
)(Dynamic_header)

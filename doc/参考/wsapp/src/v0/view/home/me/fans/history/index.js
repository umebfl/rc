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

const SRC_SEARCH = require('../../../../../../../content/img/more/search.png')
const SRC_DEFAULT = require('../../../../../../../content/img/icon/default.jpg')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../../../content/img/icon/arrow_right_gray.png')

import {
    ABS_d5,
    N_5,
    N_10,
    N_15,
    N_16,
    N_20,
    N_22,
    N_25,
    N_30,
    N_50,
    BORDER_WIDTH,
    BORDER_COLOR,
    COLOR_GRAY_XD,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE_L,
    COLOR_BLUE_XL,
} from '../../../../../theme/ume-theme/variable.js'

class Dynamic_header extends Component {
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
                    }}
                    center_option={{
                        text: t.history,
                    }}/>

                <Content>
                    <ScrollView>
                        <Text style={{
                            paddingTop: N_5,
                            paddingBottom: N_5,
                            textAlign: 'center',
                            backgroundColor: COLOR_BLUE_XL,
                        }}>
                            {t.to_be_your_fans}
                        </Text>

                        <View style={{
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
                                <Image
                                    source={SRC_DEFAULT}
                                    style={{
                                        width: N_50,
                                        height: N_50,
                                        borderRadius: N_25,
                                    }}/>

                                <View style={{
                                    marginLeft: N_10,
                                }}>
                                    <Text style={{
                                        fontSize: N_16,
                                        color: COLOR_GRAY_XD,
                                    }}>
                                        秦点丽
                                    </Text>
                                    <Text>
                                        运营总监  运营支持部
                                    </Text>
                                </View>
                            </View>


                            <TouchableWithoutFeedback>
                                <View>
                                    <Text style={{
                                        padding: N_5,
                                        paddingRight: N_15,
                                        paddingLeft: N_15,
                                        backgroundColor: COLOR_BLUE_L,
                                        borderRadius: N_10,
                                        color: 'white',
                                    }}>
                                        {t.reinvite}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

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

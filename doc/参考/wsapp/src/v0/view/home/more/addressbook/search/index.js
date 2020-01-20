import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ListView, ScrollView, TouchableOpacity, TextInput, Keyboard,} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Loading from '../../../../../component/loading/normal'
import Content from '../../../../../component/layout/content'
import conf from '../../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../../theme/ume-theme'
import Img, {
    WIDTH_MD,
} from '../../../../../component/element/img/normal'

const SRC_SEARCH = require('../../../../../../../content/img/more/search.png')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_ERROR = require('../../../../../../../content/img/icon_address_book/error.png')
const SRC_HISTORY = require('../../../../../../../content/img/icon_address_book/history.png')

import {
    BORDER_WIDTH,
    BORDER_COLOR,
    N_5,
    N_8,
    N_10,
    N_12,
    N_14,
    N_15,
    N_16,
    N_18,
    N_20,
    N_22,
    N_25,
    N_30,
    N_40,
    N_60,
    STATUSBAR_HEIGHT,

    COLOR_GRAY_D,
    COLOR_GRAY_XD,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE,
    COLOR_MAIN
} from '../../../../../theme/ume-theme/variable.js'

import {users_contacts_search_init} from './reducer.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

//通讯录数据url
const DATA_PATH = '/users/contacts'

class Search extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            show: false,
            text: '',
            list: [],
        }
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    }

    componentDidMount() {
        this.init()
    }

    init() {
        _fetch({
            fetch_type: 'GET',
            path: DATA_PATH,
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => this.props.action.users_contacts_search_init(rv),
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
     }

    handle_search(text) {
        // 查询文本是否在结果集内
        var list = []

        this.props.contacts.data.map(
            v => {
                if(v.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                    list.push(v)
                }
            }
        )

        this.setState({
            show: text.trim() != "" ? true : false,
            text: text,
            list,
        })
    }

    handle_press(id) {
        dismissKeyboard()
        this.props.navigation.navigate('home_more_addressbook_personal_details',{id: id, goback: this.props.navigation.state.params.goback})
    }

    render() {
        const {
            i18n: {
                t,
            },
            info: {
                avatar,
            },
            contacts: {
                data,
            },
            navigation,
        } = this.props

        return (
            <Container>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: STATUSBAR_HEIGHT,
                        paddingBottom: N_10,
                        paddingLeft: N_10,
                        paddingRight: N_15,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}>
                        <View style={style.search_view}>
                            <TextInput
                                ref='input'
                                maxLength={10}
                                style={style.text_input}
                                selectionColor='#BBBBBB'
                                underlineColorAndroid='transparent'
                                placeholder={t.enter_name}
                                placeholderTextColor='#a6a6a6'
                                value={this.state.text}
                                onChangeText={this.handle_search.bind(this)}
                                autoFocus={true}/>
                        </View>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={{
                                height: 40,
                                paddingLeft: N_14,
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: N_16,
                                    color: COLOR_BLUE,
                                }}>{t.cancel}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.show
                        ? <ListView
                            keyboardDismissMode={'on-drag'}
                            showsVerticalScrollIndicator={false}
                            enableEmptySections={true}
                            keyboardShouldPersistTaps={true}
                            renderRow={
                                v => (
                                    <TouchableOpacity
                                        key={v.wsId}
                                        activeOpacity={.5}
                                        onPress={this.handle_press.bind(this, v.employeeId)}>
                                        <View
                                            key={v.wsId}
                                            style={{
                                                paddingTop: N_10,
                                                paddingBottom: N_10,
                                                paddingRight: N_20,
                                                paddingLeft: N_20,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderBottomWidth: BORDER_WIDTH,
                                                borderBottomColor: BORDER_COLOR,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Img
                                                    width={WIDTH_MD}
                                                    src={v.avatar}/>

                                                <View style={{
                                                    marginLeft: N_10,
                                                }}>
                                                    <Text style={{
                                                        fontSize: N_14,
                                                        color: COLOR_GRAY_XD,
                                                    }}>
                                                        {v.name}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: N_12,
                                                        color: COLOR_GRAY,
                                                    }}>
                                                        {v.jobCname}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: N_12,
                                                        color: COLOR_GRAY,
                                                    }}>
                                                        {v.depCnname}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            dataSource={this.ds.cloneWithRows(this.state.list)}>
                        </ListView>
                        : null
                    }

                </View>

            </Container>
        )
    }
}

export default connect(
    state => ({
        contacts: state.Users_contacts_search,
        auth: state.Auth,
        info: state.User_info,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({users_contacts_search_init}, dispatch),
    })
)(Search)

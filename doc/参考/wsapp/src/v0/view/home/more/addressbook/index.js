import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ListView, TouchableOpacity, RefreshControl} from 'react-native'

import Header from '../../../../component/layout/header'
import Divider_list from '../../../../component/list/divider_list'
import Container from '../../../../component/layout/container'
import Content from '../../../../component/layout/content'
import Loading from '../../../../component/loading/normal'
import conf from '../../../../../../conf.js'

import {
    N_14,
    N_15,
    N_20,
    N_22,
    N_16,
    COLOR_GRAY,
    COLOR_BLUE_XL,
    COLOR_MAIN,
} from '../../../../theme/ume-theme/variable.js'

import {users_contacts_init} from './reducer.js'

import {
    _fetch,
} from '../../../../lib/fetch'

//通讯录数据url
const DATA_PATH = '/users/contacts'

const SRC_SEARCH = require('../../../../../../content/img/more/search.png')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../../content/img/icon/arrow_right_gray.png')

class Addressbook extends Component {

    // handle_success(rv) {
    //     this.props.action.users_contacts_init(rv)
    // }

    constructor(prop) {
        super(prop)
        this.state = {

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
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.props.action.users_contacts_init(rv)
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
            contacts,
            navigation,
            auth: {
                info: {
                    id,
                },
            },
        } = this.props

        return (

            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                    }}
                    center_option={{
                        text: t.address_book,
                    }}
                    right_option={{
                        source: SRC_SEARCH,
                        handle_press: () => this.props.navigation.navigate('home_more_addressbook_search', {goback: this.init.bind(this)}),
                        icon_style: {
                            width: N_22,
                            height: N_22,
                        }
                    }}/>

                <Content>
                    {
                        contacts.inited && R.isEmpty(contacts.data)
                            ? <View style={{
                                 flex: 1,
                                 alignItems: 'center',
                                 paddingTop: N_15,
                            }}>
                                <Text style={{
                                    fontSize: N_14,
                                    color: COLOR_GRAY,
                                }}>{t.no_linkman}~</Text>
                            </View>
                            : null
                    }

                    <ListView
                        refreshControl={
                            <RefreshControl
                                onRefresh={this.init.bind(this)}
                                refreshing={this.state._fetch_loading}
                                tintColor={COLOR_MAIN}
                                title={t.drop_refresh_data} />
                        }
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        renderRow={
                            v => (
                                <Divider_list
                                    key={v.wsId}
                                    show_marginBottom={true}
                                    is_border_radius={true}
                                    show_bottom_border={true}
                                    data={[
                                        {
                                            img_type: 'url',
                                            img_src: v.avatar,
                                            title_left: v.name,
                                            show_right_text: false,
                                            image_src_right_arrow: SRC_ARROW_RIGHT_GRAY,
                                            on_icon_press: () => navigation.navigate('home_more_addressbook_personal_details', {id: v.employeeId, goback: this.init.bind(this)}),
                                            on_press: () => navigation.navigate('home_more_addressbook_personal_details', {id: v.employeeId, goback: this.init.bind(this)}),
                                        }
                                    ]}/>
                            )
                        }
                        dataSource={this.ds.cloneWithRows(contacts.data)}>
                    </ListView>
                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        contacts: state.Users_contacts,
        i18n: state.I18n,
        auth: state.Auth,
    }),
    dispatch => ({
        action: bindActionCreators({users_contacts_init}, dispatch),
    })
)(Addressbook)

import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {StyleSheet, Text, Image, View, ListView, TouchableOpacity, TextInput, Keyboard,} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import conf from '../../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../../theme/ume-theme'
import Loading from '../../../../../component/loading/normal'
import {user_invite_me} from '../../../../../reducer/user/follows'
import Img, {
    WIDTH_MD,
} from '../../../../../component/element/img/normal'

import {
    ABS_d5,
    N_4,
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
    N_26,
    N_25,
    N_30,
    N_60,
    N_80,
    BORDER_WIDTH,
    BORDER_COLOR,
    STATUSBAR_HEIGHT,
    COLOR_GRAY_D,
    COLOR_GRAY_XD,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_BLUE_L,
    COLOR_BLUE,
    SCREEN_WIDTH,
    COLOR_MAIN,
} from '../../../../../theme/ume-theme/variable.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

const UERS_FAVORITES_SELECT_PATH = '/users/favorites/select'
const USERS_FOLLOWS_INVITE_PATH = '/users/favorites'

class Favorite_search extends Component {

    constructor(props) {
      super(props)
      this.state = {
          text: '',
          show: false,
          list: this.props.navigation.state.params.list,
          inviteData: {},
          followSelect: {},
          init: false,
      }
      this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
      })
    }

     //申请关注别人
     handle_follows_invite(employeeId, is_favorites) {
         dismissKeyboard()

         _fetch({
             fetch_type: is_favorites ? 'DELETE' : 'POST',
             path: USERS_FOLLOWS_INVITE_PATH,
             param: {
                 wsId: employeeId,
                //  employeeIds: employeeId,
             },
             token: this.props.auth.info.token,
             lang: this.props.i18n.lang,
             success: rv => {
                 this. handle_be_invite(employeeId)
                 this.setState({
                     ...this.state,
                     inviteData: rv,
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

      handle_be_invite(id) {
          this.setState({
              ...this.state,
              list: R.map(
                  R.ifElse(
                      v => R.equals(v.employeeId)(id),
                      v => R.assoc('is_favorites', v.is_favorites? 0 : 1, v),
                      v => v
                  )
              )(this.state.list)
          })
      }

     delete(){
         this.setState({
             ...this.state,
             text: null,
         })
     }

     // 跳转到个人详情页
     handle_person(id) {
         dismissKeyboard()
         this.props.navigation.navigate('home_more_addressbook_personal_details',{id: id,})
     }

     handle_goback() {
         this.props.navigation.goBack()
         this.props.navigation.state.params.goback()
     }

    render() {
        const {
            i18n: {
                t,
            },
            info: {
                avatar,
            },
            navigation: {
                state: {
                    params: {
                        goback,
                        text,
                    }
                }
            },
            type,
            navigation,
        } = this.props

        return (
            <Container>
                <Header
                    left_option={{
                        show_goback: true,
                        navigation,
                        handle_press: this.handle_goback.bind(this),
                    }}
                    center_option={{
                        text: text.length ? text : '未关注的员工',
                    }}/>

                <Content style={{flex: 1}}>

                    <ListView
                        keyboardDismissMode={'on-drag'}
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        keyboardShouldPersistTaps={true}
                        renderRow={
                            v => (
                                <View
                                    key={v.employeeId}
                                    style={{
                                        paddingTop: N_10,
                                        paddingBottom: N_10,
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottomWidth: BORDER_WIDTH,
                                        borderBottomColor: BORDER_COLOR,
                                        paddingLeft: N_20,
                                        paddingRight: N_20,
                                }}>
                                    <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={this.handle_person.bind(this, v.employeeId)}>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Img
                                                width={N_26}
                                                style={style.avatar}
                                                src={v.avatar}/>

                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                                width: SCREEN_WIDTH * .45,
                                                marginLeft: N_10,
                                            }}>
                                                <Text style={{
                                                    fontSize: N_14,
                                                    color: COLOR_GRAY_XD,
                                                }}>
                                                    {v.name}
                                                </Text>
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{
                                                        paddingLeft: N_10,
                                                        width: SCREEN_WIDTH * .3,
                                                        fontSize: N_12,
                                                        color: COLOR_GRAY,
                                                    }}>
                                                    {v.jobCname}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={.5} onPress={this.handle_follows_invite.bind(this, v.employeeId, v.is_favorites)}>
                                         <View style={{
                                             width: N_80,
                                             padding: N_4,
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderWidth: BORDER_WIDTH,
                                             borderColor: v.is_favorites ? COLOR_GRAY : COLOR_MAIN,
                                             borderRadius: N_20,
                                         }}>
                                             <Text style={{
                                                 fontSize: N_12,
                                                 color: v.is_favorites ? COLOR_GRAY : COLOR_MAIN,
                                             }}>{ v.is_favorites ? '已关注' : '+ 关注'}</Text>
                                         </View>
                                     </TouchableOpacity>
                                </View>
                            )
                        }
                        dataSource={this.ds.cloneWithRows(this.state.list)}>
                    </ListView>


                </Content>
            </Container>
        )
    }
}

export default connect(
    state => ({
        type: state.User_follows,
        auth: state.Auth,
        info: state.User_info,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({user_invite_me}, dispatch),
    })
)(Favorite_search)

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
    N_5,
    N_8,
    N_10,
    N_14,
    N_15,
    N_16,
    N_18,
    N_20,
    N_22,
    N_25,
    N_30,
    N_60,
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
          list: [],
          inviteData: {},
          followSelect: {},
          init: false,
      }
      this.ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
      })
    }

    componentDidMount() {
        this.init()
    }

    //获取添加关注的人
    init() {
        _fetch({
            fetch_type: 'GET',
            path: UERS_FAVORITES_SELECT_PATH,
            param: {
                wsId: this.props.auth.info.id,
            },
            token: this.props.auth.info.token,
            success: rv => {
                this.setState({
                    ...this.state,
                    init: true,
                    followSelect: rv,
                    list: R.values(rv),
                    show: true,
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

     //申请关注别人
     handle_follows_invite(employeeId) {
         dismissKeyboard()

         _fetch({
             fetch_type: 'POST',
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
                      v => ({
                          ...v,
                          is_favorites: 1,
                      }),
                      v => v
                  )
              )(this.state.list)
          })
      }

     handle_search(text) {
         // 查询文本是否在结果集内
         var list = []

         if(R.isEmpty(this.state.followSelect)){
             this.setState({
                 ...this.state,
                 text: text,
             })
             return
         }

         this.state.followSelect.map(
             v => {
                 if(v.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                     list.push(v)
                 }
             }
         )

         this.setState({
             ...this.state,
             show: text.trim() != "" ? true : false,
             text: text,
             list,
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
            type,
            navigation,
        } = this.props

        return (
            <Container>
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: STATUSBAR_HEIGHT,
                        paddingBottom: N_15,
                        paddingLeft: N_10,
                        paddingRight: N_15,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}>
                        <View style={style.search_view}>
                            <TextInput
                                maxLength={10}
                                style={style.text_input}
                                selectionColor='#BBBBBB'
                                underlineColorAndroid='transparent'
                                placeholder={t.wants_to_get_attention}
                                placeholderTextColor='#a6a6a6'
                                value={this.state.text}
                                onChangeText={this.handle_search.bind(this)}/>
                        </View>

                        <TouchableOpacity onPress={() => this.handle_goback()}>
                            <View style={{
                                height: 40,
                                paddingLeft: N_15,
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
                                                    width={WIDTH_MD}
                                                    style={style.avatar}
                                                    src={v.avatar}/>

                                                <View style={{
                                                    width: SCREEN_WIDTH * .45,
                                                    marginLeft: N_10,
                                                }}>
                                                    <Text style={{
                                                        fontSize: N_16,
                                                        color: COLOR_GRAY_XD,
                                                    }}>
                                                        {v.name}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: N_14,
                                                        color: COLOR_GRAY,
                                                    }}>
                                                        {v.jobCname}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        {
                                             v.is_favorites
                                             ? <View style={{
                                                 backgroundColor: COLOR_BLUE_L,
                                                 borderRadius: N_10,
                                                 padding: 10,
                                             }}>
                                                 <Text style={{
                                                     color: 'white',
                                                 }}>
                                                     {t.attented}
                                                 </Text>
                                             </View>
                                             : <TouchableOpacity
                                                 onPress={() => {
                                                     this.handle_follows_invite(v.employeeId)
                                                 }}
                                                 activeOpacity={.5}>
                                                 <View style={{
                                                     backgroundColor: COLOR_BLUE_L,
                                                     borderRadius: N_10,
                                                     padding: 10,
                                                 }}>
                                                     <Text style={{
                                                         color: 'white',
                                                     }}>
                                                         {t.attention}
                                                     </Text>
                                                 </View>
                                             </TouchableOpacity>
                                        }

                                    </View>
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
        type: state.User_follows,
        auth: state.Auth,
        info: state.User_info,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({user_invite_me}, dispatch),
    })
)(Favorite_search)

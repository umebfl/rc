import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    Clipboard,
    Linking,
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import Header from '../../../../../component/layout/header'
import Divider_list from '../../../../../component/list/divider_list'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import toast from '../../../../../component/toast/normal'
import Loading from '../../../../../component/loading/normal'
import conf from '../../../../../../../conf.js'
import style from './style'
import ume_theme from '../../../../../theme/ume-theme'
// import {addressbook_personal_details_init, use_collection} from './reducer.js'
import Img from '../../../../../component/element/img/normal'

import {
    ABS_d5,
    N_10,
    N_14,
    N_16,
    N_20,
    N_22,
    N_25,
    COLOR_GRAY_XXL,
    SCREEN_WIDTH,
} from '../../../../../theme/ume-theme/variable.js'

import {
    users_contacts_init,
} from '../reducer.js'

import {
    _fetch,
} from '../../../../../lib/fetch'

const SRC_SEARCH = require('../../../../../../../content/img/more/search.png')
const SRC_ARROW_RIGHT_GRAY = require('../../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_FIXED_WORDS = require('../../../../../../../content/img/icon_address_book/fixed_words.png')
const SRC_FIXED_WORDS_GRAY = require('../../../../../../../content/img/icon_address_book/fixed_words_gray.png')
const SRC_PHONE = require('../../../../../../../content/img/icon_address_book/phone.png')
const SRC_PHONE_GRAY = require('../../../../../../../content/img/icon_address_book/phone_gray.png')
const SRC_NEWS = require('../../../../../../../content/img/icon_address_book/news.png')
const SRC_NEWS_GRAY = require('../../../../../../../content/img/icon_address_book/news_gray.png')
const SRC_EMAIL_ACCOUT = require('../../../../../../../content/img/icon_accout/email_accout.png')
const SRC_EMAIL_ACCOUT_GRAY = require('../../../../../../../content/img/icon_accout/email_accout_gray.png')
const SRC_APPLICATION = require('../../../../../../../content/img/icon_address_book/application.png')
const SRC_APPLICATION_GRAY = require('../../../../../../../content/img/icon_address_book/application_gray.png')
const SRC_INVITE = require('../../../../../../../content/img/icon_address_book/invite.png')
const SRC_INVITE_GRAY = require('../../../../../../../content/img/icon_address_book/invite_gray.png')
const SRC_DAIRY = require('../../../../../../../content/img/icon_address_book/dairy.png')
const SRC_DAIRY_GRAY = require('../../../../../../../content/img/icon_address_book/dairy_gray.png')
const SRC_COPY = require('../../../../../../../content/img/icon_address_book/copy_gray.png')
const SRC_BG = require('./bg.png')
const SRC_ARROW_LEFT = require('../../../../../../../content/img/icon_address_book/arrow_left.png')
const SRC_COLLECTION = require('../../../../../../../content/img/icon_address_book/collection.png')
const SRC_COLLECTION_FILL = require('../../../../../../../content/img/icon_address_book/collection_fill.png')
const SRC_DEFAULT = require('../../../../../../../content/img/icon/default.jpg')

const USERS_DETAILS_PATH = '/users/details'
const USERS_CONTACTS_PATH = '/users/contacts'
const USERS_FANS_INVITE_PATH = '/users/fans/invite'
const USERS_FOLLOWS_INVITE_PATH = '/users/follows/invite'
const USERS_RELATION_PATH = '/users/relation'

class Addressbook extends Component {

    constructor(prop) {
        super(prop)

        const data = prop.navigation.state.params.data

        this.state = {
            inited: false,
            inited_relation: false,
            enable: false,
            data: {},
            relation: {},
            isFavorite: false,
        }
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id

        this.search(id)
    }

    // 个人信息
    search(id) {
        _fetch({
            fetch_type: 'GET',
            path: `${USERS_CONTACTS_PATH}/${id}`,
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    ...this.state,
                    inited: true,
                    data: {
                        ...rv,
                        collect: rv.collect === 1 ? true : false,
                        // isApply: rv.isApply === 1 ? true : false,
                        // isInvite: rv.isInvite === 1 ? true : false,
                    },
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

    // 获取目标关系
    handle_relation() {
        _fetch({
            fetch_type: 'GET',
            path: USERS_RELATION_PATH,
            param: {
                targetId: this.props.navigation.state.params.id ? this.props.navigation.state.params.id : this.state.data.employeeId,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    ...this.state,
                    inited: true,
                    relation: rv,
                })
                // alert(JSON.stringify(this.state.relation))
            },
            update_state: payload => {
                this.setState({
                    ...this.state,
                    ...payload,
                })
            },
        })
    }

    // 申请关注别人
    handle_follows_invite() {
        _fetch({
            fetch_type: 'POST',
            path: USERS_FOLLOWS_INVITE_PATH,
            param: {
                wsId: this.props.auth.info.id,
                employeeIds: this.props.navigation.state.params.id ? this.props.navigation.state.params.id : this.state.data.employeeId,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                toast(this.props.i18n.t.send_application_successfully, {position: 0})

                this.setState({
                    ...this.state,
                    data: {
                        ...this.state.data,
                        isApply: rv ? !this.state.data.isApply : this.state.data.isApply,
                    }
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

     // 邀请粉丝
     handle_fans_invite() {
         _fetch({
             fetch_type: 'POST',
             path: USERS_FANS_INVITE_PATH,
             param: {
                 wsId: this.props.auth.info.id,
                 employeeIds: this.props.navigation.state.params.id ? this.props.navigation.state.params.id : this.state.data.employeeId,
             },
             token: this.props.auth.info.token,
             lang: this.props.i18n.lang,
             success: rv => {
                 toast(this.props.i18n.t.send_invitation_successfully, {position: 0})

                 this.setState({
                     ...this.state,
                     data: {
                         ...this.state.data,
                         isInvite: rv ? !this.state.data.isInvite : this.state.data.isInvite,
                     }
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

    handle_open(title, url) {
        Linking.openURL(url)
            .catch(err => toast(`${title}${this.props.i18n.t.fail}`))
    }

    handle_clip(v) {
        Clipboard.setString(v)
        toast(this.props.i18n.t.have_been_copied_to_clipboard)
    }

    // 收藏
    handle_collection() {

        if(!this.state.inited) {
            return
        }

        _fetch({
            fetch_type: this.state.data.collect ? 'DELETE' : 'PUT',
            path: USERS_CONTACTS_PATH,
            param: {
                wsId: this.props.auth.info.id,
                collection: this.props.navigation.state.params.id ? this.props.navigation.state.params.id : this.state.data.employeeId,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {
                this.setState({
                    ...this.state,
                    data: {
                        ...this.state.data,
                        collect: rv ? !this.state.data.collect : this.state.data.collect,
                    }
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

    handle_goback() {
        this.props.navigation.state.params.goback && this.props.navigation.state.params.goback()
    }

    // 关注和取消关注
    handle_cancel_favorites(employeeId, isFavorite) {
        const {
            i18n: {
                t,
            },
            follows: {
                data,
            },
        } = this.props

        _fetch({
            fetch_type: isFavorite ? 'POST' : 'DELETE',
            path: FAVORITES_PATH,
            param: {
                wsId: employeeId,
            },
            token: this.props.auth.info.token,
            lang: this.props.i18n.lang,
            success: rv => {

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
            info: {
                mail,
            },
            navigation,
        } = this.props

        const {
            inited,
            data: {
                avatar,
                name,
                jobCname,
                depCnname,
                employeeId,
                mobileTelephone,
                phone,
                email,
                gender,
                collect,
                inited_relation,
                isApply,
                isFollow,
                beFollow,
                isInvite,
                logCanView,
                empGrade,
            },
        } = this.state

        return (
            <Container style={{backgroundColor: COLOR_GRAY_XXL,}}>
                <Header
                    container_option={{
                        style: {
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            borderBottomWidth: 0,
                        },
                    }}
                    left_option={{
                        show_goback: true,
                        navigation: this.props.navigation,
                        source: SRC_ARROW_LEFT,
                        handle_press: this.handle_goback.bind(this),
                    }}
                    center_option={{
                        text: name,
                        text_style: {
                            color: 'white',
                        }
                    }}
                    right_option={{
                        source: collect ? SRC_COLLECTION_FILL : SRC_COLLECTION,
                        handle_press: this.handle_collection.bind(this),
                        icon_touchable_style: {
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingRight: N_20,
                        },
                        icon_style: {
                            width: N_22,
                            height: N_22,
                        }
                    }}/>

                <Loading visiable={this.state._fetch_loading}/>

                {
                    inited
                        ? <ParallaxView
                            backgroundSource={require('./bgd.png')}
                            windowHeight={280}
                            showsVerticalScrollIndicator={false}
                            header={(
                                <View>
                                    <View style={{
                                        width: SCREEN_WIDTH,
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 70,
                                    }}>

                                        <View style={style.content_avatar}>
                                            <Img
                                                style={style.avatar_img}
                                                src={avatar}/>
                                        </View>

                                        <View style={{
                                            backgroundColor: 'transparent',
                                            marginTop: N_20,
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                height: 26,
                                            }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: N_14,
                                                    paddingRight: N_10,
                                                }}>{t.job_number}：</Text>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 14,
                                                }}>{employeeId}</Text>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                height: 26,
                                            }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: N_14,
                                                    paddingRight: N_10,
                                                }}>{empGrade}</Text>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: N_14,
                                                    paddingRight: N_10,
                                                }}>{t.position}：</Text>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 14,
                                                }}>{jobCname}</Text>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                height: 26,
                                            }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: N_14,
                                                    paddingRight: N_10,
                                                }}>{t.department}：</Text>
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 14,
                                                }}>{depCnname}</Text>
                                            </View>


                                        </View>
                                    </View>
                                </View>

                            )}
                            scrollableViewStyle={{ backgroundColor: 'white' }}>
                            <View style={{
                                backgroundColor: COLOR_GRAY_XXL,
                            }}>
                                <Divider_list
                                    data={[
                                        {
                                            img_src: mobileTelephone ? SRC_FIXED_WORDS : SRC_FIXED_WORDS_GRAY,
                                            title_left: t.make_a_call,
                                            show_right_text: false,
                                            enable: mobileTelephone ? true : false,
                                            image_src_right_arrow: SRC_COPY,
                                            on_press: () => this.handle_open(t.make_a_call, `tel:${mobileTelephone}`),
                                            on_icon_press: () => this.handle_clip(mobileTelephone),
                                        },
                                        {
                                            img_src: phone ? SRC_PHONE : SRC_PHONE_GRAY,
                                            title_left: t.call_landline,
                                            show_right_text: false,
                                            enable: phone ? true : false,
                                            image_src_right_arrow: SRC_COPY,
                                            on_press: () => this.handle_open(t.call_landline, `tel:${phone}`),
                                            on_icon_press: () => this.handle_clip(phone),
                                        },
                                        {
                                            img_src: mobileTelephone ? SRC_NEWS : SRC_NEWS_GRAY,
                                            title_left: t.send_message,
                                            enable: mobileTelephone ? true : false,
                                            on_press: () => this.handle_open(t.send_message, `sms:${mobileTelephone}`),
                                        },
                                        {
                                            img_src: email ? SRC_EMAIL_ACCOUT : SRC_EMAIL_ACCOUT_GRAY,
                                            title_left: t.send_mail,
                                            enable: email ? true : false,
                                            on_press: () => this.handle_open(t.send_mail, `mailto:${email}`),
                                        },
                                        // {
                                        //     img_src: SRC_MAIL,
                                        //     title_left: '测试：打开网址',
                                        //     on_press: () => this.handle_open('http://www.baidu.com'),
                                        // },
                                    ]}/>
                                {
                                    // <Divider_list
                                    //     data={[
                                    //         {
                                    //             img_src: isFollow || isApply ? SRC_APPLICATION_GRAY : SRC_APPLICATION,
                                    //             title_left: t.apply_for_attention_to_TA,
                                    //             show_right_text: true,
                                    //             enable: isFollow || isApply ? false : true,
                                    //             title_right: isFollow
                                    //                             ? t.attention_has_been_paid_to_TA
                                    //                             : isApply
                                    //                                 ? t.applied
                                    //                                 : null,
                                    //             on_press: () => this.handle_follows_invite(),
                                    //         },
                                    //         {
                                    //             img_src: beFollow || isInvite ? SRC_INVITE_GRAY : SRC_INVITE,
                                    //             title_left: t.invite_attention_to_me,
                                    //             show_right_text: true,
                                    //             enable: beFollow || isInvite ? false : true,
                                    //             title_right: beFollow
                                    //                             ? t.have_paid_attention_to_me
                                    //                             : isInvite
                                    //                               ? t.applied
                                    //                               : null,
                                    //             on_press: () => this.handle_fans_invite(),
                                    //         },
                                    //     ]}/>

                                    // <Divider_list
                                    //     data={[
                                    //         {
                                    //             img_src: logCanView ? SRC_DAIRY : SRC_DAIRY_GRAY,
                                    //             title_left: t.view_log,
                                    //             enable: logCanView ? true : false,
                                    //             on_press: () => (navigation.navigate('home_diary_more', { id: employeeId, name: name })),
                                    //         }
                                    //     ]}/>
                                }


                            </View>
                        </ParallaxView>
                        : null
                }

            </Container>
        )
    }
}

export default connect(
    state => ({
        // details: state.Addressbook_personal_details,
        info: state.User_info,
        auth: state.Auth,
        i18n: state.I18n,
    }),
    dispatch => ({
        action: bindActionCreators({users_contacts_init}, dispatch),
    })
)(Addressbook)

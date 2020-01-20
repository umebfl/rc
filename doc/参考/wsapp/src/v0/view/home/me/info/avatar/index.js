import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Loading from '../../../../../component/loading/normal'
import Content from '../../../../../component/layout/content'
import Img from '../../../../../component/element/img/normal'
import toast from '../../../../../component/toast/normal'

import conf from '../../../../../../../conf.js'

import {
    user_info_set_avatar,
} from '../../../../../reducer/user/info/index.js'

import {
    ABS_d5,
    N_10,
    N_12,
    N_14,
    N_16,
    N_18,
    N_30,
    N_50,
    N_60,
    COLOR_GRAY_XXL,
    COLOR_GRAY_L,
    COLOR_GRAY,
    COLOR_GRAY_D,
} from '../../../../../theme/ume-theme/variable.js'
import {
    get_id_pwd_token,
} from '../../../../../lib/auth'

import {
    _fetch,
} from '../../../../../lib/fetch'

const SRC_DEFAULT = require('../../../../../../../content/img/icon/default.jpg')

const screenWidth = Dimensions.get('window').width
// const screenHeight = Dimensions.get('window').Height

const defaultOptions = {
    width: parseInt(screenWidth),
    height: 400,
    cropping: true,
    includeBase64: true,
}

const defaultCameraOptions = {
    includeBase64: true,
    compressImageMaxWidth: parseInt(screenWidth) * 2,
    compressImageMaxHeight: 400 * 2,
    compressImageQuality: 1,
}

const DATA_PATH = '/1/account/update_profile_image_ajax.json'
const SET_IMG_PATH = '/users/avatars'

// const check_type = type => {
//     const t = type.substring(type.length - 4)
//     return t === '.jpg' || t === 'jpeg' || t  === '.png'
// }

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, avatarSource: '' };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    upload(uri) {
        let formData = new FormData()
        // formData.append('file', {uri: uri, type: 'multipart/form-data', name: 'image.jpg'})
        formData.append('file', { uri: uri, type: 'image/jpg', name: 'image.jpg' })

        _fetch({
            fetch_type: 'POST',
            host: conf.weibo.host,
            path: DATA_PATH,
            param: formData,
            is_upload: true,
            token: get_id_pwd_token(this.props.info.mail, this.props.auth.info.md5_pwd),
            lang: this.props.i18n.lang,
            success: rv => {
                // this.props.action.user_info_set_avatar(rv)
                // 同步
                _fetch({
                    fetch_type: 'POST',
                    path: SET_IMG_PATH,
                    param: {
                        wsId: this.props.auth.info.id,
                        imageName: rv,
                    },
                    token: this.props.auth.info.token,
                    lang: this.props.i18n.lang,
                    success: () => {
                        this.props.action.user_info_set_avatar(rv)
                    },
                    update_state: payload => {
                        this.setState({
                            ...this.state,
                            ...payload,
                        })
                    },
                })

                ImagePicker.clean().then(() => {
                    console.log('removed all tmp images from tmp directory')
                }).catch(e => {
                    console.log(e)
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

    picker() {
        ImagePicker.openPicker(defaultOptions).then(image => {
            let source = { uri: 'data:image/jpeg;base64,' + image.data }
            this.setState({
                avatarSource: source
            })
            this.upload(image.path)
        })
    }

    camera() {
        ImagePicker.openCamera(defaultCameraOptions).then(image => {
            let source = { uri: 'data:image/jpeg;base64,' + image.data }
            this.setState({
                avatarSource: source
            })

            // if(!check_type(image.path)) {
            //     toast('请选择类型为jpg、png的图片', {position: 0})
            //     return
            // }

            this.upload(image.path)
        })

    }

    render() {
        const {
            i18n: {
                t,
            },
            navigation,
            info: {
                avatar,
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
                        text: t.set_avatar,
                    }} />

                <Content style={{ backgroundColor: COLOR_GRAY_XXL, }}>
                    <Loading visiable={this.state._fetch_loading} />
                    <Image
                        square
                        defaultSource={SRC_DEFAULT}
                        source={this.state.avatarSource || { uri: `${conf.weibo.host}${conf.weibo.avatar}${avatar}` }}
                        style={{
                            width: screenWidth,
                            height: screenWidth,
                        }} />

                    <View style={{
                        // height: screenHeight - screenWidth,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.camera()}
                            activeOpacity={.5}
                            style={{
                                width: screenWidth * .8,
                                borderWidth: .3,
                                borderColor: COLOR_GRAY_L,
                                paddingTop: N_10,
                                paddingBottom: N_10,
                                borderRadius: N_10,
                                backgroundColor: 'white',
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: N_18,
                                color: COLOR_GRAY_D,
                            }}>
                                {t.take_a_photo}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.picker()}
                            activeOpacity={.5}
                            style={{
                                marginTop: N_30,
                                width: screenWidth * .8,
                                borderWidth: .3,
                                borderColor: COLOR_GRAY_L,
                                paddingTop: N_10,
                                paddingBottom: N_10,
                                borderRadius: N_10,
                                backgroundColor: 'white',
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: N_18,
                                color: COLOR_GRAY_D,
                            }}>
                                {t.choose_one_from_the_album}
                            </Text>
                        </TouchableOpacity>

                        <Text style={{
                            textAlign: 'center',
                            fontSize: N_14,
                            color: COLOR_GRAY,
                            paddingTop: N_10,
                        }}>
                            {t.support_picture_format}
                        </Text>
                    </View>
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
    dispatch => ({
        action: bindActionCreators({user_info_set_avatar}, dispatch),
    })
)(Avatar)

import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    findNodeHandle,
} from 'react-native'
// import {BlurView, VibrancyView} from 'react-native-blur'

import Container from '../../../component/layout/container'

import style from './style.js'
import conf from '../../../../../conf.js'

class More extends Component {
    constructor(props) {
      super(props)
      this.state = {viewRef: null}
    }

    imageLoaded() {
        this.setState({
            viewRef: findNodeHandle(this.backgroundImage),
        })
    }

    render() {
        const {
            info: {
                avatar,
            },
            navigation: {
                navigate,
            },
            i18n: {
                t,
            },
        } = this.props

        return (
            <Container>

                <View style={style.header}>
                    <View style={style.header_bg}>
                        <Image
                            ref={(img) => {this.backgroundImage = img}}
                            source={{uri: `${conf.weibo.host}${conf.weibo.avatar}${avatar}`}}
                            onLoadEnd={this.imageLoaded.bind(this)}
                            style={style.header_bg}/>

                        <BlurView
                          style={style.header_bg}
                          viewRef={this.state.viewRef}
                          blurType='light'
                          blurAmount={7}/>
                    </View>

                    <View style={{
                        borderBottomWidth: .8,
                        borderBottomColor: 'rgba(255, 255, 255, .6)',
                        paddingBottom: 10,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            backgroundColor: 'transparent',
                            color: "#202020",
                        }}>{t.more}</Text>
                    </View>
                </View>

                <View style={style.content}>
                    <TouchableOpacity onPress={() => navigate('home_more_oa')}  activeOpacity={.5}>
                        <View style={style.item}>
                            <Image square source={require('../../../../../content/img/more/more_blue/OA.png')} style={style.icon}/>
                            <Text style={style.item_text}>OA</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigate('home_more_field')}  activeOpacity={.5}>
                        <View style={style.item}>
                            <Image square source={require('../../../../../content/img/more/more_blue/check.png')} style={style.icon}/>
                            <Text style={style.item_text}>{t.field_worker}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigate('home_more_addressbook')}  activeOpacity={.5}>
                        <View style={style.item}>
                            <Image square source={require('../../../../../content/img/more/more_blue/contact.png')} style={style.icon}/>
                            <Text style={style.item_text}>{t.address_book}</Text>
                        </View>
                    </TouchableOpacity>

                    {
                    // <View style={style.item}>
                    //     <Image square source={require('../../../../../content/img/icon/share_1.png')} style={style.icon}/>
                    //     <Text style={style.item_text}>邮箱</Text>
                    // </View>
                    //
                    // <View style={[style.item, style.item_last]}>
                    //     <Image square source={require('../../../../../content/img/icon/share_1.png')} style={style.icon}/>
                    //     <Text style={style.item_text}>虚拟桌面</Text>
                    // </View>
                    }
                </View>

            </Container>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
        info: state.User_info,
        state: state.Log,
    }),
)(More)

import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
// import {AnimatedCircularProgress} from 'react-native-circular-progress'
import codePush from 'react-native-code-push'

import Header from '../../../../../component/layout/header'
import Container from '../../../../../component/layout/container'
import Content from '../../../../../component/layout/content'
import Divider_list from '../../../../../component/list/divider_list'

import {
    BORDER_WIDTH,
    BORDER_SHADOW_COLOR,
    COLOR_GRAY,
    COLOR_MAIN,
    COLOR_GRAY_XL,
    N_12,
} from '../../../../../theme/ume-theme/variable.js'

import conf from '../../../../../../../conf.js'

const SRC_ARROW_RIGHT_GRAY = require('../../../../../../../content/img/icon/arrow_right_gray.png')
const SRC_SHIELD = require('../../../../../../../content/img/icon/shield.png')

const STEP = {
    init: 0,
    check: 1,
    update: 2,
}

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL}

class Home_me_setting_update extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            step: STEP.init,

            update: {
                receive: 1,
                total: 100,
            },

            check: {
                checking: false,
                latest_version: false,
            },
        }
    }

    update_check() {
        const {
            i18n: {
                t,
            },
        } = this.props

        this.setState({
            ...this.state,
            step: STEP.check,
            check: {
                checking: false,
                latest_version: false,
            },
        })

        this.refs.circularProgress.performLinearAnimation(12, 1000)

        codePush.checkForUpdate().then((update) => {
            if (!update) {
                alert("app是最新版了");
            } else {
                console.log("有更新哦");

                //codePush.sync(options: Object, syncStatusChangeCallback: function(syncStatus: Number), downloadProgressCallback: function(progress: DownloadProgress)): Promise<Number>;

                codePush.sync({
                    updateDialog: {
                        appendReleaseDescription: true,
                        descriptionPrefix: '\n\n更新内容：\n',
                        title: '更新',

                        //强制更新处理
                        mandatoryUpdateMessage: '发现新版本，需要立即更新！',
                        mandatoryContinueButtonLabel: '更新',

                        //非强制更新处理
                        optionalUpdateMessage: '发现新版本，是否现在更新？',
                        optionalIgnoreButtonLabel: '跳过',
                        optionalInstallButtonLabel: '后台更新',
                    },
                    installMode: codePush.InstallMode.IMMEDIATE
                },
                    (status) => {
                        switch (status) {
                            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                                // Show "downloading" modal
                                this.setState({
                                    ...this.state,
                                    show: true,
                                })
                                break;
                            case codePush.SyncStatus.INSTALLING_UPDATE:
                                // Hide "downloading" modal
                                this.setState({
                                    ...this.state,
                                    show: false,
                                })
                                break;
                        }
                    },
                    ({ receivedBytes, totalBytes}) => {
                        /* Update download modal progress */
                        this.setState({
                            ...this.state,
                            receive: receivedBytes,
                            total: totalBytes,
                        })
                    }
                );
            }
        });
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
                    }}
                    center_option={{
                        text: t.app_update,
                    }}/>

                <Content style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>

                    <View>
                        <View style={{
                            marginTop: 30,
                            marginBottom: 60,
                            alignItems: 'center',
                        }}>
                            {
                                // <AnimatedCircularProgress
                                //     ref='circularProgress'
                                //     size={100}
                                //     width={3}
                                //     fill={0}
                                //     tintColor={COLOR_MAIN}
                                //     backgroundColor={this.state.step === STEP.init ? COLOR_MAIN : COLOR_GRAY_XL}>
                                //     {
                                //         fill => (
                                //             <View style={{
                                //                 flexDirection: 'row',
                                //                 justifyContent: 'center',
                                //                 marginTop: -58,
                                //             }}>
                                //                 {
                                //                     this.state.step === STEP.init
                                //                         ? <Text style={{
                                //                             color: COLOR_MAIN,
                                //                             fontSize: 14,
                                //                             marginTop: 2,
                                //                             backgroundColor: 'transparent',
                                //                         }}>
                                //                             {`v${conf.version}`}
                                //                         </Text>
                                //                         : <View style={{
                                //                             flexDirection: 'row',
                                //                         }}>
                                //                             <Text style={{
                                //                                 textAlign: 'center',
                                //                                 color: COLOR_MAIN,
                                //                                 fontSize: 16,
                                //                                 width: 30,
                                //                                 backgroundColor: 'transparent',
                                //                             }}>
                                //                                 {
                                //                                     `${Math.ceil(this.state.update.receive / this.state.update.total)}`
                                //                                 }
                                //                             </Text>
                                //                             <Text style={{
                                //                                 color: COLOR_MAIN,
                                //                                 fontSize: 14,
                                //                                 marginTop: 2,
                                //                                 backgroundColor: 'transparent',
                                //                             }}>
                                //                                 %
                                //                             </Text>
                                //                         </View>
                                //                 }
                                //
                                //             </View>
                                //         )
                                //     }
                                // </AnimatedCircularProgress>
                            }

                        </View>

                        <View style={{
                            borderTopWidth: BORDER_WIDTH,
                            borderTopColor: BORDER_SHADOW_COLOR,
                        }}>
                            <Divider_list
                                show_bottom_border={true}
                                navigate={navigation.navigate}
                                data={[
                                    {
                                        img_src: SRC_SHIELD,
                                        title_left: t['当前版本'],
                                        show_right_text: true,
                                        title_right: `v${conf.version}`
                                    },
                                ]}/>
                        </View>


                        {
                            this.state.step === STEP.check && this.state.check.latest_version
                                ? <Text style={{
                                    fontSize: N_12,
                                    textAlign: 'center',
                                    color: COLOR_GRAY,
                                }}>{t['已经是最新版本']}</Text>
                                : null
                        }

                    </View>

                    {
                        this.state.step === STEP.check && !this.state.check.latest_version
                            ? <TouchableOpacity onPress={() => this.update_check()}>
                                <View style={{
                                    justifyContent: 'center',
                                    backgroundColor: COLOR_MAIN,
                                    height: 32,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 20,
                                    borderRadius: 32,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white',
                                        textAlign: 'center',
                                        backgroundColor: 'transparent',
                                    }}>{t['安装更新']}</Text>
                                </View>
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={() => this.update_check()}>
                                <View style={{
                                    justifyContent: 'center',
                                    backgroundColor: COLOR_MAIN,
                                    height: 36,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginBottom: 20,
                                    borderRadius: 36,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: 'white',
                                        textAlign: 'center',
                                        backgroundColor: 'transparent',
                                    }}>{t['检查更新']}</Text>
                                </View>
                            </TouchableOpacity>
                    }

                </Content>
            </Container>
        )
    }
}

export default codePush(codePushOptions)(connect(
    state => ({
        i18n: state.I18n,
    }),
)(Home_me_setting_update))

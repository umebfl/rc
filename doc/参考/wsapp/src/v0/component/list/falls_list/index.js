import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    ListView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native'
// import {
//     TextLoader,
//     BubblesLoader,
// } from 'react-native-indicator'
import Normal_loading from '../../loading/normal'
import Spinner from '../../loading/spinner'

import {
    COLOR_MAIN,
    COLOR_GRAY_XD,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_GRAY_XL,
    COLOR_GRAY_XXL,

    BORDER_WIDTH,
    BORDER_COLOR,
    BORDER_SHADOW_COLOR,

    HEADER_HEIGHT,
    HEADER_BACKGROUND_COLOR,
    HEADER_TEXT_COLOR,
    HEADER_TEXT_ACTIVE_COLOR,
    HEADER_ICON_TOUCH_WIDTH,
    STATUSBAR_FILLUP_HEIGHT,

    N_2,
    N_3,
    N_4,
    N_5,
    N_6,
    N_10,
    N_12,
    N_14,
    N_15,
    N_20,
    N_22,
    N_40,
    N_44,
} from '../../../theme/ume-theme/variable.js'

// 调用onEndReached之前的临界值，单位是像素。
const END_REACHED_THRESHOLD = 100

class Falls_list extends Component {

    constructor(prop) {
        super(prop)
        this.state = {}
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    }

    handle_on_refresh() {
        const {
            top_refreshing,
            // no_more_data,
        } = this.props

        if(!top_refreshing) {
            this.props.on_refresh()
        }
    }

    handle_end_reached() {
        const {
            top_refreshing,
            // no_more_data,
            inited,
            data,
        } = this.props

        if(inited && !top_refreshing && data.length) {
            this.props.on_end_reached()
        }
    }

    render() {
        const {
            i18n: {
                t,
            },
            inited,
            fetch_error,
            path,
            data,
            render_row,
            on_refresh,
            top_refreshing,
            no_more_data,
            renderHeader,
            on_scroll,
        } = this.props

        return (
            <View style={{
                flex: 1,
                backgroundColor: COLOR_GRAY_XXL,
            }}>
                {
                    fetch_error
                        ? null
                        : <Normal_loading visiable={!inited}/>
                }

                <ListView
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.handle_on_refresh.bind(this)}
                            // refreshing={true}
                            refreshing={inited ? top_refreshing : false}
                            tintColor={COLOR_GRAY_L}
                            title={`${t.drop_refresh_data}...`}/>
                    }
                    renderRow={render_row}
                    dataSource={this.ds.cloneWithRows(data === null ? [] : data)}
                    onEndReached={this.handle_end_reached.bind(this)}
                    onEndReachedThreshold={END_REACHED_THRESHOLD}
                    renderHeader={renderHeader}
                    onScroll={on_scroll}
                    renderFooter={() => (
                        <View style={{
                            marginTop: N_15,
                            marginBottom: N_20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            {
                                R.ifElse(
                                    R.equals(true),

                                    () => (
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 22,
                                            flex: null,
                                        }}>
                                            <TouchableOpacity onPress={this.props.on_end_reached.bind(this)}>
                                                <Text style={{
                                                    color: COLOR_MAIN,
                                                    fontSize: N_12,
                                                    paddingTop: N_12,
                                                }}>{t.click_refresh}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ),

                                    () => {
                                        if(inited === true) {
                                            if(no_more_data === true) {
                                                return (
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: 22,
                                                    }}>
                                                        <Text style={{
                                                            color: COLOR_GRAY_L,
                                                            fontSize: N_12,
                                                        }}>{t.no_more}</Text>
                                                    </View>
                                                )
                                            } else {
                                                return (
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: 22,
                                                    }}>
                                                        <Spinner color={COLOR_GRAY_L}/>
                                                        <Text style={{
                                                            color: COLOR_GRAY_L,
                                                            fontSize: N_12,
                                                        }}>  {t.loading}</Text>
                                                    </View>
                                                )
                                            }
                                        }
                                    }
                                    // () => R.ifElse(
                                    //     R.equals(true),
                                    //     () => R.ifElse(
                                    //         R.equals(true),
                                    //         () => ,
                                    //         () =>
                                    //     )(no_more_data),
                                    //     () => null
                                    // )(inited)
                                )(fetch_error)
                            }
                        </View>
                    )}
                    enableEmptySections={true}/>
            </View>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
        auth: state.Auth,
    }),
)(Falls_list)


// <TextLoader textStyle={{
//     color: COLOR_GRAY_L,
//     fontSize: N_12,
// }} text='  加载中'/>

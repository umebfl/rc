import React, {
    Component,
} from 'react'

import R from 'ramda'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Animated,
} from 'react-native'

import * as variable from '../../../../theme/ume-theme/variable.js'
import style from './style.js'

const SORT_BLACK_TOP_ICON = require('../../../../../../content/img/filter/sort-b-top.png')
const SORT_BLACK_DOWN_ICON = require('../../../../../../content/img/filter/sort-b-down.png')
const SORT_LIGHT_TOP_ICON = require('../../../../../../content/img/filter/sort-l-top.png')
const SORT_LIGHT_DOWN_ICON = require('../../../../../../content/img/filter/sort-l-down.png')

const ARROW_ICON = require('../../../../../../content/img/filter/a.png')
const FUNNEL_ICON = require('../../../../../../content/img/filter/f-1.png')
const FUNNEL_ICON_DISABLE = require('../../../../../../content/img/filter/f.png')
const SELECT_ICON = require('../../../../../../content/img/filter/s.png')

export const FILTER_HEIGHT = variable.N_40

class Filter_bar extends Component {

    constructor(prop) {
        super(prop)

        this.state = {
            list: {
                active: -1,
                show: false,
            },
        }

        this.shade_opacity = new Animated.Value(0)
    }

    handle_press(k) {
        const show = this.state.list.active === k ? !this.state.list.show : true

        this.setState({
            ...this.state,
            list: {
                ...this.state.list,
                active: k,
                show,
                data: this.props.data.data[k],
            },
        })

        this.shade_show(show)
    }

    shade_show(show) {
        if(show) {
            this.shade_opacity.setValue(0)
            Animated.timing(
                this.shade_opacity,
                {
                    toValue: .3,
                    duration: 200,
                    // friction: 1,
                    // tension: 100
                }
            ).start()
        } else {
            this.shade_opacity.setValue(.3)
            Animated.timing(
                this.shade_opacity,
                {
                    toValue: 0,
                    duration: 200,
                    // friction: 1,
                    // tension: 100
                }
            ).start()
        }

    }

    handle_shade_press() {
        this.shade_show(false)
        this.setState({
            ...this.state,
            list: {
                ...this.state.list,
                show: false,
            },
        })
    }

    handle_select(k) {

        // setTimeout(
        //     () => {
        //         this.props.set_top_refreshing(true)
        //     },
        //     1000
        // )
        // setTimeout(
        //     () => {
        //         this.props.set_top_refreshing(false)
        //     },
        //     3000
        // )

        this.props.handle_select({lv1: this.state.list.active, active: k})

        this.shade_show(false)

        this.setState({
            ...this.state,
            list: {
                ...this.state.list,
                show: false,
            },
        })
    }

    render() {
        const {
            data: {
                data,
                drawer: {
                    active,
                },
            },
            diary_staff: {
                count,
                total,
            },
            i18n: {
                t,
            },
            navigation,
        } = this.props

        const {
            list,
        } = this.state

        const funnel_no_active = R.compose(
            R.all(R.isEmpty),
            R.values,
        )(active)

        return (
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'transparent',
                height: list.show ? variable.SCREEN_HEIGHT : FILTER_HEIGHT + variable.BORDER_WIDTH,
                flexDirection: 'row',
                zIndex: variable.ZINDEX_FILTER_BAR,
                // alignItems: 'center',
                // height: variable.SCREEN_HEIGHT,
            }}>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <TouchableWithoutFeedback
                                key={k}
                                onPress={
                                    () => R.cond([
                                        [
                                            R.equals('advance'),
                                            () => navigation.navigate('DrawerOpen'),
                                        ],
                                        [
                                            R.equals('unread'),
                                            () => {},
                                        ],
                                        [
                                            R.T,
                                            () => this.handle_press(k),
                                        ],
                                    ])(v.id)
                                }>

                                <View style={{
                                    width: variable.SCREEN_WIDTH / data.length,
                                    height: FILTER_HEIGHT,
                                    justifyContent: 'center',
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRightWidth: k === data.length - 1 ? 0 : variable.BORDER_WIDTH,
                                        borderRightColor: variable.BORDER_COLOR,
                                    }}>
                                        {
                                            R.ifElse(
                                                R.equals('text'),
                                                () => (
                                                    <View>
                                                        <Text style={{
                                                            color: variable.COLOR_GRAY,
                                                            fontSize: variable.N_13,
                                                        }}>
                                                            {
                                                                R.reduce(
                                                                    (string, {v, k}) => R.replace(k, v)(string),
                                                                    v.string
                                                                )([
                                                                    {
                                                                        k: '{unread}',
                                                                        v: count,
                                                                    },
                                                                    {
                                                                        k: '{total}',
                                                                        v: total,
                                                                    },
                                                                ])
                                                            }
                                                        </Text>
                                                    </View>
                                                ),
                                                () => R.cond([
                                                    [
                                                        R.equals('funnel'),
                                                        () => (
                                                            <Text style={{
                                                                fontSize: variable.N_14,
                                                                color: funnel_no_active ? variable.COLOR_GRAY_XD : variable.COLOR_MAIN,
                                                                marginRight: variable.N_5,
                                                            }}>
                                                                {
                                                                    t[v.data[v.active].n]
                                                                }
                                                            </Text>
                                                        ),
                                                    ],
                                                    [
                                                        R.T,
                                                        () => (
                                                            <Text style={{
                                                                fontSize: variable.N_14,
                                                                color: variable.COLOR_GRAY_XD,
                                                                marginRight: variable.N_5,
                                                            }}>
                                                                {
                                                                    t[v.data[v.active].n]
                                                                }
                                                            </Text>
                                                        ),
                                                    ],
                                                ])(v.icon_type)
                                            )(v.type)
                                        }

                                        {
                                            R.ifElse(
                                                R.equals('text'),
                                                () => <View></View>,
                                                () => R.cond([
                                                    [
                                                        R.equals('arrow'),
                                                        () => (
                                                            <Image
                                                                square
                                                                source={ARROW_ICON}
                                                                style={style.icon_style_arrow}/>
                                                        ),
                                                    ],
                                                    [
                                                        R.equals('sort-top'),
                                                        () => (
                                                            <Image
                                                                square
                                                                source={SORT_BLACK_TOP_ICON}
                                                                style={style.icon_style_sort}/>
                                                        ),
                                                    ],
                                                    [
                                                        R.equals('sort-down'),
                                                        () => (
                                                            <Image
                                                                square
                                                                source={SORT_BLACK_DOWN_ICON}
                                                                style={style.icon_style_sort}/>
                                                        ),
                                                    ],
                                                    [
                                                        R.equals('funnel'),
                                                        () => (
                                                            <Image
                                                                square
                                                                source={funnel_no_active ? FUNNEL_ICON_DISABLE : FUNNEL_ICON}
                                                                style={style.icon_style_funnel}/>
                                                        ),
                                                    ],
                                                ])(v.icon_type)
                                            )(v.type)
                                        }

                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    )(data)
                }

                {
                    !list.show
                        ? null
                        : <TouchableWithoutFeedback onPress={this.handle_shade_press.bind(this)}>
                            <Animated.View style={{
                                position: 'absolute',
                                width: variable.SCREEN_WIDTH,
                                height: variable.SCREEN_HEIGHT,
                                top: FILTER_HEIGHT,
                                backgroundColor: '#000',
                                opacity: this.shade_opacity,
                            }}/>
                        </TouchableWithoutFeedback>
                }

                <View style={{
                    position: 'absolute',
                    width: variable.SCREEN_WIDTH,
                    top: FILTER_HEIGHT,
                    left: 0,
                    borderTopWidth: variable.BORDER_WIDTH,
                    borderTopColor: variable.BORDER_COLOR,
                }}>
                    {
                        !list.show
                            ? null
                            : R.addIndex(R.map)(
                                (v, k) => {
                                    return (
                                        <TouchableWithoutFeedback key={k} onPress={this.handle_select.bind(this, k)}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: variable.N_15,
                                                backgroundColor: 'white',
                                                borderBottomWidth: variable.BORDER_WIDTH,
                                                borderBottomColor: variable.BORDER_COLOR,
                                            }}>
                                                <Text style={{
                                                    color: data[list.active].active === k ? variable.COLOR_MAIN : variable.COLOR_GRAY,
                                                    fontSize: variable.N_14,
                                                }}>
                                                    {
                                                        t[v.n]
                                                    }
                                                </Text>

                                                {
                                                    R.ifElse(
                                                        R.equals(k),
                                                        () => (
                                                            R.cond([
                                                                [
                                                                    R.equals('sort-top'),
                                                                    () => (
                                                                        <Image
                                                                            square
                                                                            source={SORT_LIGHT_TOP_ICON}
                                                                            style={style.icon_style_sort}/>
                                                                    ),
                                                                ],
                                                                [
                                                                    R.equals('sort-down'),
                                                                    () => (
                                                                        <Image
                                                                            square
                                                                            source={SORT_LIGHT_DOWN_ICON}
                                                                            style={style.icon_style_sort}/>
                                                                    ),
                                                                ],
                                                                [
                                                                    R.T,
                                                                    () => (
                                                                        <Image
                                                                            square
                                                                            source={SELECT_ICON}
                                                                            style={style.icon_style_funnel}/>
                                                                    ),
                                                                ],
                                                            ])(data[list.active].icon_type)
                                                        ),
                                                        () => null
                                                    )(data[list.active].active)
                                                }

                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }
                            )(data[list.active].data)
                    }
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        diary_staff: state.Diary_staff,
        i18n: state.I18n,
    }),
)(Filter_bar)

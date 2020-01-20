import R from 'ramda'

import React, {
    Component,
} from 'react'

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
    ScrollView,
} from 'react-native'

import Container from '../../../../../../component/layout/container'
import Content from '../../../../../../component/layout/content'
import Header from '../../../../../../component/layout/header'

import {
    DRAWER_WIDTH,
} from '../../../../drawer'

import * as variable from '../../../../../../theme/ume-theme/variable.js'

import * as reducer from '../../reducer'

import drawer_style, {
    FILTER_HEADER_HEIGHT,
} from '../style.js'

import style from './style.js'

class Filter_drawer_seq extends Component {

    handle_select_all(type) {
        alert(type)
    }

    render() {
        const {
            t,
            data: {
                active: {
                    seq_active,
                },
            },
            action: {
                home_diary_staff_filter_drawer_seq_reset,
                home_diary_staff_filter_drawer_seq_item_press,
                home_diary_staff_filter_drawer_seq_select_all,
            },
        } = this.props

        return (
            <ScrollView>
                <View style={style.seq_item_container}>
                    <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_select_all('M')}>
                        <View style={style.seq_item_title}>
                            <Text style={style.seq_item_title_text}>M-{t.manager}</Text>
                            {
                                R.indexOf('M')(R.toString(seq_active)) === -1
                                    ? <Text style={[style.seq_item_select_all, style.seq_item_text_active]}>{t['全部']}</Text>
                                    : <Text style={style.seq_item_select_all}>{t['取消选择']}</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={style.seq_item_content}>
                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('M1')}>
                            <View style={R.merge(
                                style.seq_item,
                                R.contains('M1', seq_active) ? style.seq_item_active : {},
                            )}>
                                <Text style={R.merge(
                                    style.seq_item_text,
                                    R.contains('M1', seq_active) ? style.seq_item_text_active : {},
                                )}>1{t['级']}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('M2')}>
                            <View style={R.merge(
                                style.seq_item,
                                R.contains('M2', seq_active) ? style.seq_item_active : {},
                            )}>
                                <Text style={R.merge(
                                    style.seq_item_text,
                                    R.contains('M2', seq_active) ? style.seq_item_text_active : {},
                                )}>2{t['级']}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('M3')}>
                            <View style={R.merge(
                                style.seq_item,
                                R.contains('M3', seq_active) ? style.seq_item_active : {},
                            )}>
                                <Text style={R.merge(
                                    style.seq_item_text,
                                    R.contains('M3', seq_active) ? style.seq_item_text_active : {},
                                )}>3{t['级']}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('M4')}>
                            <View style={R.merge(
                                style.seq_item,
                                R.contains('M4', seq_active) ? style.seq_item_active : {},
                            )}>
                                <Text style={R.merge(
                                    style.seq_item_text,
                                    R.contains('M4', seq_active) ? style.seq_item_text_active : {},
                                )}>4{t['级']}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('M5')}>
                            <View style={R.merge(
                                style.seq_item,
                                R.contains('M5', seq_active) ? style.seq_item_active : {},
                            )}>
                                <Text style={R.merge(
                                    style.seq_item_text,
                                    R.contains('M5', seq_active) ? style.seq_item_text_active : {},
                                )}>5{t['级']}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={[style.seq_item, style.seq_item_empty]}>
                        </View>
                    </View>

                    <View style={style.seq_item_container}>
                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_select_all('P')}>
                            <View style={style.seq_item_title}>
                                <Text style={style.seq_item_title_text}>P-{t.professional_support}</Text>

                                {
                                    R.indexOf('P')(R.toString(seq_active)) === -1
                                        ? <Text style={[style.seq_item_select_all, style.seq_item_text_active]}>{t['全部']}</Text>
                                        : <Text style={style.seq_item_select_all}>{t['取消选择']}</Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={style.seq_item_content}>
                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('P1')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('P1', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('P1', seq_active) ? style.seq_item_text_active : {},
                                    )}>1{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('P2')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('P2', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('P2', seq_active) ? style.seq_item_text_active : {},
                                    )}>2{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('P3')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('P3', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('P3', seq_active) ? style.seq_item_text_active : {},
                                    )}>3{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('P4')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('P4', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('P4', seq_active) ? style.seq_item_text_active : {},
                                    )}>4{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('P5')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('P5', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('P5', seq_active) ? style.seq_item_text_active : {},
                                    )}>5{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={[style.seq_item, style.seq_item_empty]}>
                            </View>
                        </View>
                    </View>

                    <View style={style.seq_item_container}>
                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_select_all('T')}>
                            <View style={style.seq_item_title}>
                                <Text style={style.seq_item_title_text}>T-{t.product_development}</Text>

                                {
                                    R.indexOf('T')(R.toString(seq_active)) === -1
                                        ? <Text style={[style.seq_item_select_all, style.seq_item_text_active]}>{t['全部']}</Text>
                                        : <Text style={style.seq_item_select_all}>{t['取消选择']}</Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={style.seq_item_content}>
                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('T1')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('T1', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('T1', seq_active) ? style.seq_item_text_active : {},
                                    )}>1{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('T2')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('T2', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('T2', seq_active) ? style.seq_item_text_active : {},
                                    )}>2{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('T3')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('T3', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('T3', seq_active) ? style.seq_item_text_active : {},
                                    )}>3{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('T4')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('T4', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('T4', seq_active) ? style.seq_item_text_active : {},
                                    )}>4{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('T5')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('T5', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('T5', seq_active) ? style.seq_item_text_active : {},
                                    )}>5{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={[style.seq_item, style.seq_item_empty]}>
                            </View>
                        </View>
                    </View>

                    <View style={style.seq_item_container}>
                        <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_select_all('S')}>
                            <View style={style.seq_item_title}>
                                <Text style={style.seq_item_title_text}>S-{t.marketing_management}</Text>

                                {
                                    R.indexOf('S')(R.toString(seq_active)) === -1
                                        ? <Text style={[style.seq_item_select_all, style.seq_item_text_active]}>{t['全部']}</Text>
                                        : <Text style={style.seq_item_select_all}>{t['取消选择']}</Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={style.seq_item_content}>
                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('S1')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('S1', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('S1', seq_active) ? style.seq_item_text_active : {},
                                    )}>1{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('S2')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('S2', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('S2', seq_active) ? style.seq_item_text_active : {},
                                    )}>2{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('S3')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('S3', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('S3', seq_active) ? style.seq_item_text_active : {},
                                    )}>3{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('S4')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('S4', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('S4', seq_active) ? style.seq_item_text_active : {},
                                    )}>4{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => home_diary_staff_filter_drawer_seq_item_press('S5')}>
                                <View style={R.merge(
                                    style.seq_item,
                                    R.contains('S5', seq_active) ? style.seq_item_active : {},
                                )}>
                                    <Text style={R.merge(
                                        style.seq_item_text,
                                        R.contains('S5', seq_active) ? style.seq_item_text_active : {},
                                    )}>5{t['级']}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={[style.seq_item, style.seq_item_empty]}>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}


export default connect(
    state => ({
        data: state.Diary_staff.filter_drawer_data,
        t: state.I18n.t,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(Filter_drawer_seq)

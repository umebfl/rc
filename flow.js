import * as R from 'ramda'
import React from 'react'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import {
    Card,
    WhiteSpace,
    Icon,
    Grid,
    Steps,
    List,
    Tag,
    Modal,
    Button,
    Provider,
    TextareaItem,
    Drawer,
    Toast,
} from '@ant-design/react-native'

import rule_var_list from './data/规则var.js'
import base_info from './data/基础信息.js'

export const analy_120_to_10 = all_day => {

    // 分析法：倒三角分析法
    let rv = []

    const day_list = [
        {
            name: '半年',
            day: 120,
        },
        {
            name: '四月',
            day: 80,
        },
        {
            name: '两月',
            day: 40,
        },
        {
            name: '一月',
            day: 20,
        },
        {
            name: '半月',
            day: 10,
        },
    ]

    R.addIndex(R.map)(
        (v, k) => {
            const list = R.takeLast(v.day)(all_day)
            const price_state = analy_price(list)

            rv = [
                ...rv,
                {
                    ...v,
                    ...price_state,
                },
            ]
        }
    )(day_list)

    return rv
}

// 价格分析
export const analy_price = (week_data_list) => {

    const sort_list = R.sort((a, b) => b[4] - a[4])(week_data_list)
    const price_max = sort_list[0]
    const price_min = sort_list[sort_list.length - 1]

    // const half_count_a = R.compose(
    //     R.reduce(
    //         (a, b) => a + b[4],
    //         0
    //     ),
    //     R.take(Math.floor(week_data_list.length /2))
    // )(week_data_list)
    //
    // const half_count_b = R.compose(
    //     R.reduce(
    //         (a, b) => a + b[4],
    //         0
    //     ),
    //     R.takeLast(Math.floor(week_data_list.length /2))
    // )(week_data_list)

    const first_price = week_data_list[0][4]
    const last_price = week_data_list[week_data_list.length - 1][4]

    return {
        data: week_data_list,
        price_max,
        price_min,

        // 极端波幅
        range: price_max[4] - price_min[4],
        range_rate: parseInt((price_max[4] - price_min[4]) / week_data_list[week_data_list.length - 1][4] * 100),

        // 时间段波幅
        time_rang: last_price - first_price,
        time_rang_rate: parseInt((last_price - first_price) / first_price * 100),

        // half_count_a,
        // half_count_b,

        // 趋势
        // trend: half_count_a < half_count_b,
        trend: last_price > first_price,
    }
}

// 持仓分析
const analy_trade = (week_data_list) => {

}

const get_trade = (all_day, rate, unit, rule_var, price_max, price_min, price_state) => {

    // {
    //     time: '2019-01-01',
    //     start_price: 2000,
    //     end_price: 2100,
    //     direction: 'buy',
    //     result: 1000,
    //     status: 0,    // 0: 已结束交易 1: 正在交易中
    // }
    let trade_list = []

    // 2周价格状态分析
    let week_data_list = R.take(10)(all_day)


    R.compose(
        R.map(
            v => {

                const price = parseInt(v[4])
                const current_bond = (price * unit * rate).toFixed(0)

                // 分析数据，判断方向, 判断入场时机，判断止损，判断止盈
                // const {
                //     // 方向
                //     // 入场价格
                //     // 止损价格
                //     // 止盈价格
                //     // 加仓价格
                //     // 加仓量
                //     // 当前盈利
                // } = analy_week_data(week_data_list)

                const last_trade = trade_list[trade_list.length - 1]

                // 是否在交易中
                if(last_trade && last_trade.status === 1) {

                    // 是否达到加仓条件，如果符合则加仓，否则不管

                    // 是否达到止盈标准，则终止交易

                    // 是否达到止损标准，则终止交易
                    let stop = false

                    if(stop) {
                        trade_list = R.adjust(
                            -1,
                            v => ({
                                ...v,
                                // 标记结束交易
                                status: 0,
                            })
                        )(trade_list)
                    }

                    // 继续持有
                    // 更新当前盈利数据

                } else {

                    // 价格状态
                    // const price_state = (price_max - price) / price_min
                    const price_state = ((price - price_min) / (price_max - price)).toFixed(2)

                    // 是否符合入场条件， 如果符合创建交易单， 否则不管
                    if(price_state > 0.15 && price_state < 0.3 || price_state > 0.7 && price_state < 0.85) {    // 低位 / 高位
                        // 买入量
                        // 入场资金
                        trade_list = [
                            ...trade_list,
                            {
                                time: v[0],
                                // 方向判断
                                direction: price_state < 0.3 ? '买入' : '卖出',
                                // 入场价格
                                start_price: v[4],
                                end_price: null,
                                result: null,
                                status: 1,
                                price_state,
                                // 交易总保证金
                                bond: rule_var.bond_lv1,
                                // 交易手数
                                count: Math.round(rule_var.bond_lv1 / current_bond),
                                // 交易盈利
                                current_profit: 0,
                            },
                        ]
                    }

                }

                // 更新
                week_data_list = R.compose(
                    R.append(v),
                    R.drop(1)
                )(week_data_list)
            }
        )
    )(all_day)

    return trade_list
}

const trade_auto_flow = (data, analy_day_list, trade_list, trade, payload) => {

    // 价格分析

    const current_data = data[data.length - 1]

    // 主力连续 当前价格
    const current_price = current_data[4]

    // 最高价
    const price_max = parseInt(R.reduce((a, b) => b[4] !== 0 && a > b[4] ? a : b[4], price_max)(data))

    // 距离最高 百分比
    const spread_max_rate = ((price_max - current_price) / current_price * 100).toFixed(1)

    // 最低价
    const price_min = parseInt(R.reduce((a, b) => b[4] !== 0 && a > b[4] ? b[4] : a, price_max)(data))

    // 距离最高 百分比
    const spread_min_rate = ((current_price - price_min) / current_price * 100).toFixed(1)

    // 价格状态分析
    const price_state = ((current_price - price_min) / (price_max - price_min)).toFixed(2)

    const price_state_cn = R.cond([
        [
            v => v < 0.3,
            R.always('低'),
        ],
        [
            v => v > 0.7,
            R.always('高'),
        ],
        [
            R.T,
            R.always('中'),
        ],
    ])(price_state)

    // 价格趋势分析
    const analy_120_to_10_data = analy_120_to_10(data)

    // 当日波动
    const current_rang = current_data[4] - current_data[1]
    const current_rang_rate = (current_rang / current_price * 100).toFixed(2)

    let analy_price = {

        current_price,

        price_max,
        spread_max_rate,
        price_min,
        spread_min_rate,

        price_state,
        price_state_cn,

        current_rang,
        current_rang_rate,

        analy_120_to_10_data,
    }

    let direction = null
    let build_trade = null

    // 执行交易

    // 3chi
    if(
        analy_120_to_10_data[2].trend && analy_120_to_10_data[3].trend && analy_120_to_10_data[4].trend ||
        !analy_120_to_10_data[2].trend && analy_120_to_10_data[3].trend && analy_120_to_10_data[4].trend ||
        !analy_120_to_10_data[2].trend && analy_120_to_10_data[4].trend && price_state > 0.2 && price_state < 0.5
    ) {
        direction = '买入'

        const last_3_analy_day_list = R.takeLast(3)(analy_day_list)

        if(last_3_analy_day_list.length === 3 &&
            last_3_analy_day_list[0].direction === '买入' &&
            last_3_analy_day_list[1].direction === '买入' &&
            last_3_analy_day_list[2].direction === '买入') {
            build_trade = true
        }
    }

    if(
        !analy_120_to_10_data[2].trend && !analy_120_to_10_data[3].trend && !analy_120_to_10_data[4].trend ||
        analy_120_to_10_data[2].trend && !analy_120_to_10_data[3].trend && !analy_120_to_10_data[4].trend ||
        analy_120_to_10_data[2].trend && !analy_120_to_10_data[4].trend && price_state > 0.65 && price_state < 0.85
    ) {
        direction = '卖出'

        const last_3_analy_day_list = R.takeLast(3)(analy_day_list)

        if(last_3_analy_day_list.length === 3 &&
            last_3_analy_day_list[0].direction === '卖出' &&
            last_3_analy_day_list[1].direction === '卖出' &&
            last_3_analy_day_list[2].direction === '卖出') {
            build_trade = true
        }
    }

    // console.log(
    //     data[data.length -1][0],
    //     current_price,
    //     price_state_cn,
    //     price_state,
    //     analy_120_to_10_data[0].trend,
    //     analy_120_to_10_data[1].trend,
    //     analy_120_to_10_data[2].trend,
    //     analy_120_to_10_data[3].trend,
    //     analy_120_to_10_data[4].trend,
    //     current_rang_rate,
    //     direction,
    //     build_trade,
    // )

    analy_day_list.push({
        // data,
        analy_price,
        current_price,
        price_state_cn,
        price_state,
        current_rang_rate,
        direction,
        build_trade,
    })

}

export const flow = {

    test_trade_auto_flow: payload => {

        // const all_day = payload.month_data.all_day
        // const rate = payload.rate
        // const unit = payload.unit
        // const rule_var = rule_var_list[0]
        // const price_max = payload.price_max
        // const price_min = payload.price_min
        // const price_state = payload.price_state

        // 价格分析

        // 分析法：连续10日分析法
        //
        // let week_data_list = R.take(10)(all_day)
        // let series_count = 1
        // let series_trend = null
        // R.compose(
        //     R.map(
        //         v => {
        //
        //             const price_state = analy_price(week_data_list)
        //
        //             if(price_state.trend !== series_trend) {
        //                 series_trend = price_state.trend
        //                 series_count = 1
        //             } else {
        //                 series_count++
        //             }
        //
        //             console.log('price_state', price_state, series_count)
        //
        //             week_data_list = R.compose(
        //                 R.append(v),
        //                 R.drop(1)
        //             )(week_data_list)
        //         }
        //     ),
        //     R.takeLast(all_day.length - 10)
        // )(all_day)

        // auto trade
        let analy_day_list = []
        let trade_list = []
        let trade = null

        const init_data_list = R.take(400)(payload.all_day)
        const test_data_list = R.takeLast(200)(payload.all_day)

        R.addIndex(R.map)(
            (v, k) => trade_auto_flow([
                ...init_data_list,
                ...R.take(k)(test_data_list),
            ], analy_day_list, trade_list, trade, payload)
        )(test_data_list)

        // console.log('trade_list', trade_list)
        // console.log('analy_day_list', analy_day_list)

        // 统计盈利率

        // 统计成功比例

        return (
            <View>
                <Text style={{color: '#aaa'}}>测试自动交易流程:</Text>
                {
                    // R.addIndex(R.map)(
                    //     (v, k) => <Text key={k}>{k + 1} {v.time} {v.direction} {v.start_price} {v.price_state} {v.bond} {v.count} {v.result} {v.current_profit}</Text>
                    // )(trade_list)
                }

                {
                    R.compose(
                        R.addIndex(R.map)(
                            (v, k) => <Text key={k} style={{color: '#aaa'}}>{v.current_price} {v.price_state_cn} {v.current_rang_rate} {v.direction} {v.build_trade ? '开仓' : '-'}</Text>
                        ),
                        R.takeLast(5)
                    )(analy_day_list)
                }
            </View>
        )

    }
}

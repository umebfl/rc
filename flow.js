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

// const get_trade = (all_day, rate, unit, rule_var, price_max, price_min, price_state) => {
//
//     // {
//     //     time: '2019-01-01',
//     //     start_price: 2000,
//     //     end_price: 2100,
//     //     direction: 'buy',
//     //     result: 1000,
//     //     status: 0,    // 0: 已结束交易 1: 正在持仓
//     // }
//     let trade_list = []
//
//     // 2周价格状态分析
//     let week_data_list = R.take(10)(all_day)
//
//
//     R.compose(
//         R.map(
//             v => {
//
//                 const price = parseInt(v[4])
//                 const current_bond = (price * unit * rate).toFixed(0)
//
//                 // 分析数据，判断方向, 判断入场时机，判断止损，判断止盈
//                 // const {
//                 //     // 方向
//                 //     // 入场价格
//                 //     // 止损价格
//                 //     // 止盈价格
//                 //     // 加仓价格
//                 //     // 加仓量
//                 //     // 当前盈利
//                 // } = analy_week_data(week_data_list)
//
//                 const last_trade = trade_list[trade_list.length - 1]
//
//                 // 是否在持仓
//                 if(last_trade && last_trade.status === 1) {
//
//                     // 是否达到加仓条件，如果符合则加仓，否则不管
//
//                     // 是否达到止盈标准，则终止交易
//
//                     // 是否达到止损标准，则终止交易
//                     let stop = false
//
//                     if(stop) {
//                         trade_list = R.adjust(
//                             -1,
//                             v => ({
//                                 ...v,
//                                 // 标记结束交易
//                                 status: 0,
//                             })
//                         )(trade_list)
//                     }
//
//                     // 继续持有
//                     // 更新当前盈利数据
//
//                 } else {
//
//                     // 价格状态
//                     // const price_state = (price_max - price) / price_min
//                     const price_state = ((price - price_min) / (price_max - price)).toFixed(2)
//
//                     // 是否符合入场条件， 如果符合创建交易单， 否则不管
//                     if(price_state > 0.15 && price_state < 0.3 || price_state > 0.7 && price_state < 0.85) {    // 低位 / 高位
//                         // 买入量
//                         // 入场资金
//                         trade_list = [
//                             ...trade_list,
//                             {
//                                 time: v[0],
//                                 // 方向判断
//                                 direction: price_state < 0.3 ? '买入' : '卖出',
//                                 // 入场价格
//                                 start_price: v[4],
//                                 end_price: null,
//                                 result: null,
//                                 status: 1,
//                                 price_state,
//                                 // 交易总保证金
//                                 bond: rule_var.bond_lv1,
//                                 // 交易手数
//                                 count: Math.round(rule_var.bond_lv1 / current_bond),
//                                 // 交易盈利
//                                 current_profit: 0,
//                             },
//                         ]
//                     }
//
//                 }
//
//                 // 更新
//                 week_data_list = R.compose(
//                     R.append(v),
//                     R.drop(1)
//                 )(week_data_list)
//             }
//         )
//     )(all_day)
//
//     return trade_list
// }

const trade_auto_flow = (data, analy_day_list, trade_list, rule_var, payload, setlog) => {

    // setlog({
    //     lv: 'info',
    //     msg: `执行自动交易流程 | ${payload.code} 数据源长度:${data.length}`,
    // })

    // 数据源过少时 不执行分析和操作
    // if(data.length < 20) {
    //
    //     setlog({
    //         lv: 'info',
    //         msg: `数据源过少, 结束交易流程`,
    //     })
    //
    //     return
    // }


    // 价格分析
    const current_data = data[data.length - 1]

//     setlog({
//         lv: 'info',
//         msg: `交易数据:
// 日期:${current_data[0]}
// 开盘价:${current_data[1]}
// 最高价:${current_data[2]}
// 最低价:${current_data[3]}
// 收盘价:${current_data[4]}
// 成交量:${current_data[5]}
// 波动: ${((current_data[1] - current_data[4]) / current_data[4] * 100).toFixed(2)}%`,
// })

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

//     setlog({
//         lv: 'info',
//         msg: `数据分析:
// 当前价:${current_price}
// 最高价:${price_max}
// 最高价差比:${spread_max_rate}
// 最低价:${price_min}
// 最低价差比:${spread_min_rate}
// 价格状态值:${price_state}
// 价格状态:${price_state_cn}
// 当日波动:${current_rang}
// 当日波动比:${current_rang_rate}
// 价格趋势分析:${analy_120_to_10_data[0].name}`,
// })

    let direction = '未知'
    let build_trade = null

    // 执行交易

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

    const analy_day = {
        // data,
        date: R.takeLast(5)(current_data[0]),
        analy_price,
        current_price,
        price_state_cn,
        price_state,
        current_rang_rate,
        direction,
        build_trade,
    }

    analy_day_list.push(analy_day)

    setlog({
        lv: 'info',
        msg: `分析${payload.code} ${analy_day.date} ${analy_day.current_price} ${analy_day.price_state_cn} 方向:${analy_day.direction} 建议:${analy_day.build_trade ? '开仓' : '不操作'}`,
    })


    const last_trade = trade_list[trade_list.length - 1]

    if(last_trade && last_trade.status === '持仓') {


        let current_profit = last_trade.before_add_profit

        if(last_trade.direction === '买入') {
            current_profit += (current_price - last_trade.open_price) * payload.unit * last_trade.count
        } else {
            current_profit += (last_trade.open_price - current_price) * payload.unit * last_trade.count
        }

        // 更新当前盈利
        last_trade.current_profit = parseInt(current_profit)
        last_trade.current_profit_rate = (current_profit / (last_trade.count * payload.current_bond) * 100).toFixed(2)

        setlog({
            lv: 'info',
            msg: `方向:${last_trade.direction} 当前盈利:${last_trade.current_profit}`
        })

        // 平仓 - 止损 || 止盈 || 建议方向与持仓方向不相同
        if(last_trade.direction === '买入' && current_price < last_trade.loss_price ||
            last_trade.direction === '卖出' && current_price > last_trade.loss_price ||
            last_trade.direction !== direction) {
            last_trade.close_price = last_trade.loss_price
            last_trade.status = '平仓'
            last_trade.close_date = current_data[0]

            setlog({
                lv: 'info',
                msg: `操作 | 平仓 \n平仓价:${last_trade.close_price}`
            })

        } else {

            // 第一次盈利回撤 或者 达到加仓次数上限
            if(last_trade.rb_update_count === 0 || last_trade.add_count === rule_var.add_count_max) {
                // 更新回撤
                if(last_trade.direction === '买入' && current_price > last_trade.rb_price || last_trade.direction === '卖出' && current_price < last_trade.rb_price) {
                    // 设置回撤止盈价
                    last_trade.loss_price = last_trade.rb_price
                    // 更新回撤标的价格
                    last_trade.rb_price = direction === '买入' ? parseInt(current_price + current_price * rule_var.loss_rate) : current_price - parseInt(current_price * rule_var.loss_rate)
                    last_trade.rb_update_count++

                    setlog({
                        lv: 'info',
                        msg: `操作 | 盈利 更新回撤 \n更新平仓价:${last_trade.loss_price} \n更新止盈价${last_trade.rb_price} \n更新止盈价次数${last_trade.rb_update_count}`
                    })
                }
            } else {
                // 加仓
                if(last_trade.direction === '买入' && current_price > last_trade.add_price || last_trade.direction === '卖出' && current_price < last_trade.add_price) {
                    // 更新bond
                    last_trade.bond = last_trade.bond + rule_var.bond_lv1
                    // 更新count
                    last_trade.count = Math.floor(last_trade.bond / payload.current_bond)
                    // 保存加仓前盈利
                    last_trade.before_add_profit = last_trade.current_profit
                    //开仓均价
                    last_trade.open_price = current_price
                    // 更新加仓价格
                    last_trade.add_price = direction === '买入' ? parseInt(current_price + current_price * rule_var.add_rate) : current_price - parseInt(current_price * rule_var.add_rate)
                    // 设置回撤止盈价
                    last_trade.loss_price = direction === '买入' ? current_price - parseInt(current_price * rule_var.loss_rate) : current_price + parseInt(current_price * rule_var.loss_rate)
                    // 更新回撤 标的价格
                    last_trade.rb_price = direction === '买入' ? current_price + parseInt(current_price * rule_var.rb_rate) : current_price - parseInt(current_price * rule_var.rb_rate)
                    // 更新计数
                    last_trade.add_count++
                    last_trade.rb_update_count++

                    // console.log(
                    //     '加仓 |',
                    //     last_trade.direction,
                    //     '当前一手保证金:', payload.current_bond,
                    //     '首开仓价:', last_trade.open_price_first,
                    //     '加仓前盈利:', last_trade.before_add_profit,
                    //
                    //     '开仓价:', last_trade.open_price,
                    //     '加仓价:', last_trade.add_price,
                    //     '止损价:', last_trade.loss_price,
                    //     '保证金:', last_trade.bond,
                    //     '手数:', last_trade.count,
                    //     '加仓次数:', last_trade.add_count,
                    //     '回撤更新次数:', last_trade.rb_update_count,
                    // )

                    setlog({
                        lv: 'info',
                        msg: `操作 | 加仓 | ${last_trade.code} ${last_trade.direction}\n加仓后|\n开仓价:${last_trade.open_price}\n加仓价:${last_trade.add_price}\n止损价:${last_trade.loss_price}\n保证金:${last_trade.bond}\n手数:${last_trade.count}\n加仓次数:${last_trade.add_count}\n止盈更新次数:${last_trade.rb_update_count}`,
                    })
                }
            }

        }


    } else if(!last_trade || last_trade.status === '平仓') {
        if(build_trade) {

            // 创建交易单
            const trade = {
                name: payload.name,
                // 方向
                direction,
                // 价格
                open_price_first: current_price,
                // 价格
                open_price: current_price,
                // 保证金总额
                bond: rule_var.bond_lv1,
                // 数量
                count: Math.floor(rule_var.bond_lv1 / payload.current_bond),
                // 品种
                code: payload.code,
                // 月份
                month: payload.month,
                // 时间
                date: data[data.length -1][0],
                // 当日盈利结算
                current_profit: 0,
                current_profit_rate: 0,
                // 止损价
                loss_price: direction === '买入' ? current_price - parseInt(current_price * rule_var.loss_rate) : current_price + parseInt(current_price * rule_var.loss_rate),
                // 回撤止盈价
                rb_price: direction === '买入' ? current_price + parseInt(current_price * rule_var.rb_rate) : current_price - parseInt(current_price * rule_var.rb_rate),
                // 回撤止盈价格更新次数
                rb_update_count: 0,
                // 加仓价格
                add_price: direction === '买入' ? current_price + parseInt(current_price * rule_var.add_rate) : current_price - parseInt(current_price * rule_var.add_rate),
                // 加仓次数
                add_count: 0,
                // 加仓前盈利金额
                before_add_profit: 0,
                // 平仓价
                close_price: null,
                // 平仓时间
                close_date: null,
                // 状态
                status: '持仓',
            }

            trade_list.push(trade)

            setlog({
                lv: 'info',
                msg: `操作 | 开仓 |
${trade.code} ${trade.direction}
开仓价:${trade.open_price}
加仓价:${trade.add_price}
止损价:${trade.loss_price}
止盈价:${trade.rb_price}
保证金:${trade.bond}
手数:${trade.count}`,
})

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
    //     trade_list[trade_list.length - 1] ? trade_list[trade_list.length - 1].loss_price : null,
    //     trade_list[trade_list.length - 1] ? trade_list[trade_list.length - 1].status : null,
    //     trade_list[trade_list.length - 1] ? trade_list[trade_list.length - 1].current_profit : null,
    //     trade_list[trade_list.length - 1] ? trade_list[trade_list.length - 1].count : null,
    // )

}

export const test_trade_auto_flow = (payload, setlog) => {

    // const all_day = payload.month_data.all_day
    // const rate = payload.rate
    // const unit = payload.unit
    // const price_max = payload.price_max
    // const price_min = payload.price_min
    // const price_state = payload.price_state
    const rule_var = rule_var_list[0]
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

    const all_day = R.takeLast(120)(payload.month_data.all_day)
    // const all_day = payload.month_data.all_day

    const init_data_list = []
    const test_data_list = all_day

    // const init_data_list = R.take(400)(payload.all_day)
    // const test_data_list = R.takeLast(200)(payload.all_day)

    R.addIndex(R.map)(
        (v, k) => trade_auto_flow([
            ...init_data_list,
            ...R.take(k + 1)(test_data_list),
        ], analy_day_list, trade_list, rule_var, payload, setlog)
    )(test_data_list)

    // console.log('trade_list', trade_list)
    // console.log('analy_day_list', analy_day_list)

    // 统计盈利率
    const total_profit = R.compose(
        parseInt,
        R.reduce((a, b) => a + b.current_profit, 0)
    )(trade_list)
    // 统计成功比例

    return {
        analy_day_list,
        trade_list,
        total_profit,
    }
}

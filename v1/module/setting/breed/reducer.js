import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import * as persist from '../../../lib/persist'

import breed from '../../../../data/品种'
import rule_list from '../../../../data/规则var'

import ajax from '../../../lib/ajax/index'
import {to_rate} from '../../../lib/num'


// 反转判定幅度标准
const SHAKE_QUOTATION_RATE = 0.038

export const MODULE_KEY = 'breed'

const STATUS_观望 = '观望'
const STATUS_入场 = '入场'

const HOLD_多 = '多'
const HOLD_空 = '空'

// 对标准杠杆率 10倍杠杆
const BASE_BOND_RATE = 0.1

const init_state = {
    data: breed,
}

const cal_bond_rate = (bond, rate) => parseFloat((BASE_BOND_RATE / bond * rate).toFixed(2))

const ai_cal = (all_day, rule) => {

    // 每日判定信息
    let cal_info_list = []

    R.map(
        price_info => {
            let cal_info = {
                // 5日连续价格
                five_day_price: [],

                // 入场系数
                open_coe: 0,
                // 方向系数
                dir_coe: 0, // -1 0 1
                // 出场系数
                close_coe: 0,
                // 加仓系数
                add_coe: 0,
                // 减仓系数
                reduce_coe: 0,

                // op
                status: STATUS_观望,

                // 持仓方向
                hold_dir: HOLD_多,
                // 持仓手数
                hold_count: 0,
                // 持仓价格
                hold_price: 0,

                // 加仓次数
                hold_add_count: 0,
                // 加仓前盈利
                hold_profit: 0,
            }

            if(cal_info_list.length) {
                const last_cal = cal_info_list[cal_info_list.length - 1]
                const last_price_info = last_cal.price_info
                const last_cal_info = last_cal.cal_info

                // 计算前后两天的价格波动
                const last_price = last_price_info[4]
                const curr_price = price_info[4]

                const price_wave_num = curr_price - last_price
                const price_wave_rate = parseFloat((price_wave_num / last_price * 100).toFixed(2))

                // 5日连续价格波动
                let five_day_price = last_cal_info.five_day_price

                let five_day_price_wave_num = 0
                let five_day_price_wave_rate = 0

                five_day_price = R.takeLast(5, [...five_day_price, price_info[4]])

                if(five_day_price.length === 5) {
                    const five_day_last_price = five_day_price[five_day_price.length - 1]
                    five_day_price_wave_num = five_day_price[0] - five_day_last_price
                    five_day_price_wave_rate = parseFloat((five_day_price_wave_num / five_day_last_price * 100).toFixed(2))
                }

                cal_info = {
                    ...cal_info,

                    five_day_price,

                    price_wave_num,
                    price_wave_rate,

                    five_day_price_wave_num,
                    five_day_price_wave_rate,
                }
            }

            cal_info_list = [
                ...cal_info_list,
                {
                    // 交易信息
                    price_info,

                    cal_info,
                },
            ]
        }
    )(all_day)

    return cal_info_list
}

const _search_current_data = (dispatch, get_state) => {
    const state = get_state()
    const module_state = state[MODULE_KEY].data

    const bread = R.filter(v => !v.disable)(module_state)
    const list = R.reduce((a, b) => a + b.code + b.month + ',', '')(bread)

    ajax(`https://hq.sinajs.cn/?list=${list}`, payload => {
        let ft_log = []

        const item_arr = payload.split(';')

        for(var i = 0, j = 0; i < module_state.length; i++) {
            const breed_item = module_state[i]

            if(breed_item.disable) {
                ft_log = [
                    ...ft_log,
                    breed_item,
                ]
            } else {
                let info = item_arr[j++].split(',')

                info.pop()

                const price = parseInt(info[8])
                const current_bond = (price * breed_item.unit * breed_item.rate)

                ft_log = [
                    ...ft_log,
                    {
                        ...breed_item,
                        '开盘价': parseInt(info[2]),
                        '最高价': parseInt(info[3]),
                        '最低价': parseInt(info[4]),
                        '昨日收盘价': parseInt(info[5]),
                        '最新价': price,
                        '持仓量': parseInt(info[13]),
                        '成交量': parseInt(info[14]),
                        '当前一手保证金': parseInt(current_bond),
                        '当前持仓总金额': parseInt(current_bond * info[13]),
                    }
                ]
            }

        }

        dispatch(
            module_setter({
                data: ft_log,
            })
        )

        _batch_search_all_day_data(dispatch, get_state)
    })
}

const get_statistics_shake_quotation_chart = (statistics_shake_quotation, all_day, all_day_chart) => {
    // R.map(
    //     v => ({
    //         x: R.map(v1 => v1.date)(v),
    //         y: R.map(v1 => v1.price)(v),
    //     })
    // )(statistics_shake_quotation)

    // [
    //     {
    //         dir,
    //         rate,
    //         ave_rate,
    //         group: [
    //             {
    //                 date,
    //                 price,
    //                 last_price,
    //                 rate,
    //                 dir,
    //             }
    //         ]
    //     }...
    // ]

    // =>
    // [
    //     {
    //         dir,
    //         x: [n...data...n]
    //         y: [n...data...n]
    //     }...
    // ]

    return R.addIndex(R.map)(
        (v, k) => {
            const before_len = R.compose(
                R.sum,
                R.addIndex(R.map)(
                    (v1, k1) => k1 < k ? v1.group.length : 0
                )
            )(statistics_shake_quotation)
            const last_len = all_day.length - v.group.length - before_len

            const min = R.sort((a, b) => a - b, all_day_chart.y)[0]

            return ({
                dir: v.dir,
                rate: v.rate,
                ave_rate: v.ave_rate,
                x: [
                    ...R.repeat('', before_len),
                    ...R.map(R.prop('date'))(v.group),
                    ...R.repeat('', last_len),
                ],
                y: [
                    ...R.repeat(min, before_len),
                    ...R.map(R.prop('price'))(v.group),
                    ...R.repeat(min, last_len),
                ],
            })
        }
    )(statistics_shake_quotation)
}

// 行情天数分段统计
const get_statistics_shake_quotation_sem_day_sem = (data) => {
    // [
    //     {
    //         dir,
    //         x: [n...data...n]
    //         y: [n...data...n]
    //     }...
    // ]

    // =>
    // x: ['0-5%', '5-10%', '10-15%', '15-20%', '20%以上']
    // y: [4, 5, 4, 4, 3,]

    const group = R.groupBy(
        v => (
            Math.abs(v.group.length) < 10 ? 'lv0' :
            Math.abs(v.group.length) < 20 ? 'lv1' :
            Math.abs(v.group.length) < 30 ? 'lv2' : 'lv3'
        )
    )(data)

    return ({
        x: ['10', '20', '30', '40以上'],
        y: [
            group.lv0 ? group.lv0.length : 0,
            group.lv1 ? group.lv1.length : 0,
            group.lv2 ? group.lv2.length : 0,
            group.lv3 ? group.lv3.length : 0,
        ],
    })
}

// 行情平均波幅分段统计
const get_statistics_shake_quotation_sem_avg_sem = (data) => {
    // [
    //     {
    //         dir,
    //         x: [n...data...n]
    //         y: [n...data...n]
    //     }...
    // ]

    // =>
    // x: ['0-5%', '5-10%', '10-15%', '15-20%', '20%以上']
    // y: [4, 5, 4, 4, 3,]

    const group = R.groupBy(
        v => (
            Math.abs(v.ave_rate) < 0.4 ? 'lv0' :
            Math.abs(v.ave_rate) < 0.8 ? 'lv1' :
            Math.abs(v.ave_rate) < 1.2 ? 'lv2' : 'lv3'
        )
    )(data)

    return ({
        x: ['.4', '.8', '1.2', '1.2以上'],
        y: [
            group.lv0 ? group.lv0.length : 0,
            group.lv1 ? group.lv1.length : 0,
            group.lv2 ? group.lv2.length : 0,
            group.lv3 ? group.lv3.length : 0,
        ],
    })
}

// 行情波幅分段统计
const get_statistics_shake_quotation_rate_sem = (data) => {
    // [
    //     {
    //         dir,
    //         x: [n...data...n]
    //         y: [n...data...n]
    //     }...
    // ]

    // =>
    // x: ['0-5%', '5-10%', '10-15%', '15-20%', '20%以上']
    // y: [4, 5, 4, 4, 3,]

    const group = R.groupBy(
        v => (
            Math.abs(v.rate) < 5 ? 'lv0' :
            Math.abs(v.rate) < 10 ? 'lv1' :
            Math.abs(v.rate) < 15 ? 'lv2' : 'lv3'
        )
    )(data)

    return ({
        x: ['5%', '10%', '15%', '15%以上'],
        y: [
            group.lv0 ? group.lv0.length : 0,
            group.lv1 ? group.lv1.length : 0,
            group.lv2 ? group.lv2.length : 0,
            group.lv3 ? group.lv3.length : 0,
        ],
    })
}



const _search_all_day_data = (dispatch, get_state, code, month) => {

    ajax(`http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}${month}`, payload => {

        const state = get_state()
        const module_state = state[MODULE_KEY].data

        const breed = R.filter(v => v.code === code)(module_state)[0]
        const breed_index = R.findIndex(R.propEq('code', code))(module_state)

        // [0] date
        // [1] 开盘
        // [2] 最高
        // [3] 最低
        // [4] 收盘
        // [5] 成交量
        const all_day = R.compose(
            list => R.addIndex(R.map)(
                (v, k) => {
                    const open = k === 0 ? parseInt(v[1]) : parseInt(list[k - 1][4])
                    const close = parseInt(v[4])
                    const high = open > parseInt(v[2]) ? open : parseInt(v[2])
                    const low = open < parseInt(v[3]) ? open : parseInt(v[3])
                    // [6] 开收盘波幅
                    const ocrate = (close - open) / open * 100
                    // [7] 最高最低波幅
                    const hlrate = (high - low) / low * 100
                    // [8] 波幅差
                    const rate_gap = hlrate - Math.abs(ocrate)

                    const data = [
                        // [0] date
                        v[0],
                        // [1] 开盘
                        open,
                        // [2] 最高
                        high, //high,
                        // [3] 最低
                        low, //low,
                        // [4] 收盘
                        close,
                        // [5] 成交量
                        parseInt(v[5]),
                        // [6] 开收盘波幅
                        cal_bond_rate(breed.rate, ocrate),
                        // [7] 最高最低波幅
                        cal_bond_rate(breed.rate, hlrate),
                        // [8] 波幅差
                        cal_bond_rate(breed.rate, rate_gap),
                    ]

                    return data
                }
            )(list),
            // 更新最后一天的收盘价为当前价
            v => {
                v[v.length - 1][4] = breed.最新价
                return v
            },
            // 只要前2.5年600天
            // R.takeLast(600)
        )(JSON.parse(payload))

        const all_day_chart = R.compose(
            // 划分 只保留收盘价
            v => ({
                x: R.addIndex(R.map)(
                    (v1, k1) => ({v: v1[0], k: k1})
                )(v),
                y: R.map(
                    v => parseInt(v[4])
                )(v)
            }),
        )(all_day)

        // 40天图表数据
        const day_40_chart = {
            x: R.takeLast(40)(all_day_chart.x),
            y: R.takeLast(40)(all_day_chart.y),
        }

        // hight chart
        const all_day_high_chart = R.compose(
            v => ({
                x: R.addIndex(R.map)(
                    (v1, k1) => ({v: v1[0], k: k1})
                )(v),
                y: R.map(
                    v => parseInt(v[2])
                )(v)
            }),
        )(all_day)

        const day_40_high_chart = {
            x: R.takeLast(40)(all_day_high_chart.x),
            y: R.takeLast(40)(all_day_high_chart.y),
        }

        // low chart
        const all_day_low_chart = R.compose(
            v => ({
                x: R.addIndex(R.map)(
                    (v1, k1) => ({v: v1[0], k: k1})
                )(v),
                y: R.map(
                    v => parseInt(v[3])
                )(v)
            }),
        )(all_day)

        const day_40_low_chart = {
            x: R.takeLast(40)(all_day_low_chart.x),
            y: R.takeLast(40)(all_day_low_chart.y),
        }

        // 执行测算
        const ai_cal_rv = R.map(
            v => ai_cal(all_day, v)
        )(rule_list)

        // 执行统计
        // 开收盘波幅分段统计
        const statistics_ocrate = R.compose(
            v => ({
                lv0: v.lv0 ? v.lv0 : [],
                lv1: v.lv1 ? v.lv1 : [],
                lv2: v.lv2 ? v.lv2 : [],
                lv3: v.lv3 ? v.lv3 : [],
            }),
            R.groupBy(
                v => (
                    Math.abs(v[6]) <= 1 ? 'lv0' :
                    Math.abs(v[6]) <= 2 ? 'lv1' :
                    Math.abs(v[6]) <= 3 ? 'lv2' : 'lv3'
                )
            )
        )(all_day)
        // 最高最低波幅分段统计
        const statistics_hlrate = R.compose(
            v => ({
                lv0: v.lv0 ? v.lv0 : [],
                lv1: v.lv1 ? v.lv1 : [],
                lv2: v.lv2 ? v.lv2 : [],
                lv3: v.lv3 ? v.lv3 : [],
            }),
            R.groupBy(
                v => (
                    Math.abs(v[7]) <= 1 ? 'lv0' :
                    Math.abs(v[7]) <= 2 ? 'lv1' :
                    Math.abs(v[7]) <= 3 ? 'lv2' : 'lv3'
                )
            )
        )(all_day)

        // 震荡，行情分段统计

        const get_target_price = (price, dir = '未') => {

            const fix_up_rate = dir === '多' ? SHAKE_QUOTATION_RATE * 0.5 : SHAKE_QUOTATION_RATE
            const fix_down_rate = dir === '空' ? SHAKE_QUOTATION_RATE * 0.5 : SHAKE_QUOTATION_RATE

            return ({
                // up: price * (1 + SHAKE_QUOTATION_RATE),
                // down: price * (1 - SHAKE_QUOTATION_RATE),
                // price,
                // dir,
                up: price * (1 + fix_up_rate),
                down: price * (1 - fix_down_rate),
                // fix_down_rate: price * (1 - fix_down_rate),
                // fix_up_rate: price * (1 + fix_up_rate),
            })
        }

        const statistics_shake_quotation = R.compose(
            item => {
                let group = []
                let rv = []
                let target_price = get_target_price(item[0][1])

                const fix_group_rate = (rv, group, dir) => {

                    const rate = cal_bond_rate(breed.rate, to_rate(group[0].last_price, group[group.length - 1].price - group[0].last_price))

                    return ([
                        ...rv,
                        {
                            // 方向
                            dir,
                            // 总波幅
                            rate,
                            // 平均天波幅
                            ave_rate: Math.abs(rate / group.length).toFixed(2),
                            group,
                        },
                    ])
                }

                R.addIndex(R.map)(
                    (v, k) => {
                        const price = v[1]
                        const last_price = k === 0 ? price : item[k - 1][1]
                        const rate = to_rate(price, price - last_price)

                        group = [
                            ...group,
                            {
                                dir: null,
                                date: v[0],
                                price,
                                last_price,
                                rate: cal_bond_rate(breed.rate, rate),
                                target_price,
                            },
                        ]

                        // 达到临界点
                        if(price >= target_price.up || price <= target_price.down) {
                            const dir = price > target_price.up ? '多' : '空'
                            const fix_group = R.map(
                                v => ({
                                    ...v,
                                    dir,
                                })
                            )(group)

                            if(rv.length && rv[rv.length - 1].group[0].dir === dir) {
                                // 同向
                                rv = fix_group_rate(
                                    R.take(rv.length - 1)(rv),
                                    R.concat(rv[rv.length - 1].group)(fix_group),
                                    dir
                                )
                            } else {
                                // 异向
                                rv = fix_group_rate(rv, fix_group, dir)
                            }

                            // 重置
                            target_price = get_target_price(price, dir)
                            group = []
                        }

                        // 最后一个group
                        if(k === item.length - 1 && group.length) {
                            rv = fix_group_rate(rv, group, '未')
                        }
                    }
                )(item)

                return rv
            }
        )(all_day)

        const statistics_shake_quotation_chart = get_statistics_shake_quotation_chart(statistics_shake_quotation, all_day, all_day_chart)

        const statistics_shake_quotation_rate_sem = get_statistics_shake_quotation_rate_sem(statistics_shake_quotation_chart)
        const statistics_shake_quotation_sem_avg_sem = get_statistics_shake_quotation_sem_avg_sem(statistics_shake_quotation_chart)
        const statistics_shake_quotation_sem_day_sem = get_statistics_shake_quotation_sem_day_sem(statistics_shake_quotation)

        const ai_cal_analy = {

        }

        // 执行交易提示
        const ai_deal_tips = {}

        dispatch(
            module_setter({
                data: R.adjust(
                    breed_index,
                    v => ({
                        ...v,
                        all_day,
                        all_day_chart,
                        day_40_chart,
                        all_day_high_chart,
                        day_40_high_chart,
                        all_day_low_chart,
                        day_40_low_chart,

                        statistics_ocrate,
                        statistics_hlrate,
                        statistics_shake_quotation,
                        statistics_shake_quotation_chart,
                        statistics_shake_quotation_rate_sem,
                        statistics_shake_quotation_sem_avg_sem,
                        statistics_shake_quotation_sem_day_sem,

                        ai: {
                            ai_cal_rv,
                            ai_cal_analy,
                            ai_deal_tips,
                        },
                    })
                )(module_state),
            })
        )

    })

}

const _batch_search_all_day_data = (dispatch, get_state) => {
    const state = get_state()
    const module_state = state[MODULE_KEY]

    const bread_list = R.filter(v => !v.disable)(module_state.data)

    R.map(
        v => _search_all_day_data(dispatch, get_state, v.code, v.month)
    )(bread_list)
}

export const action = {

    set_disable: (index, disable) => (dispatch, get_state) => {
        const state = get_state()
        const module_state = state[MODULE_KEY]

        const data = R.adjust(index, R.assoc('disable', disable))(module_state.data)

        dispatch(
            module_setter({
                data,
            })
        )

        _search_current_data(dispatch, get_state)
    },

    // 查询当前数据
    search_current_data: () => (dispatch, get_state) => _search_current_data(dispatch, get_state),

    // 查询日数据
    search_all_day_data: (code, month) => (dispatch, get_state) => _search_all_day_data(dispatch, get_state, code, month),

    // 批量查询日数据
    batch_search_all_day_data: () => (dispatch, get_state) => _batch_search_all_day_data(dispatch, get_state),

}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export default handleActions({
    [module_setter]: (state, {payload}) => {

        const new_state = {
            ...state,
            ...payload,
        }

        // 持久化state
        persist.set(MODULE_KEY, new_state)

        return new_state
    },
}, init_state)

// 多日 jiekou
// [0] date
// [1] 开盘
// [2] 最高
// [3] 最低
// [4] 收盘
// [5] 成交量

// console.log(
//     CLEAR_CODE,
//     // info,
//     `开盘价: ${info[2]}\n`,
//     `最高价: ${info[3]}\n`,
//     `最低价: ${info[4]}\n`,
//     `昨日收盘价: ${info[5]}\n`,
//     `最新价: ${info[8]}\n`,
//     `结算价: ${info[9]}\n`,
//     `昨结算: ${info[10]}\n`,
//     `买一价: ${info[6]}\n`,
//     `卖一价: ${info[7]}\n`,
//     `买量: ${info[11]}\n`,
//     `卖量: ${info[12]}\n`,
//     `持仓量: ${info[13]}\n`,
//     `成交量: ${info[14]}\n`,
//     `${interval_count}`.grey,
//     `${text}`.grey,
//     `${average}`.grey,  // 监控时间段内平均
//     `${price_margin}`.grey,  // 上一间隔价差
//     quick ? `${quick_price_margin}`.red : `${quick_price_margin}`.grey  // INTERVAL * QUICK_INTERVAL 秒内价差
// )

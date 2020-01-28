import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import * as persist from '../../../lib/persist'

import breed from '../../../../data/品种'
import rule_list from '../../../../data/规则var'

import ajax from '../../../lib/ajax/index'

export const MODULE_KEY = 'breed'

const STATUS_观望 = '观望'
const STATUS_入场 = '入场'

const HOLD_多 = '多'
const HOLD_空 = '空'

const init_state = {
    data: breed,
}

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

const _search_all_day_data = (dispatch, get_state, code, month) => {

    ajax(`http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}${month}`, payload => {

        const state = get_state()
        const module_state = state[MODULE_KEY].data

        const breed = R.filter(v => v.code === code)(module_state)
        const breed_index = R.findIndex(R.propEq('code', code))(module_state)

        const all_day = R.compose(
            R.map(
                R.addIndex(R.map)(
                    (v, k) => k === 0 ? v : parseInt(v)
                ),
            ),
            // 更新最后一天的收盘价为当前价
            v => {
                v[v.length - 1][4] = breed[0].最新价
                return v
            },
            // 只要前2.5年600天
            // R.takeLast(600)
        )(JSON.parse(payload))

        const all_day_chart = R.compose(
            // 划分 只保留收盘价
            v => ({
                x:R.map(
                    v => v[0]
                )(v),
                y: R.map(
                    v => parseInt(v[4])
                )(v)
            }),
        )(all_day)

        // 执行测算
        const ai_cal_rv = R.map(
            v => ai_cal(all_day, v)
        )(rule_list)

        // 执行统计

        // 执行交易提示

        dispatch(
            module_setter({
                data: R.adjust(
                    breed_index,
                    v => ({
                        ...v,
                        all_day,
                        all_day_chart,
                        ai_cal_rv,
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

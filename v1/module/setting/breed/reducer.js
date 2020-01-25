import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import * as persist from '../../../lib/persist'

import breed from '../../../../data/品种'

import ajax from '../../../lib/ajax/index'

export const MODULE_KEY = 'breed'

const init_state = {
    data: breed,
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
                        '当前一手保证金': current_bond,
                        '当前持仓总金额': current_bond * info[13],
                    }
                ]
            }

        }

        dispatch(
            module_setter({
                data: ft_log,
            })
        )
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

        // const build = (index, all_day, breed) => R.adjust(index, R.assoc('all_day', all_day))(breed)
        //
        // const curry_build = R.curry(build)
        //
        // const currb = curry_build(breed_index, all_day)
        //
        // const d = currb(module_state)
        //
        // console.log('d', d)

        dispatch(
            module_setter({
                data: R.adjust(
                    breed_index,
                    v => ({
                        ...v,
                        all_day,
                        all_day_chart,
                    })
                )(module_state),
            })
        )
    })

}

const _batch_search_all_day_data = (dispatch, get_state) => {

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

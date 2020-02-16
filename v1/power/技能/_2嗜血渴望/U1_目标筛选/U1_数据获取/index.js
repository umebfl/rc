import * as R from 'ramda'

import ajax from '../../../../../lib/ajax/index'


const U_修正数据 = R.compose(
    R.map(
        v => ({
            日期: v[0],
            开盘价: v[1],
            最高价: v[2],
            最低价: v[3],
            收盘价: v[4],
        })
    ),
    JSON.parse
)

/*
返回:
{
当前：{},
合约期：{},
全期：{}，
*/
export const U0_获取全部数据 = ({
    code,
    month,
    cb,
}) => {
    let rv = {}

    U1_获取连续数据({
        code,
        cb: data => {
            rv.当前 = data

            U2_获取合约期数据({
                code,
                month,
                cb: data => {
                    rv.合约期 = data

                    U3_获取当前数据({
                        code,
                        month,
                        cb: data => {
                            rv.全期 = data
                            cb && cb(rv)
                        },
                    })
                },
            })
        },
    })
}

export const U1_获取连续数据 = ({
    code,
    cb,
}) => {
    ajax(`http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}0`, payload => {
        cb && cb(U_修正数据(payload))
    })
}

export const U2_获取合约期数据 = ({
    code,
    month,
    cb,
}) => {
    ajax(`http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}${month}`, payload => {
        cb && cb(U_修正数据(payload))
    })
}

export const U3_获取当前数据 = ({
    code,
    month,
    cb,
}) => {
    ajax(`https://hq.sinajs.cn/?list=${code}${month}`, payload => {
        let ft_log = []

        const item_arr = payload.split(';')
        let info = item_arr[0].split(',')

        info.pop()

        const rv = {
            '开盘价': parseInt(info[2]),
            '最高价': parseInt(info[3]),
            '最低价': parseInt(info[4]),
            '昨收价': parseInt(info[5]),
            '买一价': parseInt(info[6]),
            '卖一价': parseInt(info[7]),
            '最新价': parseInt(info[8]),
            '结算价': parseInt(info[9]),
            '昨结算': parseInt(info[10]),
            '买量': parseInt(info[11]),
            '卖量': parseInt(info[12]),
            '持仓量': parseInt(info[13]),
            '成交量': parseInt(info[14]),
        }

        cb && cb(rv)
    })
}


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

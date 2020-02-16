import * as R from 'ramda'

// 全部品种列表
// [[
//     msg: '支出准备金',
//     money: 40000,
//     finish: true,
//     time: '2019年10月',
// ]...]
import U_品种 from '../../../../../data/品种'

import {
    U0_获取全部数据,
} from './U1_数据获取'

export default () => {

    // 获取连续数据

    // 获取合约期数据

    // 获取当前数据
    // const data = R.map(
    //     v => {
    //         return _3获取当前数据(v.code, v.month)
    //     }
    // )([D_品种[0]])
    U0_获取全部数据({
        code: U_品种[0].code,
        month: U_品种[0].month,
        cb: data => {
            alert('data '+ JSON.stringify(data.合约期))
        },
    })

    // 存储数据
}

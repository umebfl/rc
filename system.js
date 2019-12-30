import React, { Component } from 'react'
import * as R from 'ramda'

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

export default class System extends Component {

    state = {
        data: this.props.context.state.breed,
    }


    componentDidMount() {
        // AsyncStorage.getItem('data', (e, rv) => {
        //     if(rv) {
        //         console.log('flow', '完成存储数据加载')
        //         this.setState({
        //             data: JSON.parse(rv),
        //         })
        //
        //         this.fetch_current_data()
        //     } else {
        //         this.fetch_current_data()
        //     }
        // })

        this.fetch_current_data()

        setInterval(() => {
            this.fetch_current_data()
        }, 60 * 1000)
    }

    // 请求当前数据
    fetch_current_data() {

        const breed = this.state.data
        const list = R.reduce((a, b) => a + b.code + b.month + ',', '')(breed)

        const request = new XMLHttpRequest()

        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return
            }

            if (request.status === 200) {

                let ft_log = []

                const item_arr = request.responseText.split(';')

                for(var i = 0; i < breed.length; i++) {
                    const breed_item = breed[i]
                    let info = item_arr[i].split(',')

                    info.pop()

                    const price = parseInt(info[8]).toFixed(0)

                    const current_bond = (price * breed_item.unit * breed_item.rate).toFixed(0)

                    ft_log = [
                        ...ft_log,
                        {
                            ...breed_item,
                            info,
                            price,
                            // 当前一手保证金
                            current_bond,
                            // 当前持仓总金额
                            current_hold_amount_totle: current_bond * info[13],
                        }
                    ]
                }

                this.setState({
                    data: ft_log,
                })
                console.log('flow', '完成当前数据的请求', ft_log)
            } else {
                Toast.fail('请求接口数据异常！')
            }
        }

        request.open('GET', `https://hq.sinajs.cn/?list=${list}`)
        request.send()
    }

    handle_reload_log() {

        // AsyncStorage.clear()

        const data = this.state.data
        let finish_count = 0
        let ft_log = []

        for (var i = 0; i < data.length; i++) {
            const code = data[i].code
            const request = new XMLHttpRequest()
            const item = data[i]

            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return
                }

                if (request.status === 200) {
                    const all_day = R.compose(
                        R.map(
                            R.addIndex(R.map)(
                                (v, k) => k === 0 ? v : parseInt(v)
                            ),
                        ),
                        // 只要前2.5年600天
                        R.takeLast(600)
                    )(JSON.parse(request.responseText))

                    // 杠杆
                    const real_rate = (1 / item.rate).toFixed(0)

                    // 主力连续 当前价格
                    const main_price = all_day[all_day.length - 1][4]

                    // 最高价
                    const price_max = parseInt(R.reduce((a, b) => b[4] !== 0 && a > b[4] ? a : b[4], price_max)(all_day))

                    // 距离最高 百分比
                    const spread_max_rate = ((price_max - main_price) / main_price * 100).toFixed(1)

                    // 最低价
                    const price_min = parseInt(R.reduce((a, b) => b[4] !== 0 && a > b[4] ? b[4] : a, price_max)(all_day))

                    // 距离最高 百分比
                    const spread_min_rate = ((main_price - price_min) / main_price * 100).toFixed(1)

                    // 价格分段

                    // 各价格段数量统计

                    // 当前价位状态
                    const price_state = ((main_price - price_min) / (price_max - price_min)).toFixed(2)

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

                    // 最高最低波幅 附加保证金比例
                    // const max_to_min_rate = ((price_max - price_min) / price_min).toFixed(1)
                    const max_to_min_rate = ((price_max - price_min) / price_min * (1 / item.rate)).toFixed(1)


                    ft_log = [
                        ...ft_log,
                        {
                            ...item,
                            all_day,
                            real_rate,
                            price_max,
                            spread_max_rate,
                            price_min,
                            spread_min_rate,
                            max_to_min_rate,
                            main_price,
                            price_state,
                            price_state_cn,
                        }
                    ]

                    finish_count++

                    if(finish_count === data.length) {
                        this.setState({
                            data: ft_log,
                        })

                        // try {
                        //     AsyncStorage.setItem('data', JSON.stringify(ft_log))
                        // } catch (error) {
                        //     Toast.fail('存储数据失败！')
                        // }

                        console.log('flow', '完成全部日志数据的请求', ft_log)
                        this.handle_reload_log_month()
                    }

                } else {
                    Toast.fail('请求接口数据异常！')
                }
            }

            request.open('GET', `http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}0`)
            request.send()
        }
    }

    handle_reload_log_month() {

        const data = this.state.data
        let finish_count = 0
        let ft_log = []

        for (var i = 0; i < data.length; i++) {
            const code = data[i].code
            const month = data[i].month
            const request = new XMLHttpRequest()
            const item = data[i]

            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return
                }

                if (request.status === 200) {
                    const all_day = R.compose(
                        R.map(
                            R.addIndex(R.map)(
                                (v, k) => k === 0 ? v : parseInt(v)
                            ),
                        ),
                        // 只要前2.5年600天
                        // R.takeLast(600)
                    )(JSON.parse(request.responseText))

                    // 当前价格
                    const price = item.price

                    // 最高价
                    const price_max = parseInt(R.reduce((a, b) => b[4] !== 0 && a > b[4] ? a : b[4], price_max)(all_day))

                    // 距离最高 百分比
                    const spread_max_rate = ((price_max - price) / price * 100).toFixed(1)

                    // 最低价
                    const price_min = parseInt(R.reduce((a, b) => b[4] !== 0 && a > b[4] ? b[4] : a, price_max)(all_day))

                    // 距离最高 百分比
                    const spread_min_rate = ((price - price_min) / price * 100).toFixed(1)

                    // 价格分段

                    // 各价格段数量统计

                    // 当前价位状态
                    const price_state = ((price - price_min) / (price_max - price_min)).toFixed(2)

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

                    // 最高最低波幅 附加保证金比例
                    // const max_to_min_rate = ((price_max - price_min) / price_min).toFixed(1)
                    const max_to_min_rate = ((price_max - price_min) / price_min * (1 / item.rate)).toFixed(1)

                    // 一周前价格
                    const before_a_week_price = all_day[all_day.length - 5 * 4][4]
                    // 一周波幅
                    const before_a_week_rate = ((price - before_a_week_price) / before_a_week_price * 100).toFixed(1)
                    // 一周盈利率
                    const before_a_week_real_rate = (Math.abs(price - before_a_week_price) / before_a_week_price * item.real_rate * 100).toFixed(1)

                    ft_log = [
                        ...ft_log,
                        {
                            ...item,
                            month_data: {
                                all_day,
                                price_max,
                                spread_max_rate,
                                price_min,
                                spread_min_rate,
                                max_to_min_rate,
                                price,
                                price_state,
                                price_state_cn,

                                before_a_week_price,
                                before_a_week_rate,
                                before_a_week_real_rate,

                            },
                        }
                    ]

                    finish_count++

                    if(finish_count === data.length) {
                        this.setState({
                            data: ft_log,
                        })

                        // try {
                        //     AsyncStorage.setItem('data', JSON.stringify(ft_log))
                        // } catch (error) {
                        //     Toast.fail('存储数据失败！')
                        // }

                        console.log('flow', '完成指定月合约日志数据的请求', ft_log)
                        // this.fetch_current_data()
                    }

                } else {
                    Toast.fail('请求接口数据异常！')
                }
            }

            request.open('GET', `http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}${month}`)
            request.send()
        }
    }

    render() {

        const breed = this.props.context.state.breed

        // AsyncStorage.clear()

        return (
            <Card full style={{borderColor: 'white'}}>
                <Card.Header
                    title='交易系统'
                    extra={
                        <View style={{flexDirection: 'row-reverse'}}>
                            <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_reload_log()}>
                                <Icon name='reload' size='md' color='#BBB'/>
                            </TouchableOpacity>
                        </View>
                    }
                    thumb={<Icon name='safety' size='md' color='black'/>}/>
                <Card.Body>
                    <List renderHeader={`备选品种(${breed.length})`}>
                        <List.Item wrap={true}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 6}}>
                                {
                                    R.addIndex(R.map)(
                                        (v, k) => <Tag key={k} small selected style={{margin: 4}}>{v.name}</Tag>
                                    )(breed)
                                }
                            </View>
                        </List.Item>
                    </List>
                    <List renderHeader={'接口数据'} style={{overflw: 'scroll'}}>
                        {
                            R.compose(
                                R.addIndex(R.map)(
                                    (v, k)  => (
                                        <List.Item key={k} wrap={true}>
                                            <View style={{flexDirection: 'row', flowWrap: 'wrap', fontSize: 10}}>
                                                <Text style={{width: 50}}>{v.name}{R.takeLast(2)(v.month)}</Text>
                                                {/* 当前价  */}
                                                <Text style={{width: 50, textAlign: 'right'}}>{v.info ? v.price : '-'}</Text>
                                                {/* 一周前价格 */}
                                                <Text style={{width: 90, textAlign: 'right'}}>{v.month_data ? `${v.month_data.before_a_week_price}(${v.month_data.before_a_week_rate})` : '-'}</Text>
                                                {/* 一周盈利率 */}
                                                <Text style={{width: 40, textAlign: 'right'}}>{v.month_data ? `${v.month_data.before_a_week_real_rate}` : '-'}</Text>
                                                {/* 价格状态  */}
                                                <Text style={{width: 50, textAlign: 'right'}}>{v.price_state_cn ? `${v.price_state_cn}${v.price_state}` : '-'}</Text>
                                                {/* 极端波幅  */}
                                                <Text style={{width: 40, textAlign: 'right'}}>{v.max_to_min_rate ? `${v.max_to_min_rate}` : '-'}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', flowWrap: 'wrap', fontSize: 8,}}>
                                                {/* 持仓资金  */}
                                                <Text style={{width: 40, textAlign: 'right', color: '#999'}}>{Math.round(v.current_hold_amount_totle / 100000000) + '亿'}</Text>
                                                {/* 保证金比例  */}
                                                <Text style={{width: 20, textAlign: 'right', color: '#999'}}>{v.real_rate ? v.real_rate : '-'}</Text>
                                                {/* 一手保证金  */}
                                                <Text style={{width: 50, textAlign: 'right', color: '#999'}}>{v.current_bond ? v.current_bond : '-'}</Text>
                                                <Text style={{width: 90, textAlign: 'right', color: '#999'}}>{v.price_max ? `${v.price_max}-${v.spread_max_rate}` : '-'}</Text>
                                                <Text style={{width: 90, textAlign: 'right', color: '#999'}}>{v.price_min ? `${v.price_min}-${v.spread_min_rate}` : '-'}</Text>
                                            </View>
                                        </List.Item>
                                    )
                                ),
                                R.sort(
                                    (a ,b) => {
                                        if(a.month_data) {
                                            return b.month_data.before_a_week_real_rate - a.month_data.before_a_week_real_rate
                                        } else {
                                            return true
                                        }

                                        if(a.max_to_min_rate) {
                                            // return b.price_state - a.price_state
                                            // 波幅排序
                                            return b.max_to_min_rate - a.max_to_min_rate
                                        } else {
                                            return true
                                        }
                                    }
                                )
                            )(this.state.data)
                        }
                    </List>
                </Card.Body>
            </Card>
        )
    }
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

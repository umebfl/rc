import React, { Component } from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
  // AsyncStorage,
} from 'react-native'

import {
    Card,
    WhiteSpace,
    Icon,
    Grid,
    Steps,
    List,
    ListView,
    Tag,
    Modal,
    Button,
    Provider,
    TextareaItem,
    Drawer,
    Toast,
} from '@ant-design/react-native'

import {
    analy_price,
    analy_120_to_10,
    test_trade_auto_flow,
}from './flow'

import rule_var_list from './data/规则var.js'

const analy_ensemble = all_day => {
    return {
        analy_120_80_40_20_10: analy_120_to_10(all_day),
    }
}

export default class System extends Component {

    analylog = []

    state = {
        // data: R.filter(
        //     v => v.code === 'JD',
        // )(this.props.context.state.breed),
        data: this.props.context.state.breed,

        real_trade: this.props.context.state.real_trade,

        modal_log: {
            visible: false,
        },
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

        this.state.timer = setInterval(() => {
            this.fetch_current_data()
        }, 60 * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    display_real_trade() {
        const rule_var = rule_var_list[0]

        this.setState({
            real_trade: R.compose(
                R.map(
                    v => {
                        if(v.status === '持仓') {
                            // 获取当前品种信息
                            const info = R.compose(
                                v => v[0],
                                R.filter(
                                    item => item.code === v.code
                                )
                            )(this.state.data)

                            if(info) {
                                const loss_price = v.direction === '买入' ? v.open_price - parseInt(v.open_price * rule_var.loss_rate) : parseInt(v.open_price + v.open_price * rule_var.loss_rate)
                                const add_price = v.direction === '买入' ? parseInt(v.open_price + v.open_price * rule_var.add_rate) : v.open_price - parseInt(v.open_price * rule_var.add_rate)

                                return {
                                    ...v,
                                    current_price: info.price,
                                    // 当前盈利
                                    current_profit: v.direction === '买入' ? (info.price - v.open_price) * info.unit * v.count : (v.open_price - info.price) * info.unit * v.count,
                                    // 止损价
                                    loss_price,
                                    loss_price_gap: v.direction === '买入' ? loss_price - info.price : info.price - loss_price,
                                    // 加仓价
                                    add_price,
                                    add_price_gap: v.direction === '买入' ? info.price - add_price : add_price - info.price,
                                }
                            } else {
                                return v
                            }

                        } else {
                            return v
                        }
                    }
                )
            )(this.state.real_trade),
        })
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

                this.analylog.push({
                    lv: 'info',
                    msg: '获取当前品种信息成功',
                })

                this.handle_reload_log()
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
                        // 更新最后一天的收盘价为当前价
                        v => {

                            v[v.length - 1][4] = parseInt(item.price)

                            return v
                        },
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

                    const ensemble = analy_ensemble(all_day)

                    const month_data = {
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

                        ensemble,
                    }

                    const trade = test_trade_auto_flow({...item, month_data}, log => this.analylog.push(log))

                    ft_log = [
                        ...ft_log,
                        {
                            ...item,
                            month_data,
                            ...trade,
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
                        this.display_real_trade()
                    }

                } else {
                    Toast.fail('请求接口数据异常！')
                }
            }

            request.open('GET', `http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=${code}${month}`)
            request.send()
        }
    }

    handle_modal_log_open() {
        this.setState({
            modal_log: {
                ...this.state.modal_log,
                visible: true,
            },
        })
    }

    handle_modal_log_close() {
        this.setState({
            modal_log: {
                ...this.state.modal_log,
                visible: false,
            },
        })
    }

    render() {

        const data = this.state.data

        let op_list = []

        if(this.state.data && this.state.data[0].trade_list) {
            op_list = R.compose(
                R.sort(
                    (a, b) => a.date < b.date ? 1 : -1
                ),
                R.map(
                    v => v.trade_list[v.trade_list.length - 1]
                )
            )(this.state.data)
        }

        return (
            <Card full style={{borderColor: 'white'}}>
                <Card.Header
                    title='交易系统'
                    extra={
                        <View style={{flexDirection: 'row-reverse'}}>
                            <TouchableOpacity style={{padding: 4}} onPress={() => this.fetch_current_data()}>
                                <Icon name='reload' size='md' color='#BBB'/>
                            </TouchableOpacity>
                        </View>
                    }
                    thumb={<Icon name='safety' size='md' color='black'/>}/>
                <Card.Body>
                    <List renderHeader={'真实交易'}>
                            {
                                R.addIndex(R.map)(
                                    (v, k) => (
                                        <List.Item key={k} wrap={true}>
                                            {
                                                v.status === '持仓'
                                                    ? (
                                                        <View>
                                                            <Text>
                                                                {v.code} {R.takeLast(5)(v.date)} {v.open_price} {v.direction} {v.count} {v.current_profit} {v.current_price}
                                                            </Text>
                                                            <Text style={{color: '#999'}}>
                                                                止损:{v.loss_price}({v.loss_price_gap})  加仓:{v.add_price}({v.add_price_gap})
                                                            </Text>
                                                        </View>
                                                    )
                                                    : (
                                                        <View>
                                                            <Text>
                                                                {v.code} {R.takeLast(5)(v.date)} {v.open_price} {v.direction} {v.count} {v.close_price} {v.profit}
                                                            </Text>
                                                        </View>
                                                    )
                                            }
                                        </List.Item>
                                    )
                                )(this.state.real_trade)
                            }
                    </List>

                    <List renderHeader={`交易提示汇总(${R.reduce((a, b) => a + b.current_profit, 0)(op_list)})`}>
                        {
                            R.addIndex(R.map)(
                                (v, k) => (
                                    <List.Item wrap={true}>
                                        <View  key={k} style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                                            <Text style={{width: 50, fontSize: 12,}}>
                                                {R.takeLast(5)(v.status === '平仓' ? v.close_date : v.date)}
                                            </Text>
                                            <Text style={{width: 30, fontSize: 12,}}>
                                                {v.name}
                                            </Text>
                                            <Text style={{width: 40, fontSize: 12,}}>
                                                {v.direction}
                                            </Text>
                                            <Text style={{width: 50, fontSize: 12,}}>
                                                {v.open_price}
                                            </Text>
                                            <Text style={{width: 50, fontSize: 12,}}>
                                                {v.close_price || '-'}
                                            </Text>
                                            <Text style={{width: 30, fontSize: 12,}}>
                                                {v.status}
                                            </Text>
                                            <Text style={{width: 20, fontSize: 12,}}>
                                                {v.rb_update_count}
                                            </Text>
                                            <Text style={{width: 20, fontSize: 12,}}>
                                                {v.count}
                                            </Text>
                                            <Text style={{width: 50, fontSize: 12,}}>
                                                {v.current_profit}
                                            </Text>
                                        </View>
                                    </List.Item>
                                )
                            )(op_list)
                        }
                    </List>

                    <List renderHeader={`备选品种(${data.length})`}>
                        <List.Item wrap={true}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 6}}>
                                {
                                    R.addIndex(R.map)(
                                        (v, k) => <Tag key={k} small selected style={{margin: 4}}>{v.name}</Tag>
                                    )(data)
                                }
                            </View>
                        </List.Item>
                    </List>
                    <List renderHeader={`接口数据(${R.reduce((a, b) => a + b.total_profit, 0)(this.state.data)})`} style={{overflw: 'scroll'}}>
                        <List.Item wrap={true}>
                            <View>
                                <View style={{flexDirection: 'row-reverse', marginBottom: 10,}}>
                                    <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_log_open()}>
                                        <Icon name='monitor' size='md' color='#BBB'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', flowWrap: 'wrap', fontSize: 10}}>
                                <Text style={{width: 50}}>品种</Text>
                                <Text style={{width: 50, textAlign: 'right'}}>当前价</Text>
                                <Text style={{width: 90, textAlign: 'right'}}>周前价</Text>
                                <Text style={{width: 60, textAlign: 'right'}}>周盈率</Text>
                                <Text style={{width: 50, textAlign: 'right'}}>状态</Text>
                                <Text style={{width: 40, textAlign: 'right'}}>波幅</Text>
                            </View>
                        </List.Item>
                        {
                            R.compose(
                                R.addIndex(R.map)(
                                    (v, k)  => (
                                        <List.Item key={k} wrap={true}>
                                            {v.month_data ? (
                                                <View>
                                                    <View style={{marginBottom: 5, flexDirection: 'row', flowWrap: 'wrap', fontSize: 10}}>
                                                        <Text style={{width: 50}}>{v.name}{R.takeLast(2)(v.month)}</Text>
                                                        {/* 当前价  */}
                                                        <Text style={{width: 50, textAlign: 'right'}}>{v.price}</Text>
                                                        {/* 一周前价格 */}
                                                        <Text style={{width: 90, textAlign: 'right'}}>{`${v.month_data.before_a_week_price}(${v.month_data.before_a_week_rate})`}</Text>
                                                        {/* 一周盈利率 */}
                                                        <Text style={{width: 60, textAlign: 'right'}}>{v.month_data.before_a_week_real_rate}</Text>
                                                        {/* 价格状态  */}
                                                        <Text style={{width: 50, textAlign: 'right'}}>{`${v.price_state_cn}${v.price_state}`}</Text>
                                                        {/* 极端波幅  */}
                                                        <Text style={{width: 40, textAlign: 'right'}}>{v.max_to_min_rate}</Text>
                                                    </View>

                                                    <View style={{marginBottom: 5}}>
                                                        <Text style={{color: '#aaa'}}>
                                                            保证金: {v.current_bond} 杠杆: {v.real_rate} 持仓资金: {Math.round(v.current_hold_amount_totle / 100000000) + '亿'}
                                                        </Text>
                                                    </View>
                                                    <View style={{marginBottom: 5}}>
                                                        <Text style={{color: '#aaa'}}>
                                                            最高价: {`${v.price_max}（${v.spread_max_rate}）`} 最低价: {`${v.price_min}（${v.spread_min_rate}）`}
                                                        </Text>
                                                    </View>

                                                    <View style={{marginBottom: 5, flexDirection: 'row',}}>
                                                        <Text style={{color: '#aaa'}}>倒三角趋势:</Text>
                                                        {
                                                            R.addIndex(R.map)(
                                                                (v, k) => <Text key={k} style={{color: v.trend ? '#FF6A6A' : '#448847', width: 55}}>{v.name}{v.time_rang_rate} </Text>
                                                            )(v.month_data.ensemble.analy_120_80_40_20_10)
                                                        }
                                                    </View>

                                                    <View style={{marginBottom: 5}}>
                                                        <View>
                                                            <View>
                                                                <Text style={{color: '#aaa'}}>自动测算分析:</Text>
                                                                {
                                                                    R.compose(
                                                                        R.addIndex(R.map)(
                                                                            (v, k) => <Text key={k} style={{color: '#aaa'}}>{v.date} {v.current_price} {v.price_state_cn} {v.current_rang_rate} {v.direction} {v.build_trade ? '开仓' : '-'}</Text>
                                                                        ),
                                                                        R.takeLast(5)
                                                                    )(v.analy_day_list)
                                                                }
                                                            </View>

                                                            <View>
                                                                <Text style={{color: v.total_profit > 0 ? '#FF6A6A' : '#448847'}}>自动交易: ({v.total_profit})</Text>

                                                                {
                                                                    R.compose(
                                                                        R.addIndex(R.map)(
                                                                            (v, k) => (
                                                                                <View  key={k} style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                                                                                    <Text style={{color: '#aaa', width: 30}}>
                                                                                        {v.direction}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 45}}>
                                                                                        {v.open_price}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 20}}>
                                                                                        {v.count}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 45}}>
                                                                                        {v.close_price || '-'}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 45}}>
                                                                                        {R.takeLast(5)(v.date)}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 45}}>
                                                                                        {R.takeLast(5)(v.close_date || '-')}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 34}}>
                                                                                        {v.status}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 14}}>
                                                                                        {v.rb_update_count}
                                                                                    </Text>
                                                                                    <Text style={{color: '#aaa', width: 50}}>
                                                                                        {v.current_profit}
                                                                                    </Text>
                                                                                </View>
                                                                            )
                                                                        ),
                                                                    )(v.trade_list)
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            ) : null}
                                        </List.Item>
                                    )
                                ),
                                // R.filter(
                                //     v => v.trade_list && v.trade_list[v.trade_list.length - 1].status === '持仓'
                                // ),
                                R.sort(
                                    (a ,b) => {
                                        // if(a.trade_list) {
                                        //     console.log('a.trade_list', a.trade_list)
                                        //     return a.trade_list[a.trade_list.length - 1].status === '持仓'
                                        // } else {
                                        //     return false
                                        // }

                                        // 依据测试交易盈利额排序
                                        if(a.total_profit) {
                                            return b.total_profit - a.total_profit
                                        } else {
                                            return true
                                        }

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

                <Modal
                    visible={this.state.modal_log.visible}
                    animationType='slide-up'
                    // transparent={true}
                    // footer={[
                    //     {text: '取消', onPress: () => this.handle_modal_edit_close()},
                    //     {text: '保存', onPress: () => this.handle_modal_edit_save()},
                    // ]}
                    onClose={() => this.handle_modal_log_close()}>

                    <View style={{flexDirection: 'column', marginTop: 20, height: 600}}>
                        <ListView
                            onFetch={(page, startFetch) => startFetch(this.analylog, 10)}
                            refreshableMode='advanced'
                            renderItem={(item, index, separator) => (
                                this.analylog.length > index
                                    ? (
                                        <View style={{padding: 5,}}>
                                            <Text>{index + 1}. {item.msg}</Text>
                                        </View>
                                    )
                                    : null
                            )}/>
                    </View>
                </Modal>
            </Card>
        )
    }
}

// lianxu jiekou
// [0] date
// [1] kaipan
// [2] zuigao
// [3] zuidi
// [4] shoupan
// [5] chengjiaoliang

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

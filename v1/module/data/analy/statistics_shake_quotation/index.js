import React, { Component } from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
  StatusBar,
  Dimensions,
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

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import {
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors'

import Theme from '../../../../theme'
import State_view from '../../../../component/state_view'
import HeadTitle from '../../../../component/head_title'

import {get_nav_opt} from '../../../../router'
import {to_rate} from '../../../../lib/num'

const StatisticsShakeQuotationList = payload => {
    return (
        <View>
            {
                R.addIndex(R.map)(
                    (v, k) => (
                        <View key={k} style={{padding: 4, }}>
                            <View style={{flexDirection: 'row', }}>
                                <View style={{width: 54, }}>
                                    <Text style={{color: Theme['title-color']}}>
                                        {R.takeLast(5)(v.group[0].date)} 至
                                    </Text>
                                </View>
                                <View style={{width: 50, }}>
                                    <Text style={{color: Theme['title-color']}}>
                                        {R.takeLast(5)(v.group[v.group.length - 1].date)}
                                    </Text>
                                </View>
                                <View style={{width: 30, flexDirection: 'row', justifyContent: 'flex-end', }}>
                                    <Text style={{color: Theme['title-color']}}>
                                        {`${v.group.length}天`}
                                    </Text>
                                </View>
                                <View style={{width: 50, flexDirection: 'row', justifyContent: 'flex-end', }}>
                                    <Text style={{
                                        fontWeight: Math.abs(v.rate) > 8 ? 'bold' : 'normal',
                                        color: v.dir === '多' ? Theme['up-color'] :
                                               v.dir === '空' ? Theme['down-color'] : Theme['title-color'],
                                    }}>
                                        {v.rate}
                                    </Text>
                                </View>
                                <View style={{width: 45, flexDirection: 'row', justifyContent: 'flex-end', }}>
                                    <Text style={{color: v.ave_rate > 0.4 ? Theme['primary-color'] : Theme['title-color']}}>
                                        {v.ave_rate}
                                    </Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                                {
                                    // R.addIndex(R.map)(
                                    //     (v1, k1) => (
                                    //         <View key={k1} style={{padding: 4, width: 120, flexDirection: 'row', }}>
                                    //             <Text style={{fontSize: 11, paddingRight: 4, color: Theme['text-color-secondary']}}>{R.takeLast(5)(v1.date)}</Text>
                                    //             <Text style={{fontSize: 11, paddingRight: 4, color: Theme['text-color-secondary']}}>{v1.price}</Text>
                                    //             <Text style={{fontSize: 11, paddingRight: 4, color: v1.rate === 0 ? Theme['void-color'] : v1.rate > 0 ? Theme['up-color'] : Theme['down-color']}}>{v1.rate}</Text>
                                    //         </View>
                                    //     )
                                    // )(v.group)
                                }
                            </View>
                        </View>
                    )
                )(payload.data.statistics_shake_quotation)
            }
        </View>
    )
}

const ShortLineChart = payload => {

    const {
        data: {
            all_day_chart,
            day_40_chart,
            day_40_high_chart,
            day_40_low_chart,
            statistics_shake_quotation_chart,
        },
    } = payload

    const day_chart = all_day_chart

    return (
        day_chart ? (
            <View style={{flexDirection: 'column', }}>
                <LineChart
                    data={{
                        labels: day_chart.x,
                        datasets: [
                            {
                                data: day_chart.y,
                                color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                                strokeWidth: 1,
                            },
                            // ...R.map(
                            //     v => ({
                            //         data: v.y,
                            //         color: (opacity = 1) => v.dir === 'up' ? `rgba(0, 255, 0, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                            //         strokeWidth: 2,
                            //     })
                            // )(statistics_shake_quotation_chart),
                            // {
                            //     data: day_40_high_chart.y,
                            //     color: (opacity = 1) => `rgba(220, 20, 60, ${opacity})`,
                            //     strokeWidth: 1
                            // },
                            // {
                            //     data: day_40_low_chart.y,
                            //     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            //     strokeWidth: 1
                            // },
                        ]
                    }}
                    width={Dimensions.get('window').width - 10} // from react-native
                    height={220}
                    withInnerLines={false}
                    // fromZero={true}
                    // withVerticalLabels={false}
                    withDots={false}
                    yAxisLabel=''
                    yAxisSuffix=''
                    formatYLabel={v => parseInt(v)}
                    formatXLabel={v => {
                        const date = R.takeLast(2)(v.v)
                        return v.k % 10 === 0 ? date : ''
                    }}
                    // bezier
                    segments={6}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: Theme['primary-color'],
                        backgroundGradientTo: 'white',
                        decimalPlaces: 2, // 小数点2位
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 4,
                        },
                    }}
                    style={{
                        marginLeft: 5,
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, color: Theme['text-color-secondary']}}>
                        {R.takeLast(5)(day_chart.x[0].v)} 至 {R.takeLast(5)(day_chart.x[day_chart.x.length - 1].v)}({day_chart.x.length}天)
                    </Text>
                </View>
            </View>
        ) : null
    )
}

const SemLineChart = payload => {

    const {
        data: {
            all_day_chart,
            day_40_chart,
            day_40_high_chart,
            day_40_low_chart,
            statistics_shake_quotation_chart,
        },
    } = payload

    const day_chart = all_day_chart

    return (
        day_chart ? (
            <View style={{flexDirection: 'column', }}>
                {
                    <LineChart
                        data={{
                            labels: day_chart.x,
                            datasets: [
                                // {
                                //     data: day_chart.y,
                                //     color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                                //     strokeWidth: 1,
                                // },
                                // {
                                //     data: statistics_shake_quotation_chart[0].y,
                                //     color: (opacity = 1) => 'red',
                                //     strokeWidth: 1,
                                // }
                                ...R.map(
                                    v => ({
                                        data: v.y,
                                        color: (opacity = 1) => v.dir === '未' ? 'white' : v.dir === '多' ? 'red' : 'green',
                                        strokeWidth: 0.8,
                                    })
                                )(statistics_shake_quotation_chart),
                                // {
                                //     data: day_40_high_chart.y,
                                //     color: (opacity = 1) => `rgba(220, 20, 60, ${opacity})`,
                                //     strokeWidth: 1
                                // },
                                // {
                                //     data: day_40_low_chart.y,
                                //     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                //     strokeWidth: 1
                                // },
                            ]
                        }}
                        width={Dimensions.get('window').width - 10} // from react-native
                        height={220}
                        withInnerLines={false}
                        // fromZero={true}
                        // withVerticalLabels={false}
                        withDots={false}
                        yAxisLabel=''
                        yAxisSuffix=''
                        formatYLabel={v => parseInt(v)}
                        formatXLabel={v => {
                            const date = R.takeLast(2)(v.v)
                            return v.k % 10 === 0 ? date : ''
                        }}
                        // bezier
                        segments={6}
                        chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: Theme['primary-color'],
                            backgroundGradientTo: 'white',
                            decimalPlaces: 2, // 小数点2位
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 4,
                            },
                        }}
                        style={{
                            marginLeft: 5,
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                }

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, color: Theme['text-color-secondary']}}>
                        {R.takeLast(5)(day_chart.x[0].v)} 至 {R.takeLast(5)(day_chart.x[day_chart.x.length - 1].v)}({day_chart.x.length}天)
                    </Text>
                </View>
            </View>
        ) : null
    )
}

// [0] date
// [1] 开盘
// [2] 最高
// [3] 最低
// [4] 收盘
// [5] 成交量
const ShortDataList = payload => (
    <View style={{paddingTop: 10, paddingBottom: 10, }}>
        {
            R.compose(
                R.addIndex(R.map)(
                    (v, k) => (
                        <View key={k} style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderBottomWidth: 0.3, borderBottomColor: Theme['border-defalut-color']}}>
                            <View style={{width: 45, paddingLeft: 5, }}>
                                <Text style={{color: Theme['text-color-secondary']}}>{R.takeLast(5)(v[0])}</Text>
                            </View>
                            <View style={{width: 40, paddingRight: 4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={{
                                    fontWeight: Math.abs(v[6]) > 1 ? 'bold' : 'normal',
                                    color: v[6] === 0 ? Theme['text-color-secondary'] : v[6] < 0 ? Theme['down-color'] : Theme['up-color']}}>
                                    {/*开收盘波幅*/}
                                    {v[6]}
                                </Text>
                            </View>
                            {
                                <View style={{ }}>
                                    <Text style={{fontSize: 12, color: Theme['text-color-secondary']}}>{v[1]}-{v[4]}</Text>
                                </View>
                            }
                            <View style={{width: 45, paddingRight: 4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={{
                                    fontWeight: Math.abs(v[7]) > 2 ? 'bold' : 'normal',
                                    color: v[7] > 2 ? Theme['primary-color'] : Theme['text-color-secondary']}}>
                                    {/*最高最低波幅*/}
                                    {v[7]}
                                </Text>
                            </View>
                            <View style={{width: 45, paddingRight: 4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={{
                                    fontWeight: v[8] > 2 ? 'bold' : 'normal',
                                    color: v[8] > 2 ? Theme['primary-color'] : Theme['text-color-secondary']}}>
                                    {/*波幅差 穿仓系数参考*/}
                                    {v[8]}
                                </Text>
                            </View>
                            {
                                <View style={{ }}>
                                    <Text style={{fontSize: 12, color: Theme['text-color-secondary']}}>{v[3]}-{v[2]}</Text>
                                </View>
                            }
                            <View style={{width: 50, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={{color: Theme['text-color-secondary']}}>{parseInt(v[5] / 10000)}W</Text>
                            </View>
                        </View>
                    )
                ),
                // R.takeLast(40)
            )(payload.data)
        }
    </View>
)

class Module extends Component {

    static navigationOptions = ({navigation}) => get_nav_opt(`${navigation.getParam('breed')['name']} - 连续同向价格分段`)

    constructor() {
        super()
        this.state = {
            render_chart: false,
        }
    }

    componentDidMount() {
        this.timer_render_chart = setTimeout(() => {
            this.setState({
                render_chart: true,
            })
        }, 800)
    }

    componentWillUnmount() {
        clearTimeout(this.timer_render_chart)
    }

    render() {

        const {
            data,
        } = this.props

        const {
            state: {
                params: {
                    breed,
                },
            },
        } = this.props.navigation

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>

                <ScrollView style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                    <View style={{flexDirection: 'column', }}>
                        <HeadTitle title='规则'/>
                    </View>

                    <View style={{flexDirection: 'column', }}>
                        <HeadTitle title='数据'/>
                        {
                            // <ShortLineChart data={breed}/>
                        }
                        <SemLineChart data={breed}/>
                        {
                            // this.state.render_chart ? <ShortDataList data={breed.all_day}/> : null
                        }
                        {
                            <StatisticsShakeQuotationList data={breed}/>
                        }
                    </View>

                    <View style={{paddingBottom: 10}}>
                        {
                            // <State_view state={breed}/>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        data: state.data,
    }),
    // dispatch => ({
    //     action: bindActionCreators(action, dispatch),
    // })
)(Module)

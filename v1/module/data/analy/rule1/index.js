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

const ShortLineChart = payload => {

    const {
        data: {
            day_40_chart,
            day_40_high_chart,
            day_40_low_chart,
        },
    } = payload

    return (
        day_40_chart ? (
            <View style={{flexDirection: 'column', }}>
                <LineChart
                    data={{
                        labels: day_40_chart.x,
                        datasets: [
                            {
                                data: day_40_chart.y,
                                color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                                strokeWidth: 1
                            },
                            {
                                data: day_40_high_chart.y,
                                color: (opacity = 1) => `rgba(220, 20, 60, ${opacity})`,
                                strokeWidth: 1
                            },
                            {
                                data: day_40_low_chart.y,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 1
                            }
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
                        return v.k % 4 === 0 ? date : ''
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
                        {R.takeLast(5)(day_40_chart.x[0].v)} 至 {R.takeLast(5)(day_40_chart.x[day_40_chart.x.length - 1].v)}(40天)
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
                R.takeLast(40)
            )(payload.data)
        }
    </View>
)

class Module extends Component {

    static navigationOptions = ({navigation}) => get_nav_opt(`${navigation.getParam('breed')['name']} - 规则1`)

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
                        <ShortLineChart data={breed}/>
                        {
                            this.state.render_chart ? <ShortDataList data={breed.all_day}/> : null
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

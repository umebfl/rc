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
    ListView,
    Tag,
    Modal,
    Button,
    Provider,
    TextareaItem,
    Drawer,
    Toast,
    Tabs,
} from '@ant-design/react-native'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

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

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import State_view from '../../../component/state_view'
import HeadTitle from '../../../component/head_title'
import SemLine from '../../../component/sem_line'

import {to_rate} from '../../../lib/num'

import Theme from '../../../theme'
import {get_nav_opt} from '../../../router'
import {action as breed_action} from '../../setting/breed/reducer'

const SemPieChart = payload => (
    <PieChart
      data={[
          {
            name: `小于1波幅 ${to_rate(payload.all_day.length, payload.data.lv0.length, 0)}%`,
            population: payload.data.lv0.length,
            color: blue[3],
            legendFontColor: '#7F7F7F',
            legendFontSize: 10
          },
          {
            name: `小于2波幅 ${to_rate(payload.all_day.length, payload.data.lv1.length, 0)}%`,
            population: payload.data.lv1.length,
            color: blue[5],
            legendFontColor: '#7F7F7F',
            legendFontSize: 10
          },
          {
            name: `小于3波幅 ${to_rate(payload.all_day.length, payload.data.lv2.length, 0)}%`,
            population: payload.data.lv2.length,
            color: blue[7],
            legendFontColor: '#7F7F7F',
            legendFontSize: 10
          },
          {
            name: `大于3波幅 ${to_rate(payload.all_day.length, payload.data.lv3.length, 0)}%`,
            population: payload.data.lv3.length,
            color: blue[9],
            legendFontColor: '#7F7F7F',
            legendFontSize: 10
          },
        ]}
      width={Dimensions.get('window').width - 20}
      height={160}
      chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            color: (opacity = 0.75) => `rgb(24, 144, 255, ${opacity})`,
        }}
      accessor='population'
      backgroundColor='transparent'
      paddingLeft='15'
      absolute
    />
)

const StatisticsSemLineChart = ({data}) => (
    <SemLine
        x={['1%', '2%', '3%', '3%以上']}
        y={[data.lv0.length, data.lv1.length, data.lv2.length, data.lv3.length, ]}/>
)

const ContentView = payload => {

    const breed = payload.breed
    const all_day = breed.all_day
    const all_day_chart = breed.all_day_chart

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <View>
                <View style={{padding: 10, flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text style={{fontSize: 18, color: Theme['primary-color']}}>{breed.name}</Text>
                    <Text style={{fontSize: 14, color: Theme['text-color-secondary']}}>{breed.code}{breed.month}</Text>
                </View>
                <View style={{padding: 10, paddingTop: 0, paddingBottom: 0, flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text style={{
                        fontSize: 20,
                        color: breed.最新价 > breed.开盘价 ? red[5] : green[5],
                    }}>{breed.最新价}</Text>
                    <View style={{paddingLeft: 5, paddingTop: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline'}}>
                        <Icon style={{
                            fontSize: 14,
                            color: breed.最新价 > breed.开盘价 ? red[5] : green[5],
                        }} name={breed.最新价 > breed.开盘价 ? 'arrow-up' : 'arrow-down'} color={Theme['primary-color']}/>

                        <Text style={{
                            fontSize: 14,
                            color: breed.最新价 > breed.开盘价 ? red[5] : green[5],
                        }}>{Math.abs((breed.最新价 - breed.开盘价) / breed.开盘价 * 100).toFixed(2)}%</Text>
                    </View>
                </View>
                <View style={{padding: 10, paddingTop: 0, flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text style={{fontSize: 14, color: Theme['text-color-secondary']}}>杠杆：{(1 / breed.rate).toFixed(2)}</Text>
                    <Text style={{fontSize: 14, paddingLeft: 10, color: Theme['text-color-secondary']}}>保证金：{breed.当前一手保证金}</Text>
                    <Text style={{fontSize: 14, paddingLeft: 10, color: Theme['text-color-secondary']}}>持仓额：{(breed.当前持仓总金额 / 100000000).toFixed(2)}亿</Text>
                    <Text style={{fontSize: 14, paddingLeft: 10, color: Theme['text-color-secondary']}}>系数：-</Text>
                </View>

                {
                    all_day
                        ? (
                            <View>
                                <HeadTitle title='统计'/>
                                <View style={{flexDirection: 'column', padding: 4, paddingTop: 8, }}>
                                    <View style={{paddingLeft: 10,}}>
                                        <Text style={{fontSize: 15, color: Theme['title-color']}}>开收盘波幅分段统计({breed.all_day.length})</Text>
                                    </View>
                                    {
                                        // <View style={{flexDirection: 'row', padding: 4, justifyContent: 'space-around', }}>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>0-1%: {to_rate(breed.all_day.length, breed.statistics_ocrate.lv0.length, 0)}%</Text>
                                        //     </View>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>1-2%: {to_rate(breed.all_day.length, breed.statistics_ocrate.lv1.length, 0)}%</Text>
                                        //     </View>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>2-3%: {to_rate(breed.all_day.length, breed.statistics_ocrate.lv2.length, 0)}%</Text>
                                        //     </View>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>3%以上: {to_rate(breed.all_day.length, breed.statistics_ocrate.lv3.length, 0)}%</Text>
                                        //     </View>
                                        // </View>
                                    }
                                    {
                                        // <SemPieChart data={breed.statistics_ocrate} all_day={breed.all_day}/>
                                    }
                                    <StatisticsSemLineChart data={breed.statistics_ocrate}/>
                                </View>
                                <View style={{flexDirection: 'column', padding: 4, paddingTop: 8,}}>
                                    <View style={{paddingLeft: 10,}}>
                                        <Text style={{fontSize: 15, color: Theme['title-color']}}>最高最低波幅分段统计</Text>
                                    </View>
                                    {
                                        // <View style={{flexDirection: 'row', padding: 4, justifyContent: 'space-around', }}>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>0-1%: {to_rate(breed.all_day.length, breed.statistics_hlrate.lv0.length, 0)}%</Text>
                                        //     </View>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>1-2%: {to_rate(breed.all_day.length, breed.statistics_hlrate.lv1.length, 0)}%</Text>
                                        //     </View>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>2-3%: {to_rate(breed.all_day.length, breed.statistics_hlrate.lv2.length, 0)}%</Text>
                                        //     </View>
                                        //     <View>
                                        //         <Text style={{color: Theme['text-color-secondary']}}>3%以上: {to_rate(breed.all_day.length, breed.statistics_hlrate.lv3.length, 0)}%</Text>
                                        //     </View>
                                        // </View>
                                    }
                                    {
                                        // <SemPieChart data={breed.statistics_hlrate} all_day={breed.all_day}/>
                                    }
                                    <StatisticsSemLineChart data={breed.statistics_hlrate} all_day={breed.all_day}/>
                                </View>

                                <TouchableOpacity activeOpacity={0.5} onPress={() => payload.navigation.navigate('analy_nday_data', {breed})}>
                                    <View style={{flexDirection: 'column', padding: 4, paddingBottom: 10, backgroundColor: 'white', }}>
                                        <View style={{paddingLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: Theme['primary-color']}}>40天价格分析</Text>
                                            <Icon style={{
                                                marginRight: 10,
                                                fontSize: 22,
                                                color: Theme['primary-color'],
                                            }} name='right' color={Theme['primary-color']}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.5} onPress={() => payload.navigation.navigate('statistics_shake_quotation', {breed})}>
                                    <View style={{flexDirection: 'column', padding: 4, paddingBottom: 10, backgroundColor: 'white', }}>
                                        <View style={{paddingLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{fontSize: 16, color: Theme['primary-color']}}>连续同向价格分段</Text>
                                            <Icon style={{
                                                marginRight: 10,
                                                fontSize: 22,
                                                color: Theme['primary-color'],
                                            }} name='right' color={Theme['primary-color']}/>
                                        </View>

                                        <View style={{flexDirection: 'column', paddingTop: 8,}}>
                                            <View style={{paddingLeft: 10,}}>
                                                <Text style={{fontSize: 15, color: Theme['title-color']}}>行情波幅分段统计({breed.statistics_shake_quotation.length})</Text>
                                            </View>
                                            <SemLine
                                                x={breed.statistics_shake_quotation_rate_sem.x}
                                                y={breed.statistics_shake_quotation_rate_sem.y}/>
                                        </View>

                                        <View style={{flexDirection: 'column', paddingTop: 8,}}>
                                            <View style={{paddingLeft: 10,}}>
                                                <Text style={{fontSize: 15, color: Theme['title-color']}}>行情平均波幅分段统计</Text>
                                            </View>
                                            <SemLine
                                                x={breed.statistics_shake_quotation_sem_avg_sem.x}
                                                y={breed.statistics_shake_quotation_sem_avg_sem.y}/>
                                        </View>

                                        <View style={{flexDirection: 'column', paddingTop: 8,}}>
                                            <View style={{paddingLeft: 10,}}>
                                                <Text style={{fontSize: 15, color: Theme['title-color']}}>行情天数分段统计</Text>
                                            </View>
                                            <SemLine
                                                x={breed.statistics_shake_quotation_sem_day_sem.x}
                                                y={breed.statistics_shake_quotation_sem_day_sem.y}/>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                        : null
                }

            </View>

            <View style={{paddingBottom: 10}}>
                <HeadTitle title='交易'/>
            </View>

            <TouchableOpacity activeOpacity={0.5} onPress={() => payload.navigation.navigate('analy_rule1', {breed})}>
                <View style={{paddingBottom: 10}}>
                    <HeadTitle title='规则1'/>

                    {
                        // payload.render_chart
                        //     ? (
                        //         <SortLineChart data={breed.day_40_chart}/>
                        //     )
                        //     : null
                    }
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Icon style={{
                            marginRight: 4,
                            color: grey[4],
                        }} name='ellipsis'/>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={() => payload.navigation.navigate('analy_rule1', {breed})}>
                <View style={{paddingBottom: 10}}>
                    <HeadTitle title='规则2'/>

                    {
                        // payload.render_chart
                        //     ? (
                        //         <SortLineChart data={breed.day_40_chart}/>
                        //     )
                        //     : null
                    }
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Icon style={{
                            marginRight: 4,
                            color: grey[4],
                        }} name='ellipsis'/>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{paddingBottom: 10}}>
                {
                    // <State_view state={breed}/>
                }
            </View>


            <View>
                {
                    // !all_day_chart ? (
                    //     <LineChart
                    //         data={{
                    //             labels: all_day_chart.x,
                    //             datasets: [
                    //                 {
                    //                     data: all_day_chart.y,
                    //                     color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                    //                     strokeWidth: 1
                    //                 }
                    //             ]
                    //         }}
                    //         width={Dimensions.get('window').width - 10} // from react-native
                    //         height={220}
                    //         withInnerLines={false}
                    //         // fromZero={true}
                    //         withVerticalLabels={false}
                    //         withDots={false}
                    //         yAxisLabel=''
                    //         yAxisSuffix=''
                    //         formatYLabel={v => parseInt(v)}
                    //         bezier
                    //         segments={6}
                    //         chartConfig={{
                    //             backgroundColor: 'white',
                    //             backgroundGradientFrom: Theme['primary-color'],
                    //             backgroundGradientTo: 'white',
                    //             decimalPlaces: 2, // optional, defaults to 2dp
                    //             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    //             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    //             style: {
                    //                 borderRadius: 4,
                    //             },
                    //         }}
                    //         style={{
                    //             marginLeft: 5,
                    //             marginVertical: 8,
                    //             borderRadius: 16
                    //         }}
                    //     />
                    // ) : null
                }
            </View>

        </ScrollView>
    )
}

class Module extends Component {

    // static navigationOptions = ({navigation}) => get_nav_opt(`${navigation.getParam('name')}价格分析`)
    static navigationOptions = ({navigation}) => get_nav_opt('价格分析')

    constructor() {
        super()
        this.state = {
            render_chart: false,
        }
    }

    componentDidMount() {

        // const {
        //     state: {
        //         params: {
        //             code,
        //             month,
        //             all_day,
        //         },
        //     },
        // } = this.props.navigation
        //
        // if(!all_day) {
        //     this.props.action.search_all_day_data(code, month)
        // }

        this.timer_timeout = setTimeout(() => {
            this.setState({
                render_chart: true,
            })
        }, 800)
    }

    componentWillUnmount() {
        clearTimeout(this.timer_timeout)
    }

    handle_change_tab(payload) {

    }

    render() {

        const {
            analy,
            breed: {
                data,
            },
        } = this.props

        const {
            state: {
                params: {
                    k,
                },
            },
        } = this.props.navigation

        const breed_list = R.filter(v => !v.disable)(data)
        const breed = breed_list[k]

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>

                <ScrollableTabView
                    prerenderingSiblingsNumber={1}
                    style={{ marginTop: 0, backgroundColor: 'white', }}
                    initialPage={k}
                    // page={2}
                    // onChangeTab={payload => this.handle_change_tab(payload)}
                    renderTabBar={() => <View/>}>

                    {
                        R.addIndex(R.map)(
                            (v, k) => <ContentView key={k} navigation={this.props.navigation} breed={data[k]} render_chart={this.state.render_chart}/>
                        )(breed_list)
                    }
                </ScrollableTabView>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        analy: state.analy,
        breed: state.breed,
    }),
    dispatch => ({
        action: bindActionCreators({...action, ...breed_action}, dispatch),
    })
)(Module)

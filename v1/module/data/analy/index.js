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

import Theme from '../../../theme'
import {get_nav_opt} from '../../../router'
import {action as breed_action} from '../../setting/breed/reducer'

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
                    <Text style={{fontSize: 14, paddingLeft: 10, color: Theme['text-color-secondary']}}>系数：-</Text>
                </View>
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
                    !all_day_chart ? (
                        <LineChart
                            data={{
                                labels: all_day_chart.x,
                                datasets: [
                                    {
                                        data: all_day_chart.y,
                                        color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                                        strokeWidth: 1
                                    }
                                ]
                            }}
                            width={Dimensions.get('window').width - 10} // from react-native
                            height={220}
                            withInnerLines={false}
                            // fromZero={true}
                            withVerticalLabels={false}
                            withDots={false}
                            yAxisLabel=''
                            yAxisSuffix=''
                            formatYLabel={v => parseInt(v)}
                            bezier
                            segments={6}
                            chartConfig={{
                                backgroundColor: 'white',
                                backgroundGradientFrom: Theme['primary-color'],
                                backgroundGradientTo: 'white',
                                decimalPlaces: 2, // optional, defaults to 2dp
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
                    ) : null
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

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

import Theme from '../../../theme'
import {get_nav_opt} from '../../../router'
import {action as breed_action} from '../../RC/breed/reducer'

class Module extends Component {

    static navigationOptions = ({navigation}) => get_nav_opt(`${navigation.getParam('name')}价格分析`)

    componentDidMount() {

        const {
            state: {
                params: {
                    code,
                    month,
                    all_day,
                },
            },
        } = this.props.navigation

        if(!all_day) {
            this.props.action.search_all_day_data(code, month)
        }
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
                    code,
                    month,
                },
            },
        } = this.props.navigation

        const breed = R.filter(v => v.code === code)(data)[0]
        const all_day = breed.all_day
        const all_day_chart = breed.all_day_chart

        console.log('all_day', breed, all_day, all_day_chart)

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
                    <View>
                        {
                            all_day_chart ? (
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

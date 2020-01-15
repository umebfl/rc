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
    WhiteSpace,
    WingBlank,
} from '@ant-design/react-native'

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

export default class Module extends Component {

    // componentDidMount() {
    //     this.timer_interval = setInterval(this.props.action.test, 1000)
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.timer_interval)
    // }

    render() {

        const {

        } = this.props

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
                        <WhiteSpace/>
                        <WingBlank>
                              <Text>Bezier Line Chart</Text>
                        </WingBlank>
                      <LineChart
                        data={{
                          labels: ["January", "February", "March", "April", "May", "June"],
                          datasets: [
                            {
                              data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                              ]
                            }
                          ]
                        }}
                        width={Dimensions.get("window").width - 10} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        chartConfig={{
                          backgroundColor: "white",
                          backgroundGradientFrom: Theme['primary-color'],
                          backgroundGradientTo: "white",
                          decimalPlaces: 2, // optional, defaults to 2dp
                          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          style: {
                            borderRadius: 4,
                          },
                          propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: Theme['success-color']
                          }
                        }}
                        bezier
                        style={{
                          marginLeft: 5,
                          marginVertical: 8,
                          borderRadius: 16
                        }}
                      />
                    </View>


                    <View>
                        <WhiteSpace/>
                        <WingBlank>
                              <Text>ProgressChart Chart</Text>
                        </WingBlank>
                        <WhiteSpace/>
                        <ProgressChart
                          data={{
                                labels: ["Swim", "Bike", "Run"], // optional
                                data: [0.4, 0.6, 0.8]
                            }}
                          width={Dimensions.get("window").width}
                          height={220}
                          chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                color: (opacity = 0.75) => `rgb(24, 144, 255, ${opacity})`,
                            }}
                          hideLegend={false}
                        />
                    </View>

                    <View>
                        <WhiteSpace/>
                        <WingBlank>
                              <Text>Bar chart</Text>
                        </WingBlank>
                        <WhiteSpace/>
                        <BarChart
                          // style={graphStyle}
                          data={{
                              labels: ["January", "February", "March", "April", "May", "June"],
                              datasets: [
                                {
                                  data: [20, 45, 28, 80, 99, 43]
                                }
                              ]
                            }}
                          width={Dimensions.get("window").width - 20}
                          height={280}
                          yAxisLabel="$"
                          chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                color: (opacity = 0.75) => `rgb(24, 144, 255, ${opacity})`,
                            }}
                          verticalLabelRotation={30}
                        />
                    </View>

                    <View>
                        <WhiteSpace/>
                        <WingBlank>
                              <Text>StackedBarChart Chart</Text>
                        </WingBlank>
                        <WhiteSpace/>
                        <StackedBarChart
                            style={{
                                marginLeft: 10,
                            }}
                          data={{
                              labels: ["Test1", "Test2"],
                              legend: ["L1", "L2", "L3"],
                              data: [[60, 60, 60], [30, 30, 60]],
                              barColors: [blue[0], blue[1], blue[2]]
                            }}
                          width={Dimensions.get("window").width - 20}
                          height={280}
                          chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                color: (opacity = 0.75) => `rgb(24, 144, 255, ${opacity})`,
                            }}
                        />
                    </View>

                    <View>
                        <WhiteSpace/>
                        <WingBlank>
                              <Text>PieChart Chart</Text>
                        </WingBlank>
                        <WhiteSpace/>
                        <PieChart
                          data={[
                              {
                                name: "北京",
                                population: 24553,
                                color: blue[4],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 12
                              },
                              {
                                name: "纽约",
                                population: 23553,
                                color: blue[5],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 12
                              },
                              {
                                name: "新西兰",
                                population: 26553,
                                color: blue[6],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 12
                              },
                              {
                                name: "上海",
                                population: 25053,
                                color: blue[3],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 12
                              },
                              {
                                name: "深圳",
                                population: 23553,
                                color: blue[2],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 12
                              }
                            ]}
                          width={Dimensions.get("window").width - 20}
                          height={220}
                          chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                color: (opacity = 0.75) => `rgb(24, 144, 255, ${opacity})`,
                            }}
                          accessor="population"
                          backgroundColor="transparent"
                          paddingLeft="15"
                          absolute
                        />
                    </View>

                    <View>
                        <WhiteSpace/>
                        <WingBlank>
                              <Text>ContributionGraph Chart</Text>
                        </WingBlank>
                        <WhiteSpace/>
                        <ContributionGraph
                          values={[
                              { date: "2017-01-02", count: 1 },
                              { date: "2017-01-03", count: 2 },
                              { date: "2017-01-04", count: 3 },
                              { date: "2017-01-05", count: 4 },
                              { date: "2017-01-06", count: 5 },
                              { date: "2017-01-30", count: 2 },
                              { date: "2017-01-31", count: 3 },
                              { date: "2017-03-01", count: 2 },
                              { date: "2017-04-02", count: 4 },
                              { date: "2017-03-05", count: 2 },
                              { date: "2017-02-30", count: 4 }
                            ]}
                          endDate={new Date("2017-04-01")}
                          numDays={105}
                          width={Dimensions.get("window").width - 20}
                          height={220}
                          chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                color: (opacity = 0.75) => `rgb(24, 144, 255, ${opacity})`,
                            }}
                        />
                    </View>

                </ScrollView>

            </SafeAreaView>
        )
    }
}

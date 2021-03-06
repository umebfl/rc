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
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

import {
    action as breed_action,
} from '../setting/breed/reducer'

import Theme from '../../theme'

import State_view from '../../component/state_view'
import HeadTitle from '../../component/head_title'

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

const Item = List.Item
const Brief = List.Item.Brief

const Head = () => (
    <View style={{
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme['primary-color'],
    }}>
        <Text style={{
            color: 'white',
            fontSize: 18,
        }}>RC AI Analy</Text>
    </View>
)

// 打开列表展示
// const BreedCurrentList = payload => {
//
//     const data = payload.data
//     const navigation = payload.navigation
//
//     return R.compose(
//         R.addIndex(R.map)(
//             (v, k) => (
//                 <TouchableOpacity key={k} activeOpacity={0.5} onPress={() => navigation.navigate('analy', v)}>
//                     <View style={{
//                         flexDirection: 'column',
//                         borderBottomWidth: 0.3,
//                         borderBottomColor: Theme['border-defalut-color'],
//                         paddingLeft: 10,
//                         paddingRight: 10,
//                     }}>
//                         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
//                             <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 10, }}>
//                                 <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
//                                     <Text style={{fontSize: 16, color: blue[6]}}>{`${v.name}`}</Text>
//                                     <Text style={{fontSize: 12, marginLeft: 4, color: Theme['text-color-secondary']}}>{`${v.code}${v.month}`}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={{height: 76, flexDirection: 'row', }}>
//                             <Text style={{
//                                 paddingTop: 10,
//                                 paddingLeft: 16,
//                                 fontSize: 26,
//                                 color: v.最新价 > v.开盘价 ? red[5] : green[5],
//                             }}>{v.最新价}</Text>
//
//                             <Icon style={{
//                                 paddingTop: 8,
//                                 marginLeft: 4,
//                                 fontSize: 12,
//                                 color: v.最新价 > v.开盘价 ? red[5] : green[5],
//                             }} name={v.最新价 > v.开盘价 ? 'arrow-up' : 'arrow-down'} color={Theme['primary-color']}/>
//
//                             <Text style={{
//                                 paddingTop: 8,
//                                 fontSize: 12,
//                                 color: v.最新价 > v.开盘价 ? red[5] : green[5],
//                             }}>{((v.最新价 - v.开盘价) / v.开盘价 * 100).toFixed(2)}%</Text>
//                         </View>
//                         <View style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             paddingBottom: 15,
//                             paddingLeft: 16,
//                             alignItems: 'center',
//                         }}>
//                             <Text style={{color: Theme['text-color-secondary']}}>开盘价: {v.开盘价}</Text>
//                             <Text style={{color: Theme['text-color-secondary']}}>最高价: {v.最高价}</Text>
//                             <Text style={{color: Theme['text-color-secondary']}}>最低价: {v.最低价}</Text>
//                             <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
//                                 <Icon style={{
//                                     marginLeft: 4,
//                                     color: grey[4],
//                                 }} name='ellipsis'/>
//                             </View>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             )
//         ),
//         R.filter(v => !v.disable)
//     )(data)
// }

const SEARCH_INTERVAL = 60 * 1000

const Deal_tips = () => (
    <View style={{borderBottomWidth: 0.3, borderBottomColor: Theme['border-defalut-color'],}}>
        <HeadTitle title='交易提示'/>
        <View style={{padding: 10,}}>

        </View>
    </View>
)

const InfoList = payload => {

    const data = R.filter(v => !v.disable)(payload.breed.data)
    const navigation = payload.navigation

    return (
        <View>
            <HeadTitle title='交易品种'/>

            <View>
                {
                    R.addIndex(R.map)(
                        (v, k) => (
                            <TouchableOpacity key={k} activeOpacity={0.5} onPress={() => navigation.navigate('analy', {k})}>
                                <View style={{
                                    flexDirection: 'column',
                                    borderBottomWidth: 0.3,
                                    borderBottomColor: Theme['border-defalut-color'],
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                        <View style={{flexDirection: 'row', paddingTop: 18, paddingBottom: 18}}>
                                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                                <Text style={{width: 40, fontSize: 16, color: blue[6]}}>{`${v.name}`}</Text>
                                                <View style={{width: 60, flexDirection: 'row', justifyContent: 'flex-end', }}>
                                                    <Text style={{fontSize: 14, color: Theme['text-color-secondary']}}>{`${v.code}${v.month}`}</Text>
                                                </View>
                                                {
                                                    v.最新价
                                                        ? (
                                                            <View style={{flexDirection: 'row', }}>
                                                                <View style={{width: 55, flexDirection: 'row', justifyContent: 'flex-end', }}>
                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: v.最新价 > v.开盘价 ? red[5] : green[5],
                                                                    }}>{v.最新价}</Text>
                                                                </View>
                                                                <View style={{width: 60, flexDirection: 'row', justifyContent: 'flex-end', }}>
                                                                    <Icon style={{
                                                                        fontSize: 14,
                                                                        color: v.最新价 > v.开盘价 ? red[5] : green[5],
                                                                    }} name={v.最新价 > v.开盘价 ? 'arrow-up' : 'arrow-down'} color={Theme['primary-color']}/>

                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: v.最新价 > v.开盘价 ? red[5] : green[5],
                                                                    }}>{Math.abs((v.最新价 - v.开盘价) / v.开盘价 * 100).toFixed(2)}%</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                        : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    )(data)
                }
            </View>
        </View>
    )
}

class Module extends Component {

    componentDidMount() {
        this.props.action.search_current_data()
        this.timer_interval = setInterval(this.props.action.search_current_data, SEARCH_INTERVAL)
    }

    componentWillUnmount() {
        clearInterval(this.timer_interval)
        // clearTimeout(this.timer_timeout)
    }

    render() {

        const {
            breed: {
                data,
            },
        } = this.props

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Theme['primary-color'],
                flexDirection: 'column',
            }}>
                <StatusBar barStyle='light-content'/>

                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                    <Head/>

                    <ScrollView>

                        <InfoList {...this.props}/>

                        {
                            // <Deal_tips/>
                            //
                            // <View>
                            //     <HeadTitle title='即时数据'/>
                            //     <BreedCurrentList data={data} {...this.props}/>
                            // </View>
                        }

                        {
                            // <State_view state={data}/>
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({
        breed: state.breed,
    }),
    dispatch => ({
        action: bindActionCreators({...action, ...breed_action}, dispatch),
    })
)(Module)

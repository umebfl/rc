import React from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
} from 'react-native'

import {
    Card,
    WhiteSpace,
    Icon,
    Grid,
    Steps,
    List,
    Tag,
} from '@ant-design/react-native'

import occupational_system from './data/职业体系'
import element from './data/元素'
import idea from './data/理念'
import annual_account from './data/年度结算'
import target from './data/目标'
import book from './data/典籍'
import flow from './data/流程'
import strategy from './data/交易策略'
import capital from './data/资金分配'

const App: () => React$Node = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='交易系统'
                        thumb={<Icon name='safety' size='md' color='black'/>}/>
                    <Card.Body>
                        <View style={{ height: 42 }}>

                        </View>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='规则'
                        thumb={<Icon name='bank' size='md' color='black'/>}/>
                    <Card.Body>
                        <View style={{ height: 42 }}>

                        </View>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='交易策略'
                        thumb={<Icon name='insurance' size='md' color='black'/>}/>
                    <Card.Body style={{borderColor: 'white'}}>
                        <List>
                            {
                                R.map(
                                    v => (
                                        <List.Item wrap={true}>
                                            <Text>{v.text}</Text>
                                        </List.Item>
                                    )
                                )(strategy)
                            }
                        </List>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='交易流程'
                        thumb={<Icon name='thunderbolt' size='md' color='black'/>}/>
                    <Card.Body>
                        <View style={{ marginLeft: 16, marginTop: 35 }}>
                            <Steps size='small' current={flow.length}>
                                {
                                    R.map(
                                        v => <Steps.Step title={v.text} description={<Text style={{fontSize: 12, marginRight: 30}}>{v.msg}</Text>}/>
                                    )(flow)
                                }
                            </Steps>
                        </View>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='理念'
                        thumb={<Icon name='reddit' size='md' color='black'/>}/>
                    <Card.Body style={{borderColor: 'white'}}>
                        <List>
                            {
                                R.map(
                                    v => (
                                        <List.Item wrap={true}>
                                            <Text>{v.content}</Text>
                                            <View style={{flexDirection: 'row-reverse', marginTop: 6}}>
                                                {
                                                    R.map(
                                                        v => <Tag small selected style={{marginRight: 4}}>{v}</Tag>
                                                    )(v.type)
                                                }
                                            </View>
                                        </List.Item>
                                    )
                                )(idea)
                            }
                        </List>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='元素'
                        thumb={<Icon name='deployment-unit' size='md' color='black'/>}/>
                    <Card.Body>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                R.map(
                                    v => <Text style={{ margin: 6, }}>{v}</Text>
                                )(element)
                            }
                        </View>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='资金分配'
                        thumb={<Icon name='transaction' size='md' color='black'/>}/>
                    <Card.Body style={{borderColor: 'white'}}>
                        <List>
                            {
                                R.map(
                                    v => (
                                        <List.Item wrap={true} extra={<View><List.Item.Brief>{v.msg}</List.Item.Brief></View>}>
                                            <Text>{v.type}</Text>
                                        </List.Item>
                                    )
                                )(capital)
                            }
                        </List>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='目标'
                        thumb={<Icon name='star' size='md' color='black'/>}/>
                    <Card.Body>
                        <View style={{ marginLeft: 16, marginTop: 35 }}>
                            <Steps size='small' current={R.reduce((a, b) => a + (b.finish ? 1 : 0), -1)(target)}>
                                {
                                    R.map(
                                        v => (
                                            <Steps.Step title={v.msg} description={
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text>{v.money}</Text>
                                                    <Text style={{color: '#108EE9', fontSize: 12, marginTop: 4}}>{v.finish ? v.time : null}</Text>
                                                </View>
                                            }/>
                                        )
                                    )(target)
                                }
                            </Steps>
                        </View>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='职业体系'
                        thumb={<Icon name='sketch' size='md' color='black'/>}/>
                    <Card.Body>
                        <View style={{ marginLeft: 16, marginTop: 35 }} >
                            <Steps size='small' current={0}>
                                {
                                    R.map(
                                        v => <Steps.Step title={v.title} description={<Text>{`${v.target_cn} ${v.leader || ''}`}</Text>}/>
                                    )(occupational_system.lv)
                                }
                            </Steps>
                        </View>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='典籍'
                        thumb={<Icon name='trophy' size='md' color='black'/>}/>
                    <Card.Body style={{borderColor: 'white'}}>
                        <List>
                            {
                                R.map(
                                    v => (
                                        <List.Item wrap={true} extra={<View><List.Item.Brief>{v.author}</List.Item.Brief></View>}>
                                            <Text>{v.name}</Text>
                                        </List.Item>
                                    )
                                )(book)
                            }
                        </List>
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <Card full style={{borderColor: 'white'}}>
                    <Card.Header
                        title='年度结算'
                        thumb={<Icon name='trophy' size='md' color='black'/>}/>
                    <Card.Body>
                        {
                            R.map(
                                v => <Text style={{ marginLeft: 16 }}>{v.date} | {v.msg}</Text>
                            )(annual_account)
                        }
                    </Card.Body>
                </Card>
                <WhiteSpace size='lg'/>
                <View style={{height: 100, alignItems: 'center'}}>
                    <Icon name='property-safety' size='md' color='black'/><Text style={{color: 'black', fontSize: 12, marginTop: 4}}>{occupational_system.core}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default App


// const bg = require('./pic/bg.jpg')
// <ImageBackground style={style.bg} source={bg}></ImageBackground>

// <SafeAreaView>
//     <ScrollView>
//         <View style={style.block}>
//             <Text style={style.block_title}>交易系统</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>规则</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>交易策略</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>理念</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>交易流程</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>典籍</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>元素</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>职业体系</Text>
//         </View>
//         <View style={style.block}>
//             <Text style={style.block_title}>年度结算</Text>
//         </View>
//     </ScrollView>
// </SafeAreaView>

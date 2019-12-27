import React, { Component } from 'react'
import * as R from 'ramda'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
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

import _occupational_system from './data/职业体系'
import _element from './data/元素'
import _idea from './data/理念'
import _annual_account from './data/年度结算'
import _target from './data/目标'
import _book from './data/典籍'
import _flow from './data/流程'
import _rule from './data/规则'
import _capital from './data/资金分配'

export default class App extends Component {

    state = {
        occupational_system: _occupational_system,
        element: _element,
        idea: _idea,
        annual_account: _annual_account,
        target: _target,
        book: _book,
        flow: _flow,
        rule: _rule,
        capital: _capital,

        modal_edit: {
            visible: false,
            node: null,
            val: null,
        },
    }

    handle_modal_edit_change(val) {
        this.setState({
            modal_edit: {
                ...this.state.modal_edit,
                val,
            }
        })
    }

    handle_modal_edit_save() {

        try {
          this.setState({
              [this.state.modal_edit.node]: JSON.parse(this.state.modal_edit.val),
              modal_edit: {
                  visible: false,
                  node: null,
                  val: null,
              }
          })
        } catch (e) {
            Toast.fail('格式有误！')
        }

    }

    handle_modal_edit_open(node) {
        this.setState({
            modal_edit: {
                visible: true,
                node,
                val: JSON.stringify(this.state[node], null, 4),
            }
        })
    }

    handle_modal_edit_close() {
        this.setState({
            modal_edit: {
                visible: false,
                node: null,
                val: null,
            }
        })
    }

    render() {
        return (
            <Provider>
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
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('rule')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='bank' size='md' color='black'/>}/>
                            <Card.Body style={{borderColor: 'white'}}>
                                {
                                    R.map(
                                        v => (
                                            <List renderHeader={v.node}>
                                                {
                                                    R.map(
                                                        v => (
                                                            <List.Item wrap={true}>
                                                                <Text>{v.text}</Text>
                                                                <View style={{flexDirection: 'row-reverse', marginTop: 6}}>
                                                                    <Tag small selected style={{marginRight: 4}}>{v.key}</Tag>
                                                                </View>
                                                            </List.Item>
                                                        )
                                                    )(v.rule)
                                                }
                                            </List>
                                        )
                                    )(this.state.rule)
                                }
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='交易流程'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('flow')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='thunderbolt' size='md' color='black'/>}/>
                            <Card.Body>
                                <View style={{ marginLeft: 16, marginTop: 35 }}>
                                    <Steps size='small' current={this.state.flow.length}>
                                        {
                                            R.map(
                                                v => <Steps.Step title={v.text} description={<Text style={{fontSize: 12, marginRight: 30}}>{v.msg}</Text>}/>
                                            )(this.state.flow)
                                        }
                                    </Steps>
                                </View>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='理念'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('idea')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
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
                                        )(this.state.idea)
                                    }
                                </List>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='元素'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('element')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='deployment-unit' size='md' color='black'/>}/>
                            <Card.Body>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {
                                        R.map(
                                            v => <Text style={{ margin: 6, }}>{v}</Text>
                                        )(this.state.element)
                                    }
                                </View>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='资金分配'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('capital')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
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
                                        )(this.state.capital)
                                    }
                                </List>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='目标'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('target')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='star' size='md' color='black'/>}/>
                            <Card.Body>
                                <View style={{ marginLeft: 16, marginTop: 35 }}>
                                    <Steps size='small' current={R.reduce((a, b) => a + (b.finish ? 1 : 0), -1)(this.state.target)}>
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
                                            )(this.state.target)
                                        }
                                    </Steps>
                                </View>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='职业体系'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('occupational_system')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='sketch' size='md' color='black'/>}/>
                            <Card.Body>
                                <View style={{ marginLeft: 16, marginTop: 35 }} >
                                    <Steps size='small' current={0}>
                                        {
                                            R.map(
                                                v => <Steps.Step title={v.title} description={<Text>{`${v.target_cn} ${v.leader || ''}`}</Text>}/>
                                            )(this.state.occupational_system.lv)
                                        }
                                    </Steps>
                                </View>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='典籍'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('book')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='read' size='md' color='black'/>}/>
                            <Card.Body style={{borderColor: 'white'}}>
                                <List>
                                    {
                                        R.map(
                                            v => (
                                                <List.Item wrap={true} extra={<View><List.Item.Brief>{v.author}</List.Item.Brief></View>}>
                                                    <Text>{v.name}</Text>
                                                </List.Item>
                                            )
                                        )(this.state.book)
                                    }
                                </List>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <Card full style={{borderColor: 'white'}}>
                            <Card.Header
                                title='年度结算'
                                extra={
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <TouchableOpacity style={{padding: 4}} onPress={() => this.handle_modal_edit_open('annual_account')}>
                                            <Icon name='edit' size='md' color='#BBB'/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                thumb={<Icon name='trophy' size='md' color='black'/>}/>
                            <Card.Body>
                                {
                                    R.map(
                                        v => <Text style={{ marginLeft: 16 }}>{v.date} | {v.msg}</Text>
                                    )(this.state.annual_account)
                                }
                            </Card.Body>
                        </Card>
                        <WhiteSpace size='lg'/>
                        <View style={{height: 100, alignItems: 'center'}}>
                            <Icon name='property-safety' size='md' color='black'/><Text style={{color: 'black', fontSize: 12, marginTop: 4}}>{this.state.occupational_system.core}</Text>
                        </View>


                        {/* Modal */}

                        <Modal
                            visible={this.state.modal_edit.visible}
                            animationType='slide-up'
                            // transparent={true}
                            // footer={[
                            //     {text: '取消', onPress: () => this.handle_modal_edit_close()},
                            //     {text: '保存', onPress: () => this.handle_modal_edit_save()},
                            // ]}
                            onClose={() => this.handle_modal_edit_close()}>

                            <View style={{flexDirection: 'column'}}>
                                <TextareaItem rows={4} style={{height: 300, fontSize: 10,}} onChange={val => this.handle_modal_edit_change(val)} value={this.state.modal_edit.val}/>

                                <View style={{flexDirection: 'row',}}>
                                    <Button style={{flex: 1, borderColor: 'white'}} onPress={() => this.handle_modal_edit_close()}>取消</Button>
                                    <Button style={{flex: 1, backgroundColor: '#1890ff', borderRadius: 0}} type='primary' onPress={() => this.handle_modal_edit_save()}>保存</Button>
                                </View>
                            </View>
                        </Modal>

                    </ScrollView>
                </SafeAreaView>
            </Provider>
        )
    }
}



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

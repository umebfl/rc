import React from 'react'

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TabBarIOS,
} from 'react-native'

import style from './style'

const App: () => React$Node = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={style.block}>
                    <Text style={style.block_title}>交易系统</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>规则</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>交易策略</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>理念</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>交易流程</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>典籍</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>元素</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>职业体系</Text>
                </View>
                <View style={style.block}>
                    <Text style={style.block_title}>年度结算</Text>
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

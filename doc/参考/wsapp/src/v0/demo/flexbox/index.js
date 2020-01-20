import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class wsapp extends Component {
  render() {
    return (
        <View style={style.container}>
            <View style={[style.fx_sub, style.fx_dir]}>
                <View style={style.fx_item}></View>
                <View style={[style.fx_item, style.fx_item_2]}></View>
                <View style={[style.fx_item, style.fx_item_1]}></View>
            </View>

            <View style={[style.fx_sub, style.fx_wrap]}>
                <View style={[style.fx_item, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_wx]}></View>
            </View>

            <View style={[style.fx_sub, style.fx_justify]}>
                <View style={[style.fx_item, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_wx]}></View>
            </View>

            <View style={[style.fx_sub, style.fx_alignItems]}>
                <View style={[style.fx_item, style.fx_item_wx, style.fx_item_hauto]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx, style.fx_item_hx]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx, style.fx_item_hx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_wx, style.fx_item_hx]}></View>
            </View>

            <View style={[style.fx_sub, style.fx_align_content]}>
                <View style={[style.fx_item, style.fx_item_wx, style.fx_item_hauto]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx, style.fx_item_hx]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx, style.fx_item_hx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_wx, style.fx_item_hx]}></View>
            </View>

            <View style={[style.fx_sub, style.fx_alignItems]}>
                <View style={[style.fx_item, style.fx_item_wx, style.fx_item_hauto]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx, style.fx_item_hx]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx, style.fx_align_self_item]}>
                    <Text>123</Text>
                </View>
                <View style={[style.fx_item, style.fx_item_2, style.fx_item_wx, style.fx_item_hx]}></View>
                <View style={[style.fx_item, style.fx_item_1, style.fx_item_wx]}></View>
                <View style={[style.fx_item, style.fx_item_wx, style.fx_item_hx]}></View>
            </View>
        </View>
    );
  }
}


// flex-flow flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
// justify-content
// align-items
// align-content
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    fx_sub: {
        marginBottom: 20,
    },
    fx_dir: {
        // 排列方向： flex-direction
        // flexDirection: 'row',   // 水平排列
        // flexDirection: 'row-reverse',   // 水平反转排列
        // flexDirection: 'column',   // 垂直排列
        flexDirection: 'column-reverse',   // 垂直反转排列
    },

    fx_wrap: {
        flexDirection: 'row',
        // 换行方式： flex-wrap
        // flexWrap: 'nowrap', // 不换行
        flexWrap: 'wrap',   // 换行，第一行在上方
        // flexWrap: 'wrap-reverse',    // 不支持
    },
    fx_justify: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // 定义主轴上的对齐方式: justify-content
        // justifyContent: 'flex-start',   // 元素左对齐
        // justifyContent: 'flex-end',   // 元素右对齐
        // justifyContent: 'center',   // 元素居中对齐
        // justifyContent: 'space-between',   // 两端对齐，元素之间的间隔相等
        justifyContent: 'space-around',   // 每个元素两侧的间隔相等
    },
    fx_alignItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // 垂直对齐方式：align-items
        // align-items: flex-start | flex-end | center | baseline | stretch;
        // alignItems: 'flex-start',   // 顶部对齐
        // alignItems: 'flex-end',   // 底部对齐
        // alignItems: 'center',   // 居中对齐
        // alignItems: 'baseline',   // 第一行文字的基线对齐
        alignItems: 'stretch',   // 如果元素未设置高度或设为auto，将占满整个容器的高度
    },
    fx_align_content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // 定义多根轴线的对齐方式: alignContent 如果项目只有一根轴线，该属性不起作用。?
        // alignContent: 'flex-start',
        alignContent: 'center',
        // align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    },

    fx_align_self: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // 排列顺序
    },
    fx_align_self_item: {
        // 属性允许单个元素有与其他元素不一样的对齐方式，可覆盖align-items属性
        alignSelf: 'center',
    },

    fx_item: {
        width: 30,
        height: 30,
        backgroundColor: '#333',
    },
    fx_item_wx: {
        width: 100,
    },
    fx_item_hx: {
        height: 50,
    },
    fx_item_hauto: {
        height: 'auto',
    },
    fx_item_2: {
        backgroundColor: '#222',
    },
    fx_item_1: {
        backgroundColor: '#111',
    },
})

export default wsapp

import React, { Component } from 'react'

import {
  Animated,
  Text,
} from 'react-native'

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    // Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

class wsapp extends Component {

    constructor(prop) {
        super(prop)

        this.state = {
          fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
        }

        // requestAnimationFrame(() => {
        // })
    }

    componentDidMount() {
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            {
              toValue: 1,                             // 透明度最终变为1，即完全不透明
            }
        ).start();                                  // 开始执行动画
    }

    render() {
        console.log(this.state.fadeAnim.toString())
        return (
            <Animated.View                            // 可动画化的视图组件
              style={{
                ...this.props.style,
                opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
              }}
            >
              <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
            </Animated.View>
        )
    }

    // <Svg
    //     width="1000"
    //     height="1000"
    // >
    //     <Circle
    //         cx="50"
    //         cy="50"
    //         r="45"
    //         stroke="blue"
    //         strokeWidth="2.5"
    //         fill="green"
    //     />
    //     <Rect
    //         x="15"
    //         y="15"
    //         width="70"
    //         height="70"
    //         stroke="red"
    //         strokeWidth="2"
    //         fill="yellow"
    //     />
    // </Svg>
}

export default wsapp

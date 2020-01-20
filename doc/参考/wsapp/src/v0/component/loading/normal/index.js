/*


TODO:
1. 100ms的渐现效果

*/
import React, { Component } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  // Animated,
  // Easing,
} from 'react-native'
// import {
//     TextLoader,
//     // BubblesLoader,
//     // PulseLoader,
//     // DotsLoader,
//     CirclesLoader,
//     // BreathingLoader,
//     // RippleLoader,
//     // LinesLoader,
//     // MusicBarLoader,
//     // EatBeanLoader,
//     // DoubleCircleLoader,
//     // RotationCircleLoader,
//     // RotationHoleLoader,
//     // CirclesRotationScaleLoader,
//     // NineCubesLoader,
//     // LineDotsLoader,
//     // ColorDotsLoader,
// } from 'react-native-indicator'
import {
    COLOR_MAIN,
    COLOR_GRAY,
    ZINDEX_FETCH_LOADING,
    SCREEN_WIDTH,
    N_5,
    N_10,
    N_12,
    N_14,
    N_20,
    N_25,
    N_40,
    N_100,
    OFFSET_HIDDEN,
} from '../../../theme/ume-theme/variable.js'

class Normal_loading extends Component {

    render() {
        const {
            visiable,
        } = this.props

        return visiable
            ? <View
                style={{
                    position: 'absolute',
                    zIndex: ZINDEX_FETCH_LOADING,
                    // left: visiable ? SCREEN_WIDTH / 2 - N_25 - N_20 : OFFSET_HIDDEN,
                    left: SCREEN_WIDTH / 2 - N_10,
                    top: 80,
                    // backgroundColor: 'rgba(255, 255, 255, .5)',
                    // backgroundColor: 'rgba(0, 0, 0, .5)',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator
                      animating={true}
                      color={COLOR_MAIN}
                      size='small'/>
                    {
                        // <View style={{
                        //     // marginTop: N_10,
                        // }}>
                        //     <Text style={{
                        //         color: 'white',
                        //         fontSize: N_12,
                        //     }}>加载中...</Text>
                        //     {
                        //         //     <TextLoader text='加载中' textStyle={{
                        //         //         color: 'white',
                        //         //         fontSize: N_12,
                        //         //     }}/>
                        //     }
                        // </View>
                    }
            </View>
            : null
    }
}

export default Normal_loading

import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Button from '../normal'
import Spinner from '../../../loading/spinner'

import {
    COLOR_MAIN,
    N_50,
} from '../../../../theme/ume-theme/variable.js'

// import {
//     // TextLoader,
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

export default class Loading_button extends Component {
    render() {
        const {
            loading,
        } = this.props

        return (
            <Button {...this.props}>
                {
                    loading
                    ? <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Spinner color='white'/>
                    </View>
                    : null
                }
            </Button>
        )
    }
}

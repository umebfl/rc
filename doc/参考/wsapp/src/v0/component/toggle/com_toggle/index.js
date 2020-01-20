import R from 'ramda'
import React, {Component, ProTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'

import style from './style'

import {component_toggle} from './reducer.js'

import SRC_GD1 from '../../../../../content/img/icon_comment/good1.png'
import SRC_GD2 from '../../../../../content/img/icon_comment/good2.png'
import SRC_GD3 from '../../../../../content/img/icon_comment/good3.png'
import SRC_GD4 from '../../../../../content/img/icon_comment/good4.png'
import SRC_GD5 from '../../../../../content/img/icon_comment/good5.png'
import SRC_GD1_ACTIVE from '../../../../../content/img/icon_comment/good1_active.png'
import SRC_GD2_ACTIVE from '../../../../../content/img/icon_comment/good2_active.png'
import SRC_GD3_ACTIVE from '../../../../../content/img/icon_comment/good3_active.png'
import SRC_GD4_ACTIVE from '../../../../../content/img/icon_comment/good4_active.png'
import SRC_GD5_ACTIVE from '../../../../../content/img/icon_comment/good5_active.png'

import {
    CEO_TYPE
} from '../../../reducer/user/role'

import {
    ABS_d5,
    N_1,
    N_2,
    N_5,
    N_6,
    N_10,
    N_12,
    N_16,
    N_18,
    N_20,
    N_30,
    COLOR_GRAY_XD,
    COLOR_GRAY_D,
    COLOR_GRAY,
    COLOR_GRAY_L,
    COLOR_GRAY_XL,
    COLOR_BLUE,
    COLOR_RED_XL,
    BAD_COLOR,
    NORMAL_COLOR,
    GOOD_COLOR,
    GRADE_COLOR,

    SO_BAD_COLOR_BG,
    BAD_COLOR_BG,
    NORMAL_COLOR_BG,
    GOOD_COLOR_BG,
    GRADE_COLOR_BG,
} from '../../../theme/ume-theme/variable.js'

const ColorToggle = R.cond([
    [
        R.equals(1),
        R.always(COLOR_RED_XL),
    ],
    [
        R.equals(2),
        R.always(BAD_COLOR),
    ],
    [
        R.equals(3),
        R.always(NORMAL_COLOR),
    ],
    [
        R.equals(4),
        R.always(GOOD_COLOR),
    ],
    [
        R.equals(5),
        R.always(GRADE_COLOR),
    ],
])

class Com_toggle extends Component {
    constructor(prop) {
      super(prop)

      this.state = {
          value: '',
      }

    //   prop.role.type === CEO_TYPE ? prop.action.component_toggle(null) : prop.action.component_toggle(3)
    }

    handle_toggle(v) {

        this.props.action.component_toggle(this.props.toggle.change === v ? null : v)

        if((this.props.toggle.change !== v && v === 1) || (this.props.toggle.change !== v && v === 5)){
            toast(this.props.i18n.t.the_evaluation_will_be_sent_to_blog, {position: 0})
        }

    }


    render() {
        const {
            i18n: {
                t,
            },
            role: {
                type,
            },
            content_style,
            text,
            toggle: {
                change
            },
            src_img,
            src_img_bg,
            show_image_double,
            num,
        } = this.props

        return(
            <TouchableWithoutFeedback
                onPress={this.handle_toggle.bind(this, num)}>
                <View style={{
                    alignItems: 'center',
                    paddingTop: 3,
                    paddingBottom: N_2,
                    // paddingRight: N_2,
                    // paddingLeft: N_2,
                    borderWidth: N_1,
                    borderColor: change === num ? ColorToggle(change) : COLOR_GRAY_XL,
                    borderRadius: N_5,
                    backgroundColor: change === num ? ColorToggle(change) : null,
                }}>

                    <View  style={{
                        flexDirection: 'row',
                    }}>
                        {
                            change === num
                                ? <Image source={src_img_bg} style={style.img_style}/>
                                : <Image source={src_img} style={style.img_style}/>
                        }

                    </View>

                    <View style={{
                        paddingTop: N_2,
                        paddingBottom: 4,
                        paddingLeft: N_5,
                        paddingRight: N_5,
                        // backgroundColor: change === num ? backgroundColorToggle(change) : COLOR_GRAY_XL,
                        borderRadius: N_10,
                    }}>
                        <Text style={{
                            color: change === num ? 'white' : COLOR_GRAY_L,
                            fontSize: N_12,
                        }}>
                            {text}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

export default connect(
    state => ({
        toggle: state.Component_toggle,
        info: state.User_info,
        i18n: state.I18n,
        role: state.User_role,
    }),
    dispatch => ({
        action: bindActionCreators({component_toggle}, dispatch),
    })
)(Com_toggle)

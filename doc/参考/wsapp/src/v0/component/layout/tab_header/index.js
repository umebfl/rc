import React from 'react'
import createReactClass from 'create-react-class';
// import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'

import * as variable from '../../../theme/ume-theme/variable.js'

const FONT_SIZE = variable.N_16

const FacebookTabBar = createReactClass({
    displayName: 'FacebookTabBar',
    tabIcons: [],

    // PropTypes: {
    //   goToPage: PropTypes.func,
    //   activeTab: PropTypes.number,
    //   tabs: PropTypes.array,
    // },

    getInitialState: function() {
        return {
            bottom_line_left: this.get_bottom_line_left(0),
        }
    },

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue)

    },

    get_bottom_line_width() {
        return 2 * FONT_SIZE
    },

    get_bottom_line_left(v) {
        const item_width = variable.SCREEN_WIDTH / this.props.tabs.length
        return item_width * v + item_width / 2 - this.get_bottom_line_width() / 2
    },

    setAnimationValue({value}) {
        this.setState({
            ...this.state,
            bottom_line_left: this.get_bottom_line_left(value),
        })

        // this.tabIcons.forEach((icon, i) => {
        //     const progress = Math.min(1, Math.abs(value - i))
        //     icon.setNativeProps({
        //         style: {
        //             color: this.iconColor(progress),
        //         },
        //     })
        // })
    },

    //color between rgb(59,89,152) and rgb(204,204,204)
    // iconColor(progress) {
    //     const red = 59 + (204 - 59) * progress
    //     const green = 89 + (204 - 89) * progress
    //     const blue = 152 + (204 - 152) * progress
    //     return `rgb(${red}, ${green}, ${blue})`
    // },

    // <Icon
    //   name={tab}
    //   size={30}
    //   ref={(icon) => { this.tabIcons[i] = icon }}
    // />

    render() {
        return <View style={[styles.tabs, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => {
            return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Text style={{
                    fontSize: FONT_SIZE,
                    color: this.props.activeTab === i
                            ? this.props.tabs.length === 1
                                ? variable.COLOR_GRAY_XD
                                : variable.COLOR_MAIN
                            : variable.COLOR_GRAY,
                }}>{tab}</Text>
            </TouchableOpacity>
          })}

          <Animated.View style={{
              position: 'absolute',
              left: this.state.bottom_line_left,
              bottom: 0,
              width: this.get_bottom_line_width(),
              height: this.props.tabs.length === 1 ? 0 : variable.N_4,
              marginTop: variable.N_5,
              backgroundColor: variable.COLOR_MAIN,
          }}/>
        </View>
    },
})

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: variable.STATUSBAR_FILLUP_HEIGHT + 5,
    },
    tabs: {
        justifyContent: 'space-around',
        height: variable.HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: variable.ABS_d66,
        borderBottomColor: variable.BORDER_COLOR,
    },
})

export default FacebookTabBar

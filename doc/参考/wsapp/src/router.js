import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, Platform, Dimensions} from 'react-native'

import {StackNavigator} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

import Loader from './loader'

import Login from './v0/view/login'
// import Home_ios from './v0/view/home/index_ios.js'
// import Home_android from './v0/view/home/index_android.js'
import Home_drawer from './v0/view/home/drawer.js'
import Home_me_info from './v0/view/home/me/info'
import Home_me_info_avatar from './v0/view/home/me/info/avatar'
import Home_me_setting from './v0/view/home/me/setting'
import Home_me_setting_feedback from './v0/view/home/me/setting/feedback'
// import Home_me_setting_update from './v0/view/home/me/setting/update'
import Home_me_duty from './v0/view/home/me/duty'
import Home_me_follows from './v0/view/home/me/follows'
import Home_me_follows_request from './v0/view/home/me/follows/request'
import Home_me_follows_search from './v0/view/home/me/follows/search'
import Home_me_follows_history from './v0/view/home/me/follows/history'
import Home_me_fans from './v0/view/home/me/fans'
import Home_me_fans_request from './v0/view/home/me/fans/request'
import Home_me_fans_search from './v0/view/home/me/fans/search'
import Home_me_fans_history from './v0/view/home/me/fans/history'

import Home_more from './v0/view/home/more'
import Home_more_addressbook from './v0/view/home/more/addressbook'
import Home_more_addressbook_personal_details from './v0/view/home/more/addressbook/personal_details'
import Home_more_addressbook_search from './v0/view/home/more/addressbook/search'

import Home_more_field from './v0/view/home/more/field'
import Home_more_field_diary from './v0/view/home/more/field/diary'
import Home_more_field_keep_diary from './v0/view/home/more/field/keep_diary'
import Home_more_oa from './v0/view/home/more/oa'

import Home_dynamic_billboard from './v0/view/home/dynamic/billboard'
import Home_dynamic_billboard_detail from './v0/view/home/dynamic/billboard/detail'
// import Home_dynamic_billboard_m_comment from './v0/view/home/dynamic/billboard/m_comment'

import Home_diary_my_comment from './v0/view/home/diary/my_comment'
import Home_diary_diary_tab from './v0/view/home/diary/diary_tab'
import Home_diary_diary_content from './v0/view/home/diary/diary_content'
import Home_diary_me from './v0/view/home/diary/me'
import Home_diary_more from './v0/view/home/diary/more'

import Home_dynamic_notice_detail from './v0/view/home/dynamic/notice/detail'
import Home_dynamic_todo_detail from './v0/view/home/dynamic/todo/detail'
import Home_dynamic_notice from './v0/view/home/dynamic/notice'
import Home_dynamic_todo from './v0/view/home/dynamic/todo'
//
import Home_homepage_message from './v0/view/home/homepage/message'
// import Home_homepage_todo from './v0/view/home/homepage/todo'
// import Home_homepage_todo_detail from './v0/view/home/homepage/todo/detail'
// import Home_homepage_billboard from './v0/view/home/homepage/billboard'
// import Home_homepage_billboard_detail from './v0/view/home/homepage/billboard/detail'

const device_width = Dimensions.get('window').width

// const home_router = StackNavigator({
//
// }, {
//     initialRouteName: 'home',
//     headerMode: 'none',
//     // 安卓侧滑支持
//     transitionConfig: () => ({
//         screenInterpolator: CardStackStyleInterpolator.forHorizontal,
//     }),
// })

// const home_more_router = DrawerNavigator({
//     home_router: {
//         screen: home_router,
//     },
// }, {
//     drawerWidth: device_width * .8,
//     initialRouteName: 'home_router',
//     contentComponent: props => <Home_more {...props}/>,
// })

const root = StackNavigator({

    loader: {
        screen: Loader,
        navigationOptions: {
            // 是否支持滑动返回收拾
            gesturesEnabled: false,
        },
    },

    login: {
        screen: Login,
        navigationOptions: {
            // 是否支持滑动返回收拾
            gesturesEnabled: false,
        },
    },
    home: {
        // screen: Platform.OS !== 'ios' ? Home_android : Home_ios,
        screen: Home_drawer,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_info: {
        screen: Home_me_info,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_info_avatar: {
        screen: Home_me_info_avatar,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_setting: {
        screen: Home_me_setting,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'setting'
    },
    home_me_setting_feedback: {
        screen: Home_me_setting_feedback,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'me/setting/feedback'
    },
    // home_me_setting_update: {
    //     screen: Home_me_setting_update,
    //     navigationOptions: {
    //         gesturesEnabled: true,
    //     },
    // },
    home_me_duty: {
        screen: Home_me_duty,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'me/duty'
    },
    home_me_follows: {
        screen: Home_me_follows,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'me/follows'
    },
    home_me_follows_request: {
        screen: Home_me_follows_request,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_follows_search: {
        screen: Home_me_follows_search,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_follows_history: {
        screen: Home_me_follows_history,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_fans: {
        screen: Home_me_fans,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'me/fans'
    },
    home_me_fans_request: {
        screen: Home_me_fans_request,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_fans_search: {
        screen: Home_me_fans_search,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_me_fans_history: {
        screen: Home_me_fans_history,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_more_addressbook: {
      　screen: Home_more_addressbook,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'more/addressbook'
    },
    home_more_addressbook_personal_details: {
      　screen: Home_more_addressbook_personal_details,
        navigationOptions: {
          gesturesEnabled: true,
        },
    },
    home_more_addressbook_search: {
      　screen: Home_more_addressbook_search,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_more_field: {
      　screen: Home_more_field,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_more_field_diary: {
        screen: Home_more_field_diary,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_more_field_keep_diary: {
        screen: Home_more_field_keep_diary,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_more_oa: {
        screen: Home_more_oa,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'more/oa'
    },

    home_dynamic_billboard: {
        screen: Home_dynamic_billboard,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_dynamic_billboard_detail: {
        screen: Home_dynamic_billboard_detail,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    // home_dynamic_billboard_m_comment: {
    //     screen: Home_dynamic_billboard_m_comment,
    //     navigationOptions: {
    //         gesturesEnabled: true,
    //     },
    // },
    home_diary_my_comment: {
        screen: Home_diary_my_comment,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_diary_diary_tab: {
        screen: Home_diary_diary_tab,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'diary/detail/:id/:type'
    },
    home_diary_diary_content: {
        screen: Home_diary_diary_content,
        navigationOptions: {
            gesturesEnabled: true,
        },
        path:'diary/detail/:id/:type'
    },
    home_diary_me: {
        screen: Home_diary_me,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_diary_more: {
        screen: Home_diary_more,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_dynamic_notice_detail: {
        screen: Home_dynamic_notice_detail,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_dynamic_todo_detail: {
        screen: Home_dynamic_todo_detail,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_dynamic_notice: {
        screen: Home_dynamic_notice,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    home_dynamic_todo: {
        screen: Home_dynamic_todo,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },

    home_homepage_message: {
        screen: Home_homepage_message,
        navigationOptions: {
            gesturesEnabled: true,
        },
    },
    // home_homepage_todo: {
    //     screen: Home_homepage_todo,
    //     navigationOptions: {
    //         gesturesEnabled: true,
    //     },
    // },

    // home_homepage_todo_detail: {
    //     screen: Home_homepage_todo_detail,
    //     navigationOptions: {
    //         gesturesEnabled: true,
    //     },
    // },
    // home_homepage_billboard: {
    //     screen: Home_homepage_billboard,
    //     navigationOptions: {
    //         gesturesEnabled: true,
    //     },
    // },
    // home_homepage_billboard_detail: {
    //     screen: Home_homepage_billboard_detail,
    //     navigationOptions: {
    //         gesturesEnabled: true,
    //     },
    // },
}, {
    initialRouteName: 'loader',
    // 移除头部
    headerMode: 'none',
    // modal 上推、 card 侧滑
    // mode: 'modal',

    // TODO: 实现fade进入
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        // screenInterpolator: props => {
        //     const {layout, position, scene} = props
        //
        //     const index = scene.index
        //     const inputRange = [index - 1, index, index + 0.99, index + 1]
        //
        //     const opacity = position.interpolate({
        //         inputRange,
        //         outputRange: ([0, 1, 1, 0]),
        //     })
        //
        //     const translateX = 0;
        //     const translateY = position.interpolate({
        //         inputRange,
        //         outputRange: ([0, 0, 0, 0]),
        //     })
        //
        //     return {
        //         opacity,
        //         transform: [{translateX}, {translateY}],
        //     }
        // }
    }),
})

export default root

// class App extends React.Component {
//     render() {
//         const {
//             auth,
//         } = this.props
//
//         return (
//             <root/>
//         )
//     }
// }
//
// export default connect(
//     state => ({
//         auth: state.Auth,
//     }),
// )(App)

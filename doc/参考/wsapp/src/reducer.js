import {combineReducers} from 'redux'
// import {routerReducer} from 'react-router-redux'

import {
    AUTH_SIGNOUT,
} from './v0/reducer/auth'

// import App from './v0/view/app/reducer.js'
import Login from './v0/view/login/reducer.js'
import Home from './v0/view/home/reducer.js'
import Rank_list from './v0/view/home/dynamic/billboard/reducer.js'
import Rank_list_detail from './v0/view/home/dynamic/billboard/detail/reducer.js'
import Homepage from './v0/view/home/homepage/reducer.js'
import Home_more_field from './v0/view/home/more/field/reducer.js'
import Home_more_field_diary from './v0/view/home/more/field/diary/reducer.js'
import Home_more_field_keep_diary from './v0/view/home/more/field/keep_diary/reducer.js'
import Home_more_field_keep_diary_feel from './v0/view/home/more/field/keep_diary/feel/reducer.js'
import Home_me_setting_feedback_type from './v0/view/home/me/setting/feedback/reducer.js'
import Users_contacts from './v0/view/home/more/addressbook/reducer.js'
import Users_contacts_search from './v0/view/home/more/addressbook/search/reducer.js'
import Dynamic_todo from './v0/view/home/dynamic/todo/reducer.js'
import Dynamic_notice from './v0/view/home/dynamic/notice/reducer.js'
import Homepage_message from './v0/view/home/homepage/message/reducer.js'
// import Diary_manager from './v0/view/home/diary/manager/reducer.js'
// import Diary_manager_filter from './v0/view/home/diary/manager/reducer_filter.js'
// import Diary_favorite from './v0/view/home/diary/favorite/reducer.js'
import Diary_more from './v0/view/home/diary/more/reducer.js'
import Diary_staff from './v0/view/home/diary/staff/reducer.js'
import Diary_me from './v0/view/home/diary/me/reducer.js'
import Diary_tab from './v0/view/home/diary/diary_tab/reducer.js'
import Diary_content from './v0/view/home/diary/diary_content/reducer.js'

// Component
import I18n from './v0/reducer/i18n/reducer.js'
import Component_toggle from './v0/component/toggle/com_toggle/reducer.js'

// reducer
import Auth from './v0/reducer/auth/index.js'
import User_info from './v0/reducer/user/info/index.js'
import User_role from './v0/reducer/user/role/index.js'

import User_duty from './v0/reducer/user/duty/index.js'
import User_follows from './v0/reducer/user/follows/index.js'
import User_fans from './v0/reducer/user/fans/index.js'

// import Test from './v0/view/test/reducer.js'

const app_reducer = combineReducers({
    // view
    Login,
    Home,
    Rank_list,
    Rank_list_detail,
    Homepage,
    Home_more_field,
    Home_more_field_diary,
    Home_more_field_keep_diary,
    Home_more_field_keep_diary_feel,
    Home_me_setting_feedback_type,
    Users_contacts,
    Users_contacts_search,
    Dynamic_todo,
    Dynamic_notice,
    Homepage_message,

    // Diary_manager,
    // Diary_manager_filter,
    // Diary_favorite,
    Diary_staff,
    Diary_more,
    Diary_me,
    Diary_tab,
    Diary_content,

    // component
    I18n,
    Component_toggle,

    // reducer
    Auth,
    User_info,
    User_role,
    User_duty,
    User_follows,
    User_fans,

    // Test,
})

const rootReducer = (state, action) => {

    // 重置store
    if (action.type === AUTH_SIGNOUT) {
        state = undefined
    }

    return app_reducer(state, action)
}

export default rootReducer

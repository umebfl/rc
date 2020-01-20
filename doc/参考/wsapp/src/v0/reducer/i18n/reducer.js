/*

TODO:
* 本地持久化语言类型获取及默认语言设置

FINISH:
* 语言切换
* 格式化支持

*/

import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

import moment from 'moment'
import 'moment/locale/zh-cn'

import {
    set,
} from '../../lib/persist'
import {
    SETTING_LANG,
} from '../../lib/persist/constant'

import resource from './local'
// import {
//     change_tab_label,
// } from '../../view/home/index_ios.js'

const LANG_EN = 'en'
const LANG_ZHCN = 'zh-CN'

const init_state = {
    lang: LANG_ZHCN,
    t: resource[LANG_ZHCN],
}

export const init_lang = createAction('I18N_init_lang')
export const change_lang = createAction('I18N_change_lang')

export default handleActions({

    [init_lang]: (state, {payload}) => {

        let lang = payload

        if(!payload) {
            lang = LANG_ZHCN
        }

        if(lang === LANG_ZHCN) {
            moment.locale('zh-cn')
        } else {
            moment.locale('en')
        }

        set(SETTING_LANG, lang)

        return {
            ...state,
            lang,
            t: resource[lang],
        }
    },

    [change_lang]: (state, {payload}) => {

        let lang = state.lang === LANG_ZHCN ? LANG_EN : LANG_ZHCN

        set(SETTING_LANG, lang)

        if(lang === LANG_ZHCN) {
            moment.locale('zh-cn')
        } else {
            moment.locale('en')
        }
        // change_tab_label()

        return {
            ...state,
            lang,
            t: resource[lang],
        }
    },

}, init_state)

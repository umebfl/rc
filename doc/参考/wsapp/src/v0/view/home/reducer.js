import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

const init_state = {
    view: {
        active: 'me',    // dynamic | diary | share | me
        list: [
            {
                name: 'dynamic',
                text: 'tab_dynamic',
                src: require('../../../../content/img/icon/flash.png'),
                src_active: require('../../../../content/img/icon/flash_1.png'),
            },
            {
                name: 'diary',
                text: 'tab_diary',
                src: require('../../../../content/img/icon/date.png'),
                src_active: require('../../../../content/img/icon/date_1.png'),
            },
            {
                name: 'share',
                text: 'tab_share',
                src: require('../../../../content/img/icon/share.png'),
                src_active: require('../../../../content/img/icon/share_1.png'),
            },
            {
                name: 'me',
                text: 'tab_me',
                src: require('../../../../content/img/icon/account.png'),
                src_active: require('../../../../content/img/icon/account_1.png'),
            },
        ],
    },
}

export const select = createAction('Home_select')

export default handleActions({

    [select]: (state, {payload}) => ({
        ...state,
        view: {
            ...state.view,
            active: payload,
        },
    }),

}, init_state)

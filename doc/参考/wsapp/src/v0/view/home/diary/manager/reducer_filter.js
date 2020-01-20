import R from 'ramda'
import {
    createAction,
    handleActions,
} from 'redux-actions'

const init_state = {
    data: [],
    drawer: {
        dep_data: [],
        active: {
            seq_active: null,
            dep_active: null,
        },
    },
}

export const filter_select = (lv1, active, data) => R.adjust(
    R.assoc('active', active),
    lv1
)(data)

export const home_diary_manager_filter_set_drawer = createAction('home_diary_manager_filter_set_drawer')
export const home_diary_manager_filter_set = createAction('home_diary_manager_filter_set')
export const home_diary_manager_filter_init = createAction('home_diary_manager_filter_init')
export const home_diary_manager_filter_select = createAction('home_diary_manager_filter_select')

export default handleActions({
    [home_diary_manager_filter_set_drawer]: (state, {payload}) => ({
        ...state,
        drawer: {
            ...state.drawer,
            ...payload,
        },
    }),

    [home_diary_manager_filter_set]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),

    [home_diary_manager_filter_init]: (state, {payload}) => {

        return {
            ...state,
            data: payload,
        }
    },

    [home_diary_manager_filter_select]: (state, {payload}) => {

        const {
            lv1,
            active,
        } = payload

        return {
            ...state,
            data: filter_select(lv1, active, state.data),
        }
    },

}, init_state)

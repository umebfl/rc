import R from 'ramda'
import {
    createAction,
    handleActions,
} from 'redux-actions'

const init_state = {
    data: null,
}

export const rank_list_detail_init = createAction('rank_list_detail_init')
export const rank_list_detail_set_like = createAction('rank_list_detail_set_like')
export const rank_list_detail_set_has_like = createAction('rank_list_detail_set_has_like')

export default handleActions({

    [rank_list_detail_set_like]: (state, {payload}) => ({
        ...init_state,
        ...payload,
    }),

    [rank_list_detail_init]: (state, {payload}) => ({
        ...init_state,
        data: payload,
    }),

    [rank_list_detail_set_has_like]: (state, {payload}) => {
        // data attendance list 10030750
        return R.compose(
            v => R.assocPath(
                ['data', payload.type, 'list'],
                R.compose(
                    R.adjust(
                        R.assoc('has_like', payload.v.has_like),
                        payload.k
                    ),
                    R.adjust(
                        R.assoc('like_count', payload.v.like_count),
                        payload.k
                    ),
                )(R.path(['data', payload.type, 'list'])(v))
            )(v),
        )(state)
        // ({
        //     ...state,
        //     data: {
        //         ...state.data,
        //         [payload.type]: {
        //             ...state.data[payload.type],
        //             list: {
        //                 ...state.data[payload.type].list,
        //                 ...payload.data,
        //             },
        //         },
        //     },
        // })
    },

}, init_state)

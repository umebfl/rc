import R from 'ramda'

import moment from 'moment'

import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    set,
} from '../../../../lib/persist'

import {
    DIARY_FILTER,
} from '../../../../lib/persist/constant'

import {
    _fetch,
} from '../../../../lib/fetch'

import {
    PAGE_SIZE,
} from '../../../../../variable'

const SORT_ID = 'sort'
const DATE_ID = 'date'
const ADVANCE_ID = 'advance'
const UNREAD_ID = 'unread'

const SORT_TOP = 'sort-top'
const SORT_DOWN = 'sort-down'

const TOPLV_PREFIX = '    '
const LV_TOP = 'top'
const LV_SUB = 'sub'
const LV_LEAF = 'leaf'

const PATH = '/logs/list'
const DEP_PATH = '/orgs/dep-list'

// 获取层级数量
const get_margin_count = R.match(/^(│|　|└|├)*/g)

// 获取当前节点
const get_current_node = (node, deep) => {
    if(deep === 1) {
        return node
    }

    return get_current_node(node.sub[node.sub.length - 1], deep - 1)
}

// 移除布局元素
const remove_layout_string = R.replace(/^(│|　|└|├)*/g, '')

const init_state = {
    filter_bar_data: [
        // 优先排序
        {
            id: SORT_ID,
            active: 0,
            ignore: false,
            icon_type: SORT_TOP,  // sort-top sort-down
            direction: 0,   // 排序方向 0: top， 1: down
            data: [
                {
                    k: 'create_time',
                    n: '时间远近',
                    v: 0,
                },
                {
                    k: 'is_read',
                    n: '未读优先',
                    v: 1,
                },
                {
                    k: 'evaluate_count',
                    n: '评价次数',
                    v: 2,
                },
                {
                    k: 'feel',
                    n: '心情好坏',
                    v: 3,
                },
                {
                    k: 'word_count',
                    n: '日志字数',
                    v: 4,
                },
                {
                    k: 'experience',
                    n: '日志心得',
                    v: 5,
                },
                {
                    k: 'suggestion',
                    n: '管理建议',
                    v: 6,
                },
            ],
        },
        // 未读统计
        {
            id: UNREAD_ID,
            type: 'text',
            string: '未读{unread} / {total}篇',
            // format: [
            //     {
            //         k: '{unread}',
            //         // v: 0,
            //     },
            //     {
            //         k: '{count}',
            //         // v: 0,
            //     },
            // ],
        },
        // 日期过滤
        // {
        //     id: DATE_ID,
        //     active: 0,
        //     ignore: false,
        //     icon_type: 'arrow',
        //     data: [
        //         {
        //             k: 'last_day',
        //             n: '最近一天',
        //             v: 0,
        //         },
        //         {
        //             k: 'last_three_days',
        //             n: '最近三天',
        //             v: 1,
        //         },
        //         {
        //             k: 'this_week',
        //             n: '最近一周',
        //             v: 2,
        //         },
        //         {
        //             k: 'this_month',
        //             n: '最近一月',
        //             v: 3,
        //         },
        //         {
        //             k: 'all_dates',
        //             n: '全部日期',
        //             v: 4,
        //         },
        //     ],
        // },
        // 高级筛选
        {
            id: ADVANCE_ID,
            active: 0,
            ignore: true,
            icon_type: 'funnel',
            data: [
                {
                    k: 'advance',
                    n: '高级筛选',
                },
            ],
            // handle_press: () => alert('123'),
            // handle_press: () => payload.navigation.navigate('DrawerOpen'),
        },
    ],
    filter_drawer_data: {
        dep_data: {},
        dep_open_item_list: [],
        active: {
            date_active: ['this_month'],
            read_active: [],
            eva_active: [],
            fav_active: [],
            seq_active: [],
            dep_active: [],
        },
    },
    inited: false,
    list: [],
    page_num: 0,
    count: 0,
    total: 0,
    search_list_update_flag: false,
    ids: [],
    _fetch_error: false,
}

const set_persist = state => {
    let filter_bar_data = R.map(R.pick(['active', 'icon_type', 'direction']))(state.filter_bar_data)
    let filter_drawer_data = R.pick(['active', 'dep_open_item_list'])(state.filter_drawer_data)

    set(DIARY_FILTER, {
        filter_bar_data,
        filter_drawer_data,
    })
}

export const build_param = (state, type = 'set') => {
    const {
        Auth: {
            info: {
                id,
                token,
            },
        },
        I18n: {
            lang,
        },
        Diary_staff: {
            filter_bar_data,
            filter_drawer_data: {
                active: {
                    date_active,
                    read_active,
                    eva_active,
                    fav_active,
                    seq_active,
                    dep_active,
                },
            },
            page_num,
        },
    } = state

    let startDate = null
    let endDate = null
    let orderBy = null

    R.map(
        R.cond([
            [
                R.propEq('id', SORT_ID),
                v => {
                    orderBy = `${v.data[v.active].k} ${v.direction ? 'DESC' : 'ASC'}`
                },
            ],
            // [
            //     R.propEq('id', DATE_ID),
            //     v => R.cond([
            //             [
            //                 R.equals('last_day'),
            //                 () => {
            //                     startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
            //                     endDate = moment().format('YYYY-MM-DD')
            //                 },
            //             ],
            //             [
            //                 R.equals('last_three_days'),
            //                 () => {
            //                     startDate = moment().subtract(3, 'days').format('YYYY-MM-DD')
            //                     endDate = moment().format('YYYY-MM-DD')
            //                 },
            //             ],
            //             [
            //                 R.equals('this_week'),
            //                 () => {
            //                     startDate = moment().subtract(1, 'weeks').format('YYYY-MM-DD')
            //                     endDate = moment().format('YYYY-MM-DD')
            //                 },
            //             ],
            //             [
            //                 R.equals('this_month'),
            //                 () => {
            //                     startDate = moment().subtract(1, 'months').format('YYYY-MM-DD')
            //                     endDate = moment().format('YYYY-MM-DD')
            //                 },
            //             ],
            //             [
            //                 R.equals('all_dates'),
            //                 R.T,
            //             ],
            //         ])(v.data[v.active].k),
            // ],
        ])
    )(filter_bar_data)

    // 时间
    R.cond([
        [
            R.equals('today'),
            () => {
                startDate = moment().format('YYYY-MM-DD')
                endDate = moment().format('YYYY-MM-DD')
            },
        ],
        [
            R.equals('yesterday'),
            () => {
                startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
                endDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
            },
        ],
        [
            R.equals('last_three_days'),
            () => {
                startDate = moment().subtract(2, 'days').format('YYYY-MM-DD')
                endDate = moment().format('YYYY-MM-DD')
            },
        ],
        [
            R.equals('this_week'),
            () => {
                startDate = moment().subtract(moment().day(), 'days').format('YYYY-MM-DD')
                endDate = moment().format('YYYY-MM-DD')
            },
        ],
        [
            R.equals('this_month'),
            () => {
                startDate = moment().subtract(moment().date() - 1, 'days').format('YYYY-MM-DD')
                endDate = moment().format('YYYY-MM-DD')
            },
        ],
        [
            v => R.indexOf('custom')(v) !== -1,
            v => {
                const date_splite = R.split('_', v)
                startDate = date_splite[1]
                endDate = date_splite[2]
            }
        ],
    ])(date_active[0] ? date_active[0] : [])

    return {
        wsId: id,
        pageSize: PAGE_SIZE,
        pageNumber: type === 'set' || type === 'refresh' ? 0 : page_num + 1,
        favorite: fav_active.length
                    ? fav_active[0] === 'fav'
                        ? 1 // 已关注
                        : 0 // 未关注
                    : null, // 全部
        read: read_active.length
                    ? read_active[0] === 'read'
                        ? 1 // 已关注
                        : 0 // 未关注
                    : null, // 全部
        evaluate: eva_active.length
                    ? eva_active[0] === 'eva'
                        ? 1 // 已关注
                        : 0 // 未关注
                    : null, // 全部
        startDate,
        endDate,
        orderBy,
        dep: R.ifElse(
            R.isEmpty,
            () => null,
            R.join(','),
        )(dep_active),
        empGrade: R.ifElse(
            R.isEmpty,
            () => null,
            R.join(',')
        )(seq_active),
    }
}

const fetch_log_data = (state, dispatch, type) => {
    const {
        Auth: {
            info: {
                id,
                token,
            },
        },
        I18n: {
            lang,
        },
    } = state

    // dispatch(home_diary_staff_top_refreshing_set(true))

    _fetch({
        fetch_type: 'GET',
        path: PATH,
        token,
        lang,
        param: build_param(state, type),
        success: rv => {
            if(type === 'set' || type === 'refresh') {
                // setTimeout(() => {
                //     dispatch(home_diary_staff_top_refreshing_set(false))
                // }, 300)
                // setTimeout(() => {
                    dispatch(home_diary_staff_list_set(rv))
                // }, 600)
            } else {
                dispatch(home_diary_staff_list_append(rv))
            }

            // dispatch(home_diary_staff_top_refreshing_set(false))
            set_persist(state.Diary_staff)
        },
        error_flow: () => {
            set_persist(state.Diary_staff)
        },
        update_state: payload => {
            if(type === 'refresh') {
                if(payload._fetch_error) {
                    dispatch(
                        home_diary_staff_loading(payload)
                    )
                }
            } else {
                dispatch(
                    home_diary_staff_loading(payload)
                )
            }
        },
    })
}

const fetch_dep_data =  (state, dispatch) => {
    const {
        Auth: {
            info: {
                id,
                token,
            },
        },
        I18n: {
            lang,
        },
    } = state

    _fetch({
        fetch_type: 'GET',
        param: {
            wsId: id,
        },
        path: DEP_PATH,
        token,
        lang,
        success: rv => {
            dispatch(
                _home_diary_staff_filter_drawer_init_dep(rv.dep_data)
            )
        },
    })
}

export const home_diary_staff_set_log_read_state = createAction('home_diary_staff_set_log_read_state')
export const home_diary_staff_set_log_state = createAction('home_diary_staff_set_log_state')
export const home_diary_staff_set_favorite_state = createAction('home_diary_staff_set_favorite_state')
export const home_diary_staff_set_evaluate_state = createAction('home_diary_staff_set_evaluate_state')
export const home_diary_staff_set_evaluate_count_state = createAction('home_diary_staff_set_evaluate_count_state')
export const home_diary_staff_set_view_count_state = createAction('home_diary_staff_set_view_count_state')

export const home_diary_staff_loading = createAction('home_diary_staff_loading')
export const home_diary_staff_list_set = createAction('home_diary_staff_list_set')
export const home_diary_staff_list_append = createAction('home_diary_staff_list_append')
export const home_diary_staff_restore = createAction('home_diary_staff_restore')
export const home_diary_staff_detail_ids = createAction('home_diary_staff_detail_ids')
export const home_diary_staff_top_refreshing_set = createAction('home_diary_staff_top_refreshing_set')
export const home_diary_staff_filter_drawer_dep_set_open = createAction('home_diary_staff_filter_drawer_dep_set_open')

// seq
const set_seq_one_item_active = (list, k) =>
    R.ifElse(
        R.contains(k),
        R.without(k),
        R.append(k),
    )(list)

const set_seq_serise_item_active = (list, k) => {
    const list_str = JSON.stringify(list)

    if(R.indexOf(k)(list_str) !== -1) {
        return R.filter(
                    v => R.indexOf(k)(v) === -1
                )(list)
    } else {
        return R.concat([`${k}1`, `${k}2`, `${k}3`, `${k}4`, `${k}5`])(list)
    }
}

export const home_diary_staff_filter_drawer_seq_reset = (payload) => (dispatch, getState) => {
    const state = getState()
    const seq_active = state.Diary_staff.filter_drawer_data.active.seq_active

    dispatch(_home_diary_staff_filter_drawer_set({
        active: {
            ...state.Diary_staff.filter_drawer_data.active,
            seq_active: [],
        },
    }))

    fetch_log_data(getState(), dispatch, 'set')
}

export const home_diary_staff_filter_drawer_seq_select_all = (payload) => (dispatch, getState) => {
    const state = getState()
    const seq_active = state.Diary_staff.filter_drawer_data.active.seq_active

    dispatch(_home_diary_staff_filter_drawer_set({
        active: {
            ...state.Diary_staff.filter_drawer_data.active,
            seq_active: set_seq_serise_item_active(seq_active, payload),
        },
    }))

    fetch_log_data(getState(), dispatch, 'set')
}
export const home_diary_staff_filter_drawer_seq_item_press = (payload) => (dispatch, getState) => {
    const state = getState()
    const seq_active = state.Diary_staff.filter_drawer_data.active.seq_active

    dispatch(_home_diary_staff_filter_drawer_set({
        active: {
            ...state.Diary_staff.filter_drawer_data.active,
            seq_active: set_seq_one_item_active(seq_active, payload),
        },
    }))

    fetch_log_data(getState(), dispatch, 'set')
}

export const _home_diary_staff_filter_drawer_reset = createAction('_home_diary_staff_filter_drawer_reset')
export const home_diary_staff_filter_drawer_reset = () => (dispatch, getState) => {
    dispatch(_home_diary_staff_filter_drawer_reset())
    fetch_log_data(getState(), dispatch, 'set')
}

export const _home_diary_staff_filter_drawer_init_dep = createAction('_home_diary_staff_filter_drawer_init_dep')
export const home_diary_staff_filter_drawer_init_dep = () => (dispatch, getState) => {
    fetch_dep_data(getState(), dispatch)
}

export const _home_diary_staff_list_refresh = createAction('_home_diary_staff_list_refresh')
export const home_diary_staff_list_refresh = () => (dispatch, getState) => {
    dispatch(_home_diary_staff_list_refresh())
    fetch_log_data(getState(), dispatch, 'refresh')
}

export const _home_diary_staff_list_next = createAction('_home_diary_staff_list_next')
export const home_diary_staff_list_next = () => (dispatch, getState) => {
    fetch_log_data(getState(), dispatch, 'append')
}

export const _home_diary_staff_filter_drawer_set = createAction('_home_diary_staff_filter_drawer_set')
export const home_diary_staff_filter_drawer_set = (payload) => (dispatch, getState) => {
    dispatch(_home_diary_staff_filter_drawer_set(payload))
    fetch_log_data(getState(), dispatch, 'set')
}

export const home_diary_staff_filter_drawer_dep_checked_all = () => (dispatch, getState) => {
    const state = getState()

    const dep_data = dep_set_checked_all(state.Diary_staff.filter_drawer_data.dep_data, state.Diary_staff.filter_drawer_data.active.dep_active.length ? false : true)
    const dep_active = dep_get_active(dep_data, 0)
    const dep_open_item_list = dep_get_open(dep_data, 0)

    dispatch(_home_diary_staff_filter_drawer_set({
        active: {
            ...state.Diary_staff.filter_drawer_data.active,
            dep_active,
        },
        dep_data,
        dep_open_item_list,
    }))

    fetch_log_data(getState(), dispatch, 'set')
}
export const home_diary_staff_filter_drawer_dep_set_checked = payload => (dispatch, getState) => {
    const state = getState()

    const dep_data = dep_set_checked(state.Diary_staff.filter_drawer_data.dep_data, [payload], false)
    const dep_active = dep_get_active(dep_data, 0)
    const dep_open_item_list = dep_get_open(dep_data, 0)

    dispatch(_home_diary_staff_filter_drawer_set({
        active: {
            ...state.Diary_staff.filter_drawer_data.active,
            dep_active,
        },
        dep_data,
        dep_open_item_list,
    }))

    fetch_log_data(getState(), dispatch, 'set')
}

export const _home_diary_staff_select = createAction('_home_diary_staff_select')
export const home_diary_staff_select = (payload) => (dispatch, getState) => {
    dispatch(_home_diary_staff_select(payload))
    fetch_log_data(getState(), dispatch, 'set')
}

export const filter_select = (lv1, active, data) => R.adjust(
    R.assoc('active', active),
    lv1
)(data)

const dep_set_open = (data, k) => {
    if(data.sub) {
        return {
            ...data,
            op: data.k === k ? !data.op : data.op,
            sub: R.map(
                    v => dep_set_open(v, k)
                )(data.sub),
        }
    }

    return data
}

const dep_set_checked_all = (data, ck) => {
    if(data.sub) {
        return {
            ...data,
            ck,
            sub_all_selected: ck,
            sub: R.map(
                v => dep_set_checked_all(v, ck)
            )(data.sub),
        }
    }

    return {
        ...data,
        ck,
        sub_all_selected: ck,
    }
}

const dep_set_checked_and_open = (data, key_list, parent_is_selected, parent_checked) => {
    let ck
    let is_selected

    if(parent_is_selected) {
        // 如果选中 子节点全部选中
        // 如果取消选中 子节点全部取消选中
        ck = parent_checked
    } else {
        // 如果是选中节点，进行选中状态反转
        if(key_list.indexOf(data.k) !== -1) {
            is_selected = true
            ck = !data.ck
        } else {
            is_selected = false
            ck = data.ck
        }
    }

    if(data.sub) {
        const sub = R.map(
                        v => dep_set_checked_and_open(
                            v,
                            key_list,
                            parent_is_selected ? parent_is_selected : is_selected,
                            parent_is_selected ? parent_checked : ck
                        )
                    )(data.sub)

        const sub_all_selected = R.all(
                                    v => v.sub_all_selected
                                )(sub)

        const sub_has_op = R.any(
                                    v => v.op
                                )(sub)

        return {
            ...data,
            ck: is_selected ? ck : sub_all_selected,
            op: sub_has_op,
            sub,
            sub_all_selected: is_selected ? ck : sub_all_selected,
        }
    }

    return {
        ...data,
        ck,
        op: ck,
        sub_all_selected: ck,
    }
}

const dep_set_checked = (data, key_list, parent_is_selected, parent_checked) => {
    let ck
    let is_selected

    if(parent_is_selected) {
        // 如果选中 子节点全部选中
        // 如果取消选中 子节点全部取消选中
        ck = parent_checked
    } else {
        // 如果是选中节点，进行选中状态反转
        if(key_list.indexOf(data.k) !== -1) {
            is_selected = true
            ck = !data.ck
        } else {
            is_selected = false
            ck = data.ck
        }
    }

    if(data.sub) {
        const sub = R.map(
                        v => dep_set_checked(
                            v,
                            key_list,
                            parent_is_selected ? parent_is_selected : is_selected,
                            parent_is_selected ? parent_checked : ck
                        )
                    )(data.sub)

        const sub_all_selected = R.all(
                                    v => v.sub_all_selected
                                )(sub)

        return {
            ...data,
            ck: is_selected ? ck : sub_all_selected,
            sub,
            sub_all_selected: is_selected ? ck : sub_all_selected,
        }
    }

    return {
        ...data,
        ck,
        sub_all_selected: ck,
    }
}

const dep_get_active = (data, i) => {
    if(data.ck && i !== 0) {
        // 当前节点选中
        return [data.k]
    } else {
        // 当前节点不选中
        if(data.sub) {
            return R.compose(
                R.dropWhile(
                    R.isNil
                ),
                R.flatten,
                R.map(
                    v => dep_get_active(v, i + 1)
                )
            )(data.sub)
        }

        return []
    }
}

const dep_get_open = (data, i) => {
    if(data.op && i !== 0) {
        // 当前节点选中
        return [data.k]
    } else {
        // 当前节点不选中
        if(data.sub) {
            return R.compose(
                R.dropWhile(
                    R.isNil
                ),
                R.flatten,
                R.map(
                    v => dep_get_open(v, i + 1)
                )
            )(data.sub)
        }

        return []
    }
}


export default handleActions({

    [_home_diary_staff_filter_drawer_reset]: (state, {payload}) => ({
        ...state,
        filter_drawer_data: {
            active: {
                ...state.filter_drawer_data.active,
                date_active: ['this_month'],
                read_active: [],
                eva_active: [],
                fav_active: [],
                seq_active: [],
                dep_active: [],
            },
            dep_data: dep_set_checked_all(state.filter_drawer_data.dep_data, false),
            dep_open_item_list: [],
        }
    }),

    [home_diary_staff_filter_drawer_dep_set_open]: (state, {payload}) => ({
        ...state,
        filter_drawer_data: {
            ...state.filter_drawer_data,
            dep_data: dep_set_open(state.filter_drawer_data.dep_data, payload),
        }
    }),

    [home_diary_staff_top_refreshing_set]: (state, {payload}) => ({
        ...state,
        top_refreshing: payload,
    }),

    [_home_diary_staff_list_refresh]: (state, {payload}) => ({
        ...state,
        page_num: 0,
        no_more_data: true,
        top_refreshing: true,
    }),

    [home_diary_staff_detail_ids]: (state, {payload}) => ({
        ...state,
        search_list_update_flag: false,
        ids: payload,
    }),

    [home_diary_staff_list_append]: (state, {payload}) => ({
        ...state,
        inited: true,
        top_refreshing: false,
        page_num: state.page_num + 1,
        no_more_data: payload === null || payload.lists.length < PAGE_SIZE,
        count: payload === null ? state.count : payload.unread,
        total: payload === null ? state.total : payload.total,
        list: payload === null || payload.lists === null ? state.list : [...state.list, ...payload.lists],
        type: 'append',
    }),

    [home_diary_staff_list_set]: (state, {payload}) => ({
        ...state,
        top_refreshing: false,
        // _fetch_loading: false,
        page_num: 0,
        inited: true,
        search_list_update_flag: true,
        no_more_data: payload === null || payload.lists.length < PAGE_SIZE,
        count: payload === null ? 0 : payload.unread,
        total: payload === null ? 0 : payload.total,
        list: payload === null || payload.lists === null ? [] : payload.lists,
        type: 'flush',
    }),

    [home_diary_staff_loading]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),

    [home_diary_staff_restore]: (state, {payload}) => {
        let old_data = false
        const seq_active = payload.filter_drawer_data.active.seq_active ? payload.filter_drawer_data.active.seq_active : []

        R.forEach(
            v => {
                if(R.contains(v, ['M', 'P', 'T', 'S'])) {
                    old_data = true
                }
            }
        )(seq_active)

        return {
            ...state,
            filter_bar_data: R.addIndex(R.map)(
                                (v, k) => R.merge(v, payload.filter_bar_data[k])
                            )(state.filter_bar_data),
            filter_drawer_data: {
                ...state.filter_drawer_data,
                active: {
                    ...state.filter_drawer_data.active,
                    ...payload.filter_drawer_data.active,
                    seq_active: old_data
                        ? state.filter_drawer_data.active.seq_active
                        : seq_active,
                },
                // dep_data: {
                //     ...state.filter_drawer_data.dep_data,
                //     ...payload.filter_drawer_data.dep_data,
                // },
                dep_open_item_list: payload.filter_drawer_data.dep_open_item_list,
            },
        }
    },

    [_home_diary_staff_select]: (state, {payload}) => {
        const {
            lv1,
            active,
        } = payload

        let filter_bar_data = filter_select(lv1, active, state.filter_bar_data)

        if(state.filter_bar_data[lv1].id === SORT_ID) {
            if(state.filter_bar_data[lv1].active === active) {
                filter_bar_data[lv1].icon_type = filter_bar_data[lv1].icon_type === SORT_TOP ? SORT_DOWN : SORT_TOP
                filter_bar_data[lv1].direction = filter_bar_data[lv1].direction === 0 ? 1 : 0
            } else {
                filter_bar_data[lv1].icon_type = SORT_TOP
                filter_bar_data[lv1].direction = 0
            }
        }

        const data = {
            ...state,
            page_num: 0,
            no_more_data: true,
            // top_refreshing: true,
            // _fetch_loading: true,
            filter_bar_data,
        }

        // set_persist(data)
        return data
    },

    [_home_diary_staff_filter_drawer_set]: (state, {payload}) => {
        const data = {
            ...state,
            page_num: 0,
            no_more_data: true,
            filter_drawer_data: {
                ...state.filter_drawer_data,
                ...payload,
            },
        }

        // set_persist(data)
        return data
    },

    [_home_diary_staff_filter_drawer_init_dep]: (state, {payload}) => {
        const dep_active = state.filter_drawer_data.active.dep_active
        const dep_open_item_list = state.filter_drawer_data.dep_open_item_list

        let dep

        // 合并
        R.addIndex(R.map)((v, k) => {
            const item_margin_count = get_margin_count(v.value)[0].length
            const item_open = R.indexOf(v.id)(dep_open_item_list) !== -1

            let node = {
                op: payload.length < 50 || item_margin_count === 0 || item_open, // 展开状态 | 部门数组长度少时， 全部展开, 否则打开第一节点
                ck: false,  // checked 选中状态
                k: v.id,
                v: remove_layout_string(v.value),
            }

            if(!dep) {
                dep = node
            } else {
                let current_node = get_current_node(dep, item_margin_count)

                if(!current_node.sub) {
                    current_node.sub = []
                }

                current_node.sub = [
                    ...current_node.sub,
                    node,
                ]
            }
        })(payload)

        dep = dep_set_checked(dep, dep_active, false)

        return {
            ...state,
            filter_drawer_data: {
                ...state.filter_drawer_data,
                dep_data: dep,
            },
        }
    },

    [home_diary_staff_set_log_state]: (state, {payload}) => ({
        ...state,
        list: R.adjust(R.assoc(payload.k, payload.v), payload.row_index, state.list),
    }),

    [home_diary_staff_set_log_read_state]: (state, {payload}) => {
        let count = state.count

        const list = R.map(
            v => {
                const eq = payload.log_id === v.logId

                if(eq && v.read === 0) {
                    count = state.count - 1
                }

                // console.log('deb |', eq, count)

                return {
                    ...v,
                    read: eq ? 1 : v.read,
                }
            }
        )(state.list)

        return {
            ...state,
            list,
            count,
        }
    },

    [home_diary_staff_set_evaluate_state]: (state, {payload}) => {
        return ({
            ...state,
            list: R.map(
                v => ({
                    ...v,
                    evaluate: payload.log_id === v.logId ? 1 : v.evaluate,
                })
            )(state.list),
            // R.adjust(R.assoc(payload.k, payload.v), payload.row_index, state.list),
        })

    },

    [home_diary_staff_set_evaluate_count_state]: (state, {payload}) => {
        return ({
            ...state,
            list: R.map(
                v => ({
                    ...v,
                    evaluateCount: payload.log_id === v.logId ? v.evaluateCount + 1 : v.evaluateCount,
                })
            )(state.list),
        })
    },

    [home_diary_staff_set_view_count_state]: (state, {payload}) => {
        return ({
            ...state,
            list: R.map(
                v => ({
                    ...v,
                    viewCount: payload.log_id === v.logId ? v.viewCount + 1 : v.viewCount,
                })
            )(state.list),
        })
    },

    [home_diary_staff_set_favorite_state]: (state, {payload}) => {
        //
        return ({
            ...state,
            list: R.map(
                    R.ifElse(
                        v => R.equals(payload)(v.employeeId),
                        v => R.assoc('isFavorite', v.isFavorite ? 0 : 1, v),
                        v => v
                    )
            )(state.list),
        })
    },
}, init_state)

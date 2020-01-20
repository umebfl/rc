import R from 'ramda'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

import Filter_bar from '../../../../../component/filter/filter_bar/normal'

import {
    _fetch,
} from '../../../../../lib/fetch'

import * as reducer from '../reducer_filter.js'

import * as variable from '../../../../../theme/ume-theme/variable.js'

import {
    HRD,
    HRM,
    HRBP,
    CEO_TYPE,
    MANAGER_TYPE,
} from '../../../../../reducer/user/role'

const TOTAL_DATA_PATH = '/oa/workflows/total'

export const PARAM_ADVANCE = 'advance'
export const PARAM_READ_EVALUATE = 'read_evaluate'
export const PARAM_TYPE = 'type'

export const PARAM_READ_EVALUATE_TYPE_NOREAD = 'noread'
export const PARAM_READ_EVALUATE_TYPE_NOEVALUATE = 'noevaluate'
export const PARAM_READ_EVALUATE_TYPE_EVALUATE = 'evaluate'

export const PARAM_TYPE_DIRECT = 'underling_persons'
export const PARAM_TYPE_INDIRECT = 'indirect_persons'

class Todo extends Component {

    componentWillMount() {
        const {
            navigation,
            auth,
            i18n: {
                t,
            },
            data,
        } = this.props

        const read = {
            id: PARAM_READ_EVALUATE,
            active: 0,
            ignore: false,
            icon_type: 'arrow',
            data: [
                {
                    k: 'all',
                    n: t.all,
                    v: '',
                },
                {
                    k: PARAM_READ_EVALUATE_TYPE_NOREAD,
                    n: t.unread,
                    v: 0,
                },
                {
                    k: PARAM_READ_EVALUATE_TYPE_NOEVALUATE,
                    n: t.not_evaluated,
                    v: 1,
                },
                {
                    k: PARAM_READ_EVALUATE_TYPE_EVALUATE,
                    n: t.have_been_evaluated,
                    v: 2,
                },
            ],
        }

        const sub_hr = {
            k: 'hr',
            n: t.hrbp,
            v: 'hr_persons',
        }

        const subordinate = {
            id: PARAM_TYPE,
            active: 1,
            ignore: false,
            icon_type: 'arrow',
            data: [
                {
                    k: 'all',
                    n: t.all,
                    v: '',
                },
                {
                    k: 'direct',
                    n: t.direct_reports,
                    v: PARAM_TYPE_DIRECT,
                },
                {
                    k: 'indirect',
                    n: t.indirect_subordinates,
                    v: PARAM_TYPE_INDIRECT,
                },
            ],
        }

        if(this.props.role.hr_type) {
            subordinate.data.push(sub_hr)
        }

        const advance = {
            id: PARAM_ADVANCE,
            active: 0,
            ignore: true,
            icon_type: 'funnel',
            data: [
                {
                    k: 'advance',
                    n: t.advanced_filtering,
                },
            ],
            handle_press: () => this.props.navigation.navigate('DrawerOpen'),
        }

        if((this.props.role.type === CEO_TYPE || this.props.role.type === MANAGER_TYPE) && this.props.role.hr_type !== HRBP) {
            this.props.action.home_diary_manager_filter_init([
                read,
                subordinate,
                advance,
            ])
        } else {
            this.props.action.home_diary_manager_filter_init([
                read,
                advance,
            ])
        }
    }

    handle_select(rv) {
        const {
        //     handle_search,
            action: {
                home_diary_manager_filter_select,
            },
        //     data: {
        //         data,
        //     },
        } = this.props

        // let type = {
        //     // type: null,
        // }
        // let is_read = {
        //     // read: null,
        // }
        // let is_evaluate = {
        //     // evaluate: null,
        // }
        // // let dep
        // // let empGrade
        // const fix_data = reducer.filter_select(rv.lv1, rv.active, data)
        //
        // fix_data.map(
        //     v => {
        //         if(v.id === PARAM_READ_EVALUATE) {
        //             const k = v.data[v.active].k
        //
        //             if(k === PARAM_READ_EVALUATE_TYPE_NOREAD) {
        //                 is_read = {
        //                     read: 0,
        //                 }
        //             } else if(k === PARAM_READ_EVALUATE_TYPE_NOEVALUATE) {
        //                 is_evaluate = {
        //                     evaluate: 0,
        //                 }
        //             } else if(k === PARAM_READ_EVALUATE_TYPE_EVALUATE) {
        //                 is_evaluate = {
        //                     evaluate: 1,
        //                 }
        //             }
        //         } else if(v.id === PARAM_TYPE) {
        //             const val = v.data[v.active].v
        //
        //             if(val !== '') {
        //                 type = {
        //                     type: val,
        //                 }
        //             }
        //         }
        //     }
        // )
        //
        // handle_search({
        //     ...type,
        //     ...is_read,
        //     ...is_evaluate,
        // })
        home_diary_manager_filter_select(rv)
    }

    render() {
        const {
            navigation,
            auth,
            i18n: {
                t,
            },
            data,
        } = this.props

        return (
            <Filter_bar data={data} handle_select={this.handle_select.bind(this)}/>
        )
    }
}

export default connect(
    state => ({
        data: state.Diary_manager_filter,
        i18n: state.I18n,
        auth: state.Auth,
        role: state.User_role,
    }),
    dispatch => ({
        action: bindActionCreators(reducer, dispatch),
    })
)(Todo)

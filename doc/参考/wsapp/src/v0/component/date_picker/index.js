import R from 'ramda'

import React from 'react'

import {
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native'

import moment from 'moment'

import DatePicker from 'react-native-datepicker'

import * as variable from '../../theme/ume-theme/variable'
import toast from '../../component/toast/normal'
import style from './style'

const Date_picker = prop => (
    <DatePicker
        style={prop.container_style}
        customStyles={{
            dateInput: R.mergeAll([
                {
                    padding: 0,
                    borderWidth: 0,
                    backgroundColor: variable.COLOR_GRAY_XL,
                    height: variable.N_30,
                    ...prop.input_style,
                },
                prop.active ? prop.container_style_active : {},
            ]),
            dateText: R.mergeAll([
                {
                    fontSize: variable.N_12,
                    color: variable.COLOR_GRAY_D,
                },
                prop.active ? prop.input_style_active : {},
            ]),
        }}
        mode='date'
        format='YYYY-MM-DD'
        // min_date={moment().subtract(1, 'year').format('YYYY-MM-DD')}
        // max_date={moment().format('YYYY-MM-DD')}
        confirmBtnText={prop.t['确定']}
        cancelBtnText={prop.t['取消']}
        showIcon={false}
        onDateChange={v => {
            let checked = true
            // 数据校验
            if(prop.min_date && prop.min_date !== '') {
                if(moment(prop.min_date) > moment(v)) {
                    if(prop.type === 'start') {
                        toast(prop.t['起始时间不能小于：'] + prop.min_date)
                    } else {
                        toast(prop.t['结束时间不能小于起始时间'])
                    }
                    checked = false
                }
            }

            if(prop.max_date && prop.max_date !== '') {
                if(moment(prop.max_date) < moment(v)) {
                    if(prop.type === 'start') {
                        toast(prop.t['起始时间不能大于今天'])
                    } else {
                        toast(prop.t['结束时间不能大于今天'])
                    }
                    checked = false
                }
            }

            if(checked) {
                prop.handle_change(v)
            }
        }}
        {...prop}/>
)

export default Date_picker

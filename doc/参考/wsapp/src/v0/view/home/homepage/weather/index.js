import R from 'ramda'

import React, {
    Component,
} from 'react'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    View,
    Text,
    Image,
    Platform,
    PermissionsAndroid,
} from 'react-native'

import Geolocation from 'Geolocation'

import {
    _fetch,
} from '../../../../lib/fetch'

import conf from '../../../../../../conf'

import * as variable from '../../../../theme/ume-theme/variable.js'
import style from './style'

const HOST = 'https://free-api.heweather.com'
const PATH = '/v5/now'

const SOURCE = {
    '100': require('../../../../../../content/img/weather/100.png'),
    '101': require('../../../../../../content/img/weather/101.png'),
    '102': require('../../../../../../content/img/weather/102.png'),
    '103': require('../../../../../../content/img/weather/103.png'),
    '104': require('../../../../../../content/img/weather/104.png'),

    '200': require('../../../../../../content/img/weather/200.png'),
    '201': require('../../../../../../content/img/weather/201.png'),
    '202': require('../../../../../../content/img/weather/202.png'),
    '203': require('../../../../../../content/img/weather/203.png'),
    '204': require('../../../../../../content/img/weather/204.png'),
    '205': require('../../../../../../content/img/weather/205.png'),
    '206': require('../../../../../../content/img/weather/206.png'),
    '207': require('../../../../../../content/img/weather/207.png'),
    '208': require('../../../../../../content/img/weather/208.png'),
    '209': require('../../../../../../content/img/weather/209.png'),
    '210': require('../../../../../../content/img/weather/210.png'),
    '211': require('../../../../../../content/img/weather/211.png'),
    '212': require('../../../../../../content/img/weather/212.png'),
    '213': require('../../../../../../content/img/weather/213.png'),

    '300': require('../../../../../../content/img/weather/300.png'),
    '301': require('../../../../../../content/img/weather/301.png'),
    '302': require('../../../../../../content/img/weather/302.png'),
    '303': require('../../../../../../content/img/weather/303.png'),
    '304': require('../../../../../../content/img/weather/304.png'),
    '305': require('../../../../../../content/img/weather/305.png'),
    '306': require('../../../../../../content/img/weather/306.png'),
    '307': require('../../../../../../content/img/weather/307.png'),
    '308': require('../../../../../../content/img/weather/308.png'),
    '309': require('../../../../../../content/img/weather/309.png'),
    '310': require('../../../../../../content/img/weather/310.png'),
    '311': require('../../../../../../content/img/weather/311.png'),
    '312': require('../../../../../../content/img/weather/312.png'),
    '313': require('../../../../../../content/img/weather/313.png'),

    '400': require('../../../../../../content/img/weather/400.png'),
    '401': require('../../../../../../content/img/weather/401.png'),
    '402': require('../../../../../../content/img/weather/402.png'),
    '403': require('../../../../../../content/img/weather/403.png'),
    '404': require('../../../../../../content/img/weather/404.png'),
    '405': require('../../../../../../content/img/weather/405.png'),
    '406': require('../../../../../../content/img/weather/406.png'),
    '407': require('../../../../../../content/img/weather/407.png'),

    '500': require('../../../../../../content/img/weather/500.png'),
    '501': require('../../../../../../content/img/weather/501.png'),
    '502': require('../../../../../../content/img/weather/502.png'),
    '503': require('../../../../../../content/img/weather/503.png'),
    '504': require('../../../../../../content/img/weather/504.png'),
    '507': require('../../../../../../content/img/weather/507.png'),
    '508': require('../../../../../../content/img/weather/508.png'),

    '900': require('../../../../../../content/img/weather/900.png'),
    '901': require('../../../../../../content/img/weather/901.png'),
    '999': require('../../../../../../content/img/weather/999.png'),
}

const get_code_source = (id) => {
    return SOURCE[id]
}

class Weather extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            txt: null,
            code: null,
            tmp: null,
        }
    }

    componentDidMount() {
        this.get_weather()
    }

    async get_weather() {
        const {
            i18n: {
                t,
            },
        } = this.props

        let result = false

        if(Platform.OS === 'android') {
            result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: t.requests_permission,
                    message: `${t.requests_permission_desc} ${PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION} ${t.requests_permission_desc_1}`,
                },
            )
        }

        if(result) {
            // 尝试3次
            Geolocation.getCurrentPosition(
                location => {
                    this.fetch_weather(location.coords.latitude + ',' + location.coords.longitude)
                },
                error => {
                    Geolocation.getCurrentPosition(
                        location => {
                            this.fetch_weather(location.coords.latitude + ',' + location.coords.longitude)
                        },
                        error => {
                            Geolocation.getCurrentPosition(
                                location => {
                                    this.fetch_weather(location.coords.latitude + ',' + location.coords.longitude)
                                },
                                error => {
                                    // toast(t.get_location_service_failed, { position: 0 })
                                    // this.fetch_weather()
                                }
                            )
                        }
                    )
                }
            )
        } else {
            this.fetch_weather()
        }
    }

    fetch_weather(lalo) {
        _fetch({
            fetch_type: 'GET',
            host: HOST,
            path: PATH,
            param: {
                city: lalo ? lalo : '深圳',
                key: conf.weather_key,
                lang: this.props.i18n.lang,
            },
            error: rv => {
                if(rv.HeWeather5 && rv.HeWeather5[0] && rv.HeWeather5[0].status === 'ok') {
                    const txt = rv.HeWeather5[0].now.cond.txt
                    const code = rv.HeWeather5[0].now.cond.code
                    const tmp = rv.HeWeather5[0].now.tmp

                    this.setState({
                        ...this.state,
                        txt,
                        code,
                        tmp, // 温度
                    })
                }
            },
        })
    }

    render() {
        const {
            i18n: {
                t,
            },
        } = this.props

        const {
            txt,
            code,
            tmp,
        } = this.state

        if(tmp === null) {
            return <View style={{
                height: variable.N_50,
            }}></View>
        }

        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: 10,
                height: variable.N_50,
            }}>
                <Text style={{
                    fontSize: variable.N_18,
                }}>{tmp}</Text>
                <Text style={{
                    fontSize: variable.N_14,
                    paddingRight: variable.N_10,
                }}>℃</Text>

                <View style={{
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image square source={get_code_source(code)} style={{width: 30, height: 30}}/>
                    <Text style={{
                        paddingTop: variable.N_2,
                        fontSize: variable.N_12,
                    }}>{txt}</Text>
                </View>
            </View>
        )
    }
}

export default connect(
    state => ({
        i18n: state.I18n,
    }),
    dispatch => ({
        // action: bindActionCreators({user_duty_init}, dispatch),
    })
)(Weather)

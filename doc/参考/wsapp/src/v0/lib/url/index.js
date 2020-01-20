import R from 'ramda'

// 默认请求类型
export const DEFAULT_FETCH_TYPE = 'GET'

// uri转码
export const get_encodeuri = R.compose(
    v => encodeURIComponent(v),
    R.ifElse(
        v => typeof v === 'object',
        v => JSON.stringify(v),
        v => v
    )
)

// 对象转url参数
export const get_parse_param = R.compose(
    R.join('&'),
    R.ap([
        v => `${v[0]}=${get_encodeuri(v[1])}`,
    ]),
    R.filter(v => v[1] !== null),
    R.toPairs,
    // R.ifElse(
    //     v => typeof v === 'Object',
    //     R.toPairs,
    //     () => []
    // )
)

// 是否生成参数到url
export const is_uri_param = fetch_type => fetch_type === 'GET' || fetch_type === 'DELETE'

import R from 'ramda'

export const is_empty = R.or(R.isNil, R.isEmpty)

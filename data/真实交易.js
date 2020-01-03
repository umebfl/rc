export default [
    {
        date: '2020-01-03',
        time: '10:56:19',
        direction: '买入',
        code: 'NI',
        month: '2005',
        count: 2,
        open_price: 112040,

        status: '持仓',

        // 加仓
        add_count: 0,
        open_price_first: 110900,

        // 结算盈利
        close_price: null,
        profit: 0,

        // 自动计算
        // 加仓价格 add_price
        // 止损价格 loss_price
        // 当前盈利
    },

    {
        date: '2020-01-02',
        time: '11:56:19',
        direction: '买入',
        code: 'NI',
        month: '2005',
        count: 2,
        open_price: 111900,

        status: '平仓',

        // 加仓
        add_count: 0,
        open_price_first: 110900,

        // 结算盈利
        close_price: 110900,
        profit: -2560,
    },
]

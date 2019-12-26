export default [
    {
        type: '支出',
        list: [
            {
                id: '花呗',
                money: 1000,
            },
            {
                id: '白条',
                money: 1000,
            },
            {
                id: '房租',
                money: 3200,
            },
            {
                id: '好车',
                money: 3600,
                total: 86000,
                balance: 82400 - 15000 - 26000,  // 36400
            },
        ],
    },
    {
        type: '去杠杆',
        list: [
            {
                id: '招闪',
                money: 2900,
                total: 300000,
                balance: 0,
            },
            // 家贷
            {
                id: '家贷',
                money: 0,
                // 预算 1个月 明年6月份开始
                budget: 20000,
                total: 210000,
                balance: 210000,
            },
        ],
    },
    {
        type: '职业认证',
    },
    {
        type: '本金扩张',
        msg: '12万一个账号',
    },
    {
        type: '命匣',
        msg: '3个命匣, 每个30万',
    },
]

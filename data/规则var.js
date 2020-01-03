export default [
    {
        flow: '轻仓',
        bond: 100000,
        bond_lv1: 100000 * 0.4,
        // 止损价格
        loss_rate: 0.025,
        // 回撤止盈价格
        rb_rate: 0.025,
        // 加仓价格
        add_rate: 0.05,
        // 只可加一次
        add_count_max: 1,
    },
]

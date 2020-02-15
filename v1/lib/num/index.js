

// 百分比
export const to_rate = (all, b, fixed = 2) => {
    return parseFloat((b / all * 100).toFixed(fixed))
}

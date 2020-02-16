

export default (url, cb) => {
    const request = new XMLHttpRequest()

    request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
            return
        }

        if (request.status === 200) {
            // console.log('ajax success')
            cb && cb(request.responseText)
        } else {
            Toast.fail('请求接口数据异常！')
        }
    }

    request.open('GET', url)
    request.send()
}

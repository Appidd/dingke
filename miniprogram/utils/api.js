const method = {
    cloudApi(type, params) {
        return new Promise((r, i) => {
            wx.cloud.callFunction({
                name: 'quickstartFunctions',
                data: {
                    type: type,
                    ...params
                },
                success: res => {

                    r(res)
                },
                fail: err => {
                    i(err)

                }

            })
        })

    }
}
export {
    method
}
module.exports = {
    data_check: function (data, example) {
        var errorField = 0
        Object.keys(data).map(field => {
            if (example.indexOf(field) < 0) {
                ++errorField
            }
        })

        return (errorField === 0) ? true : false
    },

    json_write: function (res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                code: '1',
                msg: '操作失敗'
            })
        } else {
            res.json(ret)
        }
    },
}

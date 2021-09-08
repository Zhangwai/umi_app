let list = [
    {
        id: 1,
        title: '列表1',
        status: 0
    },
    {
        id: 2,
        title: '列表2',
        status: 1
    },
    {
        id: 3,
        title: '列表3',
        status: 2
    },
    {
        id: 4,
        title: '列表4',
        status: 0
    },
    {
        id: 5,
        title: '列表5',
        status: 1
    },
    {
        id: 6,
        title: '列表6',
        status: 0
    },
    {
        id: 7,
        title: '列表7',
        status: 2
    },
]

export default {
    "GET /api/todoLists": list,
    "POST /api/todo": (req, res) => {
        // req.body拿到提交过来的数据{todo:'zzz'}
        const item = {
            id: list.length + 1,
            title: req.body.todo,
            status: 0
        }
        list.unshift(item)
        const result = {
            status: 200,
            message: '添加代办事项成功'
        }
        res.send(result)
    }
}
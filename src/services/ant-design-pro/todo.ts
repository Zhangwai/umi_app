import { request } from 'umi';
/** 
 * 获取所有的todolist
 */
export const getToDoLists = async () => {
    return request('/api/todoLists')
}
/** 
 * 添加新的todo待办事件
 */
export const addToDoLists = async (params: any) => {
    return request('/api/todo', {
        method: 'POST',
        data: params
    })
}

/** 
 * 修改todo事件
 */
export const editToDoLists = async (params: any) => {
    return request('/api/editTodo', {
        method: 'POST',
        data: params
    })
}
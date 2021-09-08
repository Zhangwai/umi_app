import { request } from 'umi';
/** 
 * 获取所有的todolist
 */
export const getToDoLists = async () => {
    return request('/api/todoLists')
}
/** 
 * 添加新的todo
 */
export const addToDoLists = async (params: any) => {
    return request('/api/todo', {
        method: 'POST',
        data: params
    })
}
import { request } from 'umi';
/**
 * 获取统计面板数据
 */
export const fetchDashborard = () => {
    return request('/api/admin/index')
}
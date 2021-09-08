import { getToDoLists } from "@/services/ant-design-pro/todo"

export default {
    namespace: 'todoModel',
    state: {
        todoData: []
    },
    effects: {
        *fetchToDoList({payload},{call,put}){
            const res = yield call(getToDoLists);
            yield put({
                type:'setToDoLost',
                payload:res
            })
        }
    },
    reducers: {
        setToDoLost(state,action){
            return{
                ...state,
                todoData:action.payload
            }
        }
    }
}
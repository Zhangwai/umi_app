import { addToDoLists, editToDoLists, getToDoLists } from "@/services/ant-design-pro/todo"

export default {
    namespace: 'todoModel',
    state: {
        todoData: []
    },
    effects: {
        *fetchToDoList({ payload }: any, { call, put }: any): object {
            try {
                const res = yield call(getToDoLists);
                yield put({
                    type: 'setToDoLost',
                    payload: res
                })
                return res;
            } catch (err: any) {
                throw new Error(err);
            }
        },
        *addToDoList({ payload }: any, { put, call }: any): object {
            try {
                const res = yield call(addToDoLists, payload);
                return res;
            } catch (err: any) {
                throw new Error(err);
            }

        },
        *editToDoList({ payload }: any, { put, call }: any): object {
            try {
                const res = yield call(editToDoLists, payload);
                return res;
            } catch (err: any) {
                throw new Error(err);
            }

        },
    },
    reducers: {
        setToDoLost(state: { todoData: [] }, action: { payload: [] }) {
            return {
                ...state,
                todoData: action.payload
            }
        },
    }
}
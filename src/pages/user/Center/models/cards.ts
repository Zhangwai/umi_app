import { addTag, currentUser as queryCurrentUser, deleteTag } from '@/services/ant-design-pro/api';
export default {
    namespace: 'cards',
    state: {
        loading: true,
        currentUser: {}
    },
    effects: {
        *fetchCurrentUser({ payload }: any, { call, put }: any): object {
            try {
                const res = yield call(queryCurrentUser);
                yield put({
                    type: 'setCurrentUser',
                    payload: res.data
                })
                return res;
            } catch (err: any) {
                throw new Error(err);
            }
        },
        *deleteTagsById({ payload }: { [key: string]: string }, { call, put }: any): object {
            try {
                const res = yield call(deleteTag, payload);
                return res
            } catch (error: any) {
                throw new Error(error)
            }
        },
        *addTagContent({ payload }: { [label: string]: string }, { call, put }: any): object {
            console.log(payload)
            try {
                const res = yield call(addTag, payload);
                return res
            } catch (error: any) {
                throw new Error(error)
            }
        },
    },
    reducers: {
        setCurrentUser(state: { loading: boolean, currentUser: {} }, action: { payload: {} }) {
            return {
                ...state,
                loading: false,
                currentUser: action.payload
            }
        },
    }
}
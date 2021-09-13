import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
export default {
    namespace: 'cards',
    state: {
        loading:true,
        currentUser:{}
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
    },
    reducers: {
        setCurrentUser(state:{loading:boolean,currentUser:{}}, action: { payload:{} }) {
            return {
                ...state,
                loading:false,
                currentUser: action.payload
            }
        },
    }
}
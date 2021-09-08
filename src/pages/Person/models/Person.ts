import { getAllPerson } from "@/services/ant-design-pro/api"

const person = {
    namespace: 'personModel',
    state: {
        person: []
    },
    effects: {
        *fetchAllPerson({ payload }, { call, put }) {
            const res = yield call(getAllPerson);
            yield put({
                type: 'setAllPerson',
                payload: res
            })
        }
    },
    reducers: {
        setAllPerson(state, action) {
            return {
                ...state,
                person: action.payload
            }
        }
    }

}

export default person
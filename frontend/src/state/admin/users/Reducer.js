import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS } from "./ActionType";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const adminUserReducer = (state=initialState , action) => {
    switch(action.type) {
        case GET_ALL_USERS_REQUEST:
            return {...state, loading:true, error:null};

        case GET_ALL_USERS_SUCCESS:
            return {...state, loading:false, users:action.payload, error:null};

        case GET_ALL_USERS_FAILURE:
            return {...state, loading:false, error:action.payload};

        default:
            return state;
    }
}
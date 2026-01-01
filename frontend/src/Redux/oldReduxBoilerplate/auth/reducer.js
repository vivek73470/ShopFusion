import { SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNIN_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST, UPDATE_REQUEST,
    UPDATE_SUCCESS, UPDATE_FAILURE, SET_SUCCESS, UPDATE_PASS_FAILURE, UPDATE_PASS_SUCCESS, UPDATE_PASS_REQUEST, 
    CHANGGE_PASS_REQUEST, CHANGGE_PASS_SUCCESS, CHANGGE_PASS_FAILURE, SET_REQUEST, SET_FAILURE,
    SIGNIN_GOOGLE_REQUEST,SIGNIN_GOOGLE_FAILURE, SIGNIN_GOOGLE_SUCCESS} from "./action";

const initialState = {
    auth: false,
    userData: {},
    RequestPass: {},
    user: []
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIGNIN_GOOGLE_REQUEST:
            return{
                ...state,
                auth: true
            }
        case SIGNIN_GOOGLE_SUCCESS:
            return{
                ...state,
                userData:payload,
                auth: false
            }
        case SIGNIN_GOOGLE_FAILURE:
            return{
                ...state,
                auth: false
            }


        case SIGNIN_REQUEST:
            return {
                ...state,
                auth: true
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                auth: false,
            }
        case SIGNIN_FAILURE:
            return {
                auth: false
            }


        case SIGNUP_REQUEST:
            return {
                ...state,
                auth: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                auth: false,
            }
        case SIGNUP_FAILURE:
            return {
                auth: false
            }

        case SET_REQUEST:
            return {
                ...state,
                auth: true,
            }
        case SET_SUCCESS:
            return {
                ...state,
                userData: payload,
                auth: false,
            }
        case SET_FAILURE:
            return {
                ...state,
                auth: false,
            }


        case UPDATE_REQUEST:
            return {
                ...state,
                auth: true
            }
        case UPDATE_SUCCESS:
            return {
                ...state,
                user: payload,
                auth: false,
            }
        case UPDATE_FAILURE:
            return {
                auth: false
            }


        case UPDATE_PASS_REQUEST:
            return {
                auth: true
            }
        case UPDATE_PASS_SUCCESS:
            return {
                ...state,
                RequestPass: payload,
                auth: false
            }
        case UPDATE_PASS_FAILURE:
            return {
                auth: false
            }


        case CHANGGE_PASS_REQUEST:
            return {
                auth: true
            }
        case CHANGGE_PASS_SUCCESS:
            return {
                ...state,
                user:payload,
                auth: false
            }
        case CHANGGE_PASS_FAILURE:
            return {
                auth: false
            }

        default:
            return state;

    }

}
export { reducer }
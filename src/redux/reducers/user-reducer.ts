import {UserAction} from "../action-types/user";

interface UserState {
    userToken: string;
    userName: string;
    userId: string;
    isLoggedIn: boolean;
    errorMsg:  string;
    registerError: string | string[];
}

const initialState: UserState = {
    userToken: '',
    userName: '',
    userId: '',
    isLoggedIn: false,
    errorMsg: '',
    registerError: []
}

interface SetUserToken{
    type: UserAction.SET_USER_TOKEN,
    payload: string
}
interface SetUserName{
    type: UserAction.SET_USER_NAME,
    payload: string
}

interface SetUserId {
    type: UserAction.SET_USER_ID,
    payload: string
}
interface SetIsLoggedIn {
    type: UserAction.SET_IS_LOGGED,
    payload:boolean;
}
interface SetErrorMsg {
    type: UserAction.SET_ERROR_MSG
    payload: string;
}
interface SetRegisterError {
    type: UserAction.SET_REGISTER_ERROR
    payload: string | string[];
}

type Action = SetUserId | SetUserName | SetUserToken | SetIsLoggedIn | SetErrorMsg | SetRegisterError

export default (state = initialState, action: Action) =>{

    switch (action.type){
        case UserAction.SET_USER_TOKEN:{
            return {
                ...state, userToken: action.payload
            }
        }
        case UserAction.SET_USER_NAME:{
            return {
                ...state, userName: action.payload
            }
        }
        case UserAction.SET_USER_ID:{
            return {
                ...state, userId: action.payload
            }
        }
        case UserAction.SET_IS_LOGGED: {
            return {
                ...state, isLoggedIn: action.payload
            }
        }
        case UserAction.SET_ERROR_MSG: {
            return {
                ...state, errorMsg: action.payload
            }
        }
        case UserAction.SET_REGISTER_ERROR: {
            return {
                ...state, registerError: action.payload
            }
        }
        default: return state
    }
}
import { ACTION_TYPE } from '../actions';
import { ROLE } from "../bff/session";

const initialUserState = {
    id: null,
    login:  null,
    roleId: ROLE.GUEST,
    session:    null,

};

export const userReducer = (state = initialUserState, action) => {
    console.log(`in userReducer action.type = ${action.type}`);
    switch (action.type) {
        case ACTION_TYPE.SET_USER: {
            console.log(`in userReducer action.payload.login = ${action.payload.login}`);
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id,
                roleId: action.payload.roleId,
                session:    action.payload.session

            }
        }
        case ACTION_TYPE.LOGOUT: {
            console.log(`in userReducer in case action.type = ${action.type}`);
 
            return initialUserState;
        }

        default:
            return state;
    }
       
};
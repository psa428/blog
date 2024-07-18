import { ACTION_TYPE } from "./action-type";
import { server } from "../bff/server";

export const logout = (session) => {
    server.logout(session);

    console.log(`in actions logout ACTION_TYPE.LOGOUT = ${ACTION_TYPE.LOGOUT}`);
    return  {
        type:   ACTION_TYPE.LOGOUT,
    }
    
   

}
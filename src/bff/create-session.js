import { removeComment } from './session';

import { ROLE } from './session';


export const createSession = (roleId) => {
    const session = {
        logout() {
            Object.keys(session).forEach((key) => {
                delete session[key];
            });
        },

    };

    switch (roleId) {
        case ROLE.ADMIN: {
            session.removeComment = removeComment;
            break;
        }
        case ROLE.MODERATOR: {
            session.removeComment = removeComment;
            break;
        }
        case ROLE.READER: {
            session.removeComment = removeComment;
            break;
        }
        default:
    }  

    return session;
};
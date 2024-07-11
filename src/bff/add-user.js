import { generateDate } from "./generate-date";


export const addUser = (login, passsword) => fetch('http://localhost:3005/users', {
                method: 'POST',
                headers:    {
                    'Content-Type':  'application/json;charset=utf-8',
                },
                body:   JSON.stringify({
                    login:  login,
                    passsword:  passsword,
                    registred_at:   generateDate(),
                    role_id:    2,
                }),
        });

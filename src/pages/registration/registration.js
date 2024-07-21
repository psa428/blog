import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import { useEffect, useState } from 'react';
import { AuthFormError, Input, Button } from '../../components';
import { useResetForm } from '../../hooks';

import styled from 'styled-components';
import { setUser } from '../../actions';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../bff/operations/constants/role';

const regFormSchema = yup.object().shape({
    login:  yup.string()
        .required('Введите логин')
        .matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
        .min(3, 'Неверный логин. Длина должна быть не менее 3 цифр')
        .max(15, 'Неверный логин. Длина не более 15 символов'),
    password:   yup.string()
        .required ('Введите пароль') 
        .matches(/^[\w#%]+$/, 'Неверный пароль. Допускаяются буквы, цифры и символы # %')
        .min(6, 'Длина пароля не менее 8 символов')  
        .max(15, 'Длина пароле не более 15 символов'),
    passcheck:    yup
        .string()
        .required('Заполните повтор пароля')
        .oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),


});



 

const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState:  { errors }

    } = useForm({
        defaultValues:  {
            login:  '',
            password:   '',
            passcheck:  '',
        },
        resolver:   yupResolver(regFormSchema),

    });

    const [servseError, setServerError] = useState(null);
    useResetForm(reset);
    
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    

    const onSubmit = ({ login, password}) => {
        
        server.register(login, password).then(({error, res}) => {
            
            
            if (error) {  
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
                dispatch(setUser(res));
        });
    };
    const formError = errors.login?.message || errors?.password?.message || errors?.passcheck?.message ;

    const errorMessage = formError || servseError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/"></Navigate>

    }

    return (
        <div className={className}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    type="text" 
                    placeholder="Логин..." 
                    {...register('login', {
                        onChange: () => setServerError(null),
                    })} />
                <Input type="password" 
                    placeholder="Пароль..." 
                    {...register('password', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input type="password" 
                    placeholder="Проверка пароля..." 
                    {...register('passcheck', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Зарегистрироваться
                </Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
                
                
            </form>


        </div>

    );
};

export const Registration = styled(RegistrationContainer)`
    display:    flex;
    flex-direction: column;
    align-items:   center;

    & > form {
        display:    flex;
        flex-direction: column;
        width:  260px;
    }
    

`;
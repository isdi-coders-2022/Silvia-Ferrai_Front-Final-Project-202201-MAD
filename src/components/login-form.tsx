import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserLoginI } from '../interfaces/userLogin';
import * as actionCreators from '../redux/user/actionCreators';

function LoginForm() {
    const [setLogin, setNewLogin] = useState<UserLoginI>({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (ev: any) => {
        setNewLogin({ ...setLogin, [ev.target.name]: ev.target.value });
    };

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();
        dispatch(actionCreators.login(setLogin));
        navigate('/');
    };

    return (
        <form className="form-container">
            <input
                className="form-container__username"
                type="text"
                name="username"
                placeholder="Sammy"
                value={setLogin.username}
                onChange={handleChange}
            />

            <input
                className="form-container__password"
                type="password"
                name="password"
                placeholder="123"
                value={setLogin.password}
                onChange={handleChange}
            />
            <button
                className="form-container__button"
                type="submit"
                onClick={handleSubmit}
            >
                LOGIN
            </button>
        </form>
    );
}

export default LoginForm;

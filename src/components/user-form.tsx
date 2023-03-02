import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/user/actionCreators';
import { UserI } from '../interfaces/user';

function UserForm() {
    const [user, setUser] = useState<UserI>({
        username: '',
        password: '',
        role: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (ev: any) => {
        setUser({ ...user, [ev.target.name]: ev.target.value });
    };

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();
        dispatch(actionCreators.register(user));
        navigate('/login');
    };

    return (
        <form className="form-container">
            <input
                className="form-container__username"
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
            />
            <div className="form-container__block">
                <span className="form-container__block form-container__block--sala">
                    Sala
                </span>
                <input
                    className="form-container__select"
                    type="radio"
                    name="role"
                    placeholder="role"
                    value="Sala"
                    onChange={handleChange}
                />
                <span className="form-container__block form-container__block--cocina">
                    Cocina
                </span>
                <input
                    className="form-container__select"
                    type="radio"
                    name="role"
                    placeholder="role"
                    value="Cocina"
                    onChange={handleChange}
                />
            </div>
            <input
                className="form-container__password"
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
            />
            <button
                className="form-container__button"
                type="submit"
                onClick={handleSubmit}
            >
                REGÍSTRATE
            </button>
        </form>
    );
}
export default UserForm;

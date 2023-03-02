/* eslint-disable no-undef */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faUtensils } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import * as actions from '../../redux/user/actionCreators';

const weekDay = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
];

function Header() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const user = useSelector((state: RootState) => state.user);
    const [showLogin, setShowLogin] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentTime(
            `${weekDay[new Date().getDay()]} ${new Date().toLocaleString()}`
        );
        setInterval(() => {
            setCurrentTime(
                `${weekDay[new Date().getDay()]} ${new Date().toLocaleString()}`
            );
        }, 1000);
    }, []);

    const handleLogin = () => {
        if (user.isLogged) {
            dispatch(actions.logout());
        } else {
            setShowLogin(!showLogin);
        }
    };

    return (
        <div className="header-container">
            <h1 className="header-title">ECCO tpv</h1>
            <p className="time-header">{currentTime}</p>
            {!user.isLogged ? (
                <Link to="/login" className="link-login">
                    <div
                        className="link-login"
                        role="button"
                        tabIndex={0}
                        onKeyPress={handleLogin}
                        onClick={handleLogin}
                    >
                        Login
                    </div>
                </Link>
            ) : (
                <Link to="/login" className="link-login">
                    <div
                        className="link-login"
                        tabIndex={0}
                        role="button"
                        onClick={handleLogin}
                        onKeyPress={handleLogin}
                    >
                        Logout
                    </div>
                </Link>
            )}

            <div className="icons">
                <Link to="/kitchen">
                    <FontAwesomeIcon
                        className="icon-settings"
                        icon={faClipboardList}
                    />
                </Link>
                <Link to="/">
                    <FontAwesomeIcon
                        className="icon-settings"
                        icon={faUtensils}
                    />
                </Link>
            </div>
        </div>
    );
}
export default Header;

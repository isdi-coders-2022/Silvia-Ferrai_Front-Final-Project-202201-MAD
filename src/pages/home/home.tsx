/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'; // , { useState }
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {
    createNewTicket,
    getAllTickets,
} from '../../redux/ticket/actionCreator';
import { RootState } from '../../redux/store';
import './home.scss';

import * as api from '../../services/ticket.api';

function Home() {
    const user = useSelector((state: RootState) => state.user);
    const ticket = useSelector((state: RootState) => state.ticket);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createTicket = async () => {
        const { data: createdTicket } = await api.createTicket(
            { items: [] },
            user.token
        );
        dispatch(createNewTicket(createdTicket));

        navigate(`/ticket/${createdTicket._id}`);
    };

    useEffect(() => {
        dispatch(getAllTickets());
    }, [dispatch]);

    return (
        <div className="home">
            <div className="home-table">
                <div className="home__add">
                    <FontAwesomeIcon
                        className="home__icon"
                        role="button"
                        tabIndex={0}
                        onClick={createTicket}
                        onKeyPress={createTicket}
                        icon={faCirclePlus}
                    />

                    <p className="home__add home__add--table"> NUEVA MESA</p>
                </div>
            </div>
            <ul className="home__list">
                {ticket.length &&
                    ticket.map((item: any, index: number) => (
                        <Link
                            className="home__list home__list--block"
                            to={`/ticket/${item._id}`}
                        >
                            <img
                                className="home__list home__list--table-pic"
                                src="./assets/413141-PDTI1J-153.png"
                                alt="table"
                                key={item._id}
                            />
                            <li className="home__list home__list--table">
                                MESA {index + 1}
                            </li>
                        </Link>
                    ))}
            </ul>
        </div>
    );
}

export default Home;

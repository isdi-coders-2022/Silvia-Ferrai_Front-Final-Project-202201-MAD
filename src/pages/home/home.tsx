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
import { TicketI } from '../../interfaces/ticket';

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
                <div
                    role="button"
                    className="home__add"
                    onClick={createTicket}
                    onKeyPress={createTicket}
                    tabIndex={0}
                >
                    <FontAwesomeIcon
                        className="home__icon"
                        icon={faCirclePlus}
                    />

                    <p className="home__add home__add--table"> NUEVA MESA</p>
                </div>
            </div>
            <ul className="home__list">
                {ticket.length &&
                    ticket.map((item: TicketI, index: number) => (
                        <li key={item._id} className="home__list--block">
                            <Link to={`/ticket/${item._id}`}>
                                <img
                                    className="home__list--table-pic"
                                    src="./assets/413141-PDTI1J-153.png"
                                    alt="table"
                                />
                                <p className="home__list home__list--table">
                                    MESA {index + 1}
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Home;

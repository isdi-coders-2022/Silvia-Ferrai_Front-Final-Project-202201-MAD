/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Products from '../../components/products';
import { RootState } from '../../redux/store';
import {
    updateProductIntoTicket,
    removeProductIntoTicket,
} from '../../redux/ticket/actionCreator';
import './ticketPage.scss';
import { ItemI, TicketI } from '../../interfaces/ticket';

function TicketPage() {
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.user);
    const ticketInfo = useSelector((state: RootState) => state.ticket);
    const indexTicket: number = useSelector((state: RootState) =>
        state.ticket.findIndex((item: TicketI) => item._id === id)
    );

    let commandTotal = 0;
    let unitsTotal = 0;

    const [actualTicket, setActualTicket] = useState<TicketI>();

    useEffect(() => {
        setActualTicket(ticketInfo.find((item: TicketI) => item._id === id));
    }, [ticketInfo]);

    const dispatch = useDispatch();

    const updateTicket = (idItem: number) =>
        dispatch(updateProductIntoTicket(id, idItem, user.token));

    const deleteFromTicket = (idItem: number) =>
        dispatch(removeProductIntoTicket(id as string, idItem, user.token));

    return (
        <div className="container-grid">
            <div className="block1">
                <h3 className="ticket-title">
                    Ticket Mesa N. {indexTicket + 1}
                </h3>

                <div className="block-ticket">
                    <div className="ticket-subtitle">
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Uds:
                        </p>
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Article:
                        </p>
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Imp:
                        </p>
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Tot:
                        </p>
                    </div>
                    <ul className="list">
                        {actualTicket &&
                            actualTicket.items?.length &&
                            actualTicket.items.map((el: ItemI) => {
                                // console.log(actualTicket.items);
                                const itemsTotalAmount =
                                    el.article.price * el.uds;
                                commandTotal += +itemsTotalAmount;
                                unitsTotal += el.uds;

                                return (
                                    <div
                                        key={el._id}
                                        className="ticket-subtitle__elements"
                                    >
                                        <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                            <FontAwesomeIcon
                                                icon={faMinus}
                                                className="icon"
                                                onClick={() =>
                                                    deleteFromTicket(
                                                        el.article.id
                                                    )
                                                }
                                                data-testid="test-up"
                                            />
                                            {el.uds}
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon"
                                                onClick={() =>
                                                    updateTicket(el.article.id)
                                                }
                                            />
                                        </li>
                                        <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                            {el.article.item}
                                        </li>
                                        <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                            {el.article.price.toFixed(2)}
                                        </li>
                                        <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                            {(
                                                el.article.price * el.uds
                                            ).toFixed(2)}
                                        </li>
                                    </div>
                                );
                            })}
                    </ul>
                </div>
                <div className="tot">
                    <div>Tot uds: {unitsTotal}</div>

                    <div>Tot. {commandTotal.toFixed(2)}€</div>
                </div>
            </div>
            <div className="block2">
                <Products />
            </div>
            <div className="block3">
                <Link className="link" to="/">
                    <div className="block3__list block3__list--sala">Sala</div>
                </Link>

                <Link to={`/closeTicket/${id}/${commandTotal.toFixed(2)}`}>
                    <div className="block3__list block3__list--close">
                        Cerrar Ticket
                    </div>
                </Link>
                <div className="block3__list block3__list--invite">
                    Invitacíon
                </div>
                <div />
            </div>
        </div>
    );
}

export default TicketPage;

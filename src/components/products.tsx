/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../redux/products/actionCreators';
import { RootState } from '../redux/store';
import { updateProductIntoTicket } from '../redux/ticket/actionCreator';
import { ArticleI } from '../interfaces/ticket';

function Modal() {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>
                    Para modificar o añadir un nuevo ticket tienes que hacer el
                    login!
                </p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

function Products() {
    const product = useSelector((state: RootState) => state.product);
    const user = useSelector((state: RootState) => state.user);
    const [itemProduct, setItemProduct] = useState([]);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    function filterProduct(category: string) {
        const filteredItem = product.filter(
            (el: ArticleI) => el.type === category
        );

        setItemProduct(filteredItem as any);
    }

    const updateTicket = (idItem: number) =>
        dispatch(updateProductIntoTicket(id as string, idItem, user.token));

    return (
        <>
            <div className="types">
                {!user.token && <Modal />}
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/kawaii-pizza.jpg?alt=media&token=27fcecf4-e97c-42c4-af85-e10674470f13"
                        alt="pizza"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {
                            filterProduct('pizza');
                        }}
                        onClick={() => {
                            filterProduct('pizza');
                        }}
                    />
                    <p className="types__name">PIZZA</p>
                </div>
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/emsalada2.jpg?alt=media&token=808356f5-7d61-4e80-8a17-94dc03b3cde7"
                        alt="salad"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {
                            filterProduct('ensalada');
                        }}
                        onClick={() => {
                            filterProduct('ensalada');
                        }}
                    />
                    <p className="types__name">ENSALADA</p>
                </div>
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/postre.jpg?alt=media&token=ce32a835-a104-4340-a7fa-597dd2aad005"
                        alt="postre"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {
                            filterProduct('postre');
                        }}
                        onClick={() => {
                            filterProduct('postre');
                        }}
                    />
                    <p className="types__name">POSTRE</p>
                </div>
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/caffe.jpg?alt=media&token=533b5251-ef2c-4bc9-ad28-05bdf73f44f3"
                        alt="café"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {
                            filterProduct('café');
                        }}
                        onClick={() => {
                            filterProduct('café');
                        }}
                    />

                    <div className="types__name"> CAFÉ</div>
                </div>
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/refresco.jpg?alt=media&token=e5f9052b-151e-483f-8d7d-b30dd8e30cfa"
                        alt="refresco"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {
                            filterProduct('refresco');
                        }}
                        onClick={() => {
                            filterProduct('refresco');
                        }}
                    />
                    <div className="types__name">REFRESCO</div>
                </div>
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/vino-bottle.jpg?alt=media&token=200fa322-c2af-4d8b-af12-a10c39f6994f"
                        alt="vino"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => {
                            filterProduct('vino');
                        }}
                        onClick={() => {
                            filterProduct('vino');
                        }}
                    />
                    <div className="types__name">VINO</div>
                </div>
                <div style={{ margin: '0 10px 10px 0' }}>
                    <img
                        className="image"
                        src="https://firebasestorage.googleapis.com/v0/b/ecco-cfc75.appspot.com/o/cerveza-bottle.jpg?alt=media&token=93e3be7e-f566-4030-ba8b-3f1013638386"
                        alt="cerveza"
                        role="button"
                        tabIndex={0}
                        // onKeyPress={() => {
                        //     filterProduct('cerveza');
                        // }}
                        onClick={() => {
                            filterProduct('cerveza');
                        }}
                    />
                    <div className="types__name">CERVEZA</div>
                </div>
            </div>

            <ul className="products">
                {itemProduct.length &&
                    itemProduct.map((el: ArticleI) => (
                        <li
                            key={el.id}
                            className="products__item"
                            onClick={() => updateTicket(el.id)}
                        >
                            {el.item}
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default Products;

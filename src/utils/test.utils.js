/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer

import { userReducer } from '../redux/user/reducer';
import { ticketReducer } from '../redux/ticket/reducer';
import { productsReducer } from '../redux/products/reducer';

function render(
    ui,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                ticket: ticketReducer,
                user: userReducer,
                product: productsReducer,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

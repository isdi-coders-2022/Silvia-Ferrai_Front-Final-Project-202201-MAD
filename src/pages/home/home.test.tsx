// eslint-disable-next-line no-unused-vars
import React from 'react';

jest.mock('../../services/ticket.api', () => ({
    createTicket: () =>
        Promise.resolve({
            data: {
                _id: 'sdsdsdsd',
                test: 'test',
            },
        }),
}));

describe('Given home ', () => {
    describe('When createTicket is called', () => {
        test('Dispatch, createTicket is called with successful action', async () => {});
    });
});

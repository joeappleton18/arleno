import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateDeleteToggle from '.';

describe('UpdateDeleteToggle', () => {
    test('renders component', () => {
        render(<UpdateDeleteToggle />);
    });

    test('fires update/delete events', async () => {

        const handleUpdate = jest.fn();
        const handleDelete = jest.fn();
        render(<UpdateDeleteToggle onDelete={handleDelete} onEdit={handleUpdate} />);

        const button = screen.getByRole('button');
        
        fireEvent.click(button);
        const deleteItem = screen.getByText(/delete/i);
        const updateItem = screen.getByText(/edit/i);

        fireEvent.click(deleteItem);
        fireEvent.click(updateItem);
        expect(handleUpdate).toHaveBeenCalledTimes(1);
        expect(handleDelete).toHaveBeenCalledTimes(1);

    });
});
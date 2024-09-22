import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarsSearch from '../components/carsSearch';

describe('CarsSearch Component', () => {
    test('renders search input and button', () => {
        render(
            <MemoryRouter>
                <CarsSearch />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/buscar carro/i) as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /buscar/i });
        expect(button).toBeInTheDocument();
    });

    test('allows user to input search term', () => {
        render(
            <MemoryRouter>
                <CarsSearch />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/buscar carro/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Toyota' } });
        expect(input.value).toBe('Toyota');
    });

    test('triggers search function on form submit', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log');

        render(
            <MemoryRouter>
                <CarsSearch />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/buscar carro/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Toyota' } });

        const button = screen.getByRole('button', { name: /buscar/i });
        
        await act(async () => {
            fireEvent.click(button);
        });

        expect(consoleLogSpy).toHaveBeenCalledWith("Função chamada com dados:", { search: 'Toyota' });

        consoleLogSpy.mockRestore();
    });
});

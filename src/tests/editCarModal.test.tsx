import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditCarModal from '../components/modal/editCarModal';

describe('EditCarModal', () => {
    const mockEditCar = jest.fn();
    const mockOnClose = jest.fn();
    const car = {
        id: '1',
        brand: 'Toyota',
        name: 'Corolla',
        color: 'Vermelho',
        year: 2020,
        price: 150000,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders modal when isOpen is true', () => {
        render(<EditCarModal isOpen={true} onClose={mockOnClose} editCar={mockEditCar} car={car} />);
        expect(screen.getByText('Editar carro')).toBeInTheDocument();;
    });

    test('closes modal when close button is clicked', () => {
        render(<EditCarModal isOpen={true} onClose={mockOnClose} editCar={mockEditCar} car={car} />);
        const closeButton = screen.getByLabelText(/fechar modal/i);
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('calls editCar with correct data when the form is submitted', async () => {
        render(<EditCarModal isOpen={true} onClose={mockOnClose} editCar={mockEditCar} car={car} />);

        await waitFor(() => {
            expect((screen.getByTestId("brand-input") as HTMLInputElement).value).toBe('Toyota');
            expect((screen.getByTestId("name-input") as HTMLInputElement).value).toBe('Corolla');
        });

        fireEvent.change(screen.getByTestId("brand-input"), { target: { value: 'Ford' } });
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: 'Fusca' } });

        fireEvent.click(screen.getByText(/Salvar/i));

        await waitFor(() => {
            expect(mockEditCar).toHaveBeenCalledWith({
                id: "1",
                brand: "Ford",
                name: "Fusca",
                price: 150000,
                color: "Vermelho",
                year: 2020
            });
        });
    });


    test('shows validation errors on invalid input', async () => {
        render(<EditCarModal isOpen={true} onClose={mockOnClose} editCar={mockEditCar} car={car} />);

        fireEvent.change(screen.getByTestId("brand-input"), { target: { value: 'aaa' } });
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: 'aa' } });
        fireEvent.change(screen.getByTestId("color-input"), { target: { value: 'a' } });
        fireEvent.change(screen.getByTestId("price-input"), { target: { value: 500 } });

        fireEvent.click(screen.getByText(/Salvar/i));

        expect(await screen.findByText(/Marca tem que ter no mínimo 4 digitos/i)).toBeInTheDocument();
        expect(await screen.findByText(/Nome tem que ter no mínimo 3 digitos/i)).toBeInTheDocument();
        expect(await screen.findByText(/O preço deve ser um valor positivo acima de 1000/i)).toBeInTheDocument();
        expect(await screen.findByText(/Cor é obrigatória/i)).toBeInTheDocument();
    });

});

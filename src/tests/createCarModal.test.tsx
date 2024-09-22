import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCarModal from "../components/modal/createCarModal";

describe('CreateCarModal', () => {
    const mockCreateCar = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders modal when isOpen is true', () => {
        render(<CreateCarModal isOpen={true} onClose={mockOnClose} createCar={mockCreateCar} />);

        expect(screen.getByText('Adicione um carro')).toBeInTheDocument();
    });

    test('closes modal when close button is clicked', () => {
        render(<CreateCarModal isOpen={true} onClose={mockOnClose} createCar={mockCreateCar} />);

        const closeButton = screen.getByLabelText(/fechar modal/i);
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should call createCar with correct data when the form is submitted", async () => {
        render(
          <CreateCarModal 
            isOpen={true} 
            onClose={mockOnClose} 
            createCar={mockCreateCar} 
          />
        );
    
        fireEvent.change(screen.getByTestId("brand-input"), { target: { value: "Toyota" } });
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Corolla" } });
        fireEvent.change(screen.getByTestId("color-input"), { target: { value: "Vermelho" } });
        fireEvent.change(screen.getByTestId("year-input"), { target: { value: 2020 } });
        fireEvent.change(screen.getByTestId("price-input"), { target: { value: 150000 } });
    
        const submitButton = screen.getByText("Salvar");
        fireEvent.click(submitButton);
        
        // Aguarda a chamada do mock
        await waitFor(() => {
            expect(mockCreateCar).toHaveBeenCalledWith({
              brand: "Toyota",
              name: "Corolla",
              color: "Vermelho",
              year: 2020,
              price: 150000,
              id: expect.any(String),
            });
        });
    });

    test('shows validation errors on invalid input', async () => {
        render(<CreateCarModal isOpen={true} onClose={mockOnClose} createCar={mockCreateCar} />);

        fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

        expect(await screen.findByText(/Marca tem que ter no mínimo 4 digitos/i)).toBeInTheDocument();
        expect(await screen.findByText(/Nome tem que ter no mínimo 3 digitos/i)).toBeInTheDocument();
        expect(await screen.findByText(/O preço deve ser um valor positivo acima de 1000/i)).toBeInTheDocument();
        expect(await screen.findByText(/Cor é obrigatória/i)).toBeInTheDocument();
        expect(await screen.findByText(/Ano inválido/i)).toBeInTheDocument();
    });
});

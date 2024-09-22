import { render, screen } from '@testing-library/react';
import CarCard from '../components/carCard';

const mockRemove = jest.fn();
const mockEdit = jest.fn();

const carMock = {
    id: '1',
    brand: 'Volkswagen',
    name: 'Fusca',
    price: 20000,
    color: 'blue',
    year: 1976,
};

test('should render car information correctly', () => {
    render(<CarCard car={carMock} remove={mockRemove} edit={mockEdit} />);
    
    expect(screen.getByText(/Volkswagen/i)).toBeInTheDocument();
    expect(screen.getByText(/Fusca/i)).toBeInTheDocument();
    expect(screen.getByText(/1976/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 20.000,00/i)).toBeInTheDocument();
});

test('should not render car information if car is null', () => {
    render(<CarCard car={null} remove={mockRemove} edit={mockEdit} />);
    
    expect(screen.queryByText(/Volkswagen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fusca/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/1976/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/R\$ 20.000,00/i)).not.toBeInTheDocument();
});

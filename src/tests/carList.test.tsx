import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import CarList from '../components/carList';

const queryClient = new QueryClient();

const mockCars = [
  {
    id: '1',
    brand: 'Volkswagen',
    name: 'Fusca',
    price: 20000,
    color: 'blue',
    year: 1976,
  },
  {
    id: '2',
    brand: 'Ford',
    name: 'Civic',
    price: 30000,
    color: 'red',
    year: 2020,
  },
];

describe('CarList Component', () => {
  test('should render car cards correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <CarList list={mockCars} />
        </QueryClientProvider>
      </MemoryRouter>
    );

    mockCars.forEach(car => {
      expect(getByText(car.name)).toBeInTheDocument();
      expect(getByText(car.brand)).toBeInTheDocument();
      expect(getByText(car.year)).toBeInTheDocument();

      const formattedPrice = `R$ ${car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},00`;
      expect(getByText(formattedPrice)).toBeInTheDocument();

    });
  });
});

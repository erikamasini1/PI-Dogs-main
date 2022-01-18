import { render, screen } from '@testing-library/react';
import Dog from '../components/Dog';
import { MemoryRouter } from 'react-router-dom';

test('Should render dog component', () => {
  render(
    <MemoryRouter>
      <Dog />
    </MemoryRouter>
  );
  expect(screen.getByText(/Temperaments:/i)).toBeInTheDocument();
  expect(screen.getByText(/Weight:/i)).toBeInTheDocument();
});

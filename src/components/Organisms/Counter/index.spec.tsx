import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './index';

// Mocking the useTranslation hook from react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str, // This mock simply returns the input string
    };
  },
}));

describe('<Counter />', () => {
  it('renders the initial count', () => {
    const { getByText } = render(<Counter count={5} setCount={() => {}} />);
    expect(getByText('5')).toBeInTheDocument();
  });

  it('increments the count', () => {
    const mockSetCount = jest.fn();
    const { getByText } = render(<Counter count={5} setCount={mockSetCount} />);
    
    fireEvent.click(getByText('+'));
    expect(mockSetCount).toHaveBeenCalledWith(6);
  });

  it('decrements the count', () => {
    const mockSetCount = jest.fn();
    const { getByText } = render(<Counter count={5} setCount={mockSetCount} />);
    
    fireEvent.click(getByText('-'));
    expect(mockSetCount).toHaveBeenCalledWith(4);
  });

  it('renders the translated title', () => {
    const { getByText } = render(<Counter count={5} setCount={() => {}} />);
    expect(getByText('counter:title')).toBeInTheDocument();
  });
});
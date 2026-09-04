import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with children text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
    expect(button).toHaveClass('btn-md');
  });

  test('renders different variants', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('btn-secondary');
    
    rerender(<Button variant="danger">Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('btn-danger');
  });

  test('renders different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('btn-sm');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('btn-lg');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('handles user click with userEvent', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies additional className', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toHaveClass('custom-class');
  });
});
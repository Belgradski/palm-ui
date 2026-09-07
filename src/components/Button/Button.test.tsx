
import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button components', () => {
    test('render button with children text', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByText('Click me')
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn-primary')
        expect(button).toHaveClass('btn-md')
    });

    test('render different variants', () => {
        const {rerender} = render(<Button variant='secondary'>Test</Button>)
        expect(screen.getByText('Test')).toHaveClass('btn-secondary')
        rerender(<Button variant='danger'>Test</Button>)
        expect(screen.getByText('Test')).toHaveClass('btn-danger')
    });

    test('render different size', () => {
        const {rerender} = render(<Button size='sm'>Small</Button>)
        expect(screen.getByText('Small')).toHaveClass('btn-sm');
        rerender(<Button size='lg'>Large</Button>)
        expect(screen.getByText('Large')).toHaveClass('btn-lg')
    })

    test('handle click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me bro</Button>)
        const button = screen.getByText('Click me bro');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('added custom className', () => {
        render(<Button className='customClassName'>Custom classname</Button>)
        expect(screen.getByText('Custom classname')).toHaveClass('customClassName')
    })

    test('handle user click with userEvent', async() => {
        const handleClick = jest.fn()
        const user = userEvent.setup()
        render(<Button onClick={handleClick}>user click button</Button>)
        const button = screen.getByText('user click button')
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
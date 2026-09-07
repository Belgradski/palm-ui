import { SmartTooltip } from "./SmartTooltip";
import {render, screen, fireEvent, getByRole, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'


describe('SmartTooltip component', () => {
    test('render children without tooltip on a initialization', () => {
        render(
            <SmartTooltip text='Подсказка для пользователя'>
                <button>Наведи на меня</button>
            </SmartTooltip>
        );
        const button = screen.getByRole('button', {name: 'Наведи на меня'});
        expect(button).toBeInTheDocument();
        const tooltip = screen.queryByText('Подсказка для пользователя')
        expect(tooltip).not.toBeInTheDocument()
    });

    test('show a tooltip on hover', async() => {
        const user = userEvent.setup();
        render(<SmartTooltip text="Всплывающая подсказка">
            <button>Тестовая кнопка</button>
        </SmartTooltip>)
        const button = screen.getByRole('button', {name: 'Тестовая кнопка'})
        await user.hover(button)
        const tooltip = await screen.findByText('Всплывающая подсказка');
        expect(tooltip).toBeInTheDocument()
        expect(tooltip).toHaveClass('smart-tooltip')
    });

    test('hide a tooltip when the cursor moves away', async() => {
        const user = userEvent.setup();
        render(<SmartTooltip text="Скрываемая подсказка">
            <button>Кнопка</button>
        </SmartTooltip>)
        const button = screen.getByRole('button',{name: 'Кнопка'});
        await user.hover(button);
        const tooltip = await screen.findByText('Скрываемая подсказка')
        expect(tooltip).toBeInTheDocument();
        await user.unhover(button);
        await waitFor(() => {
            expect(screen.queryByText('Скрываемая подсказка')).not.toBeInTheDocument()
        }) 
    });
    


})
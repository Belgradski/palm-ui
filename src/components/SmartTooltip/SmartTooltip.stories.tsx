import type { Meta, StoryObj } from '@storybook/react'
import { SmartTooltip } from './SmartTooltip'

const meta: Meta<typeof SmartTooltip> = {
  title: 'Components/SmartTooltip',
  component: SmartTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст подсказки',
      defaultValue: 'Подсказка',
    },
    children: {
        control: 'text',
        description: 'Элемент над которым появляется подсказка',
    }
    
  },
}

export default meta
type Story = StoryObj<typeof SmartTooltip>

export const Primary: Story = {
  args: {
    text: 'Подсказка при наведениии',
    children: <button>Наведи на меня</button>,
  },
}
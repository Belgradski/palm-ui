import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Кнопка',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Кнопка',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Кнопка',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Большая кнопка',
  },
}
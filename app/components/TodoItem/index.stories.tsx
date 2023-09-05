import type { Meta, StoryObj } from "@storybook/react"

import TodoItem from "./"

const meta = {
  title: "Components/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TodoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    todo: {
      id: "1",
      text: "Foo 1",
      dueAt: "2023-01-01",
      createdAt: "2023-01-01",
      isComplete: false,
    },
  },
}

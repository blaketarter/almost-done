import type { Meta, StoryObj } from "@storybook/react"

import TodoList from "./"

const meta = {
  title: "Components/TodoList",
  component: TodoList,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TodoList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    todos: [
      {
        id: "1",
        text: "Foo 1",
        dueAt: "2023-01-01",
        createdAt: "2023-01-01",
        isComplete: false,
      },
    ],
  },
}

import type { Meta, StoryObj } from "@storybook/react"

import TodoCalendar from "./"

const meta = {
  title: "Components/TodoCalendar",
  component: TodoCalendar,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TodoCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

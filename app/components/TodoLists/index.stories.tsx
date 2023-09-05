import type { Meta, StoryObj } from "@storybook/react"

import TodoLists from "./"

const meta = {
  title: "Components/TodoLists",
  component: TodoLists,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TodoLists>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

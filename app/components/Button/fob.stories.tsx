import type { Meta, StoryObj } from "@storybook/react"

import { FobButton } from "."

const meta = {
  title: "Components/FobButton",
  component: FobButton,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof FobButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Example Fob",
  },
}

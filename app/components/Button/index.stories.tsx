import type { Meta, StoryObj } from "@storybook/react"

import Button from "."

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Example Button",
  },
}

export const Light: Story = {
  args: {
    children: "Light Button",
    variant: "lightPrimary",
  },
}

export const Dark: Story = {
  args: {
    children: "Dark Button",
    variant: "darkPrimary",
  },
}

export const Brand: Story = {
  args: {
    children: "Brand Button",
    variant: "brandPrimary",
  },
}

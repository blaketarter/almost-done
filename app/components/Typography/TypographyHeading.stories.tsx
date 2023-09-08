import type { Meta, StoryObj } from "@storybook/react"

import { TypographyHeading } from "."

const meta = {
  title: "Components/TypographyHeading",
  component: TypographyHeading,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TypographyHeading>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    children: "Example H1",
    variant: "h1",
  },
}

export const H2: Story = {
  args: {
    children: "Example H2",
    variant: "h2",
  },
}

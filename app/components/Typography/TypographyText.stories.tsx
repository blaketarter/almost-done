import type { Meta, StoryObj } from "@storybook/react"

import { TypographyText } from "."

const meta = {
  title: "Components/TypographyText",
  component: TypographyText,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TypographyText>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {
  args: {
    children: "Example Body Text",
    variant: "body",
  },
}

export const BodyLarge: Story = {
  args: {
    children: "Example Large Body Text",
    variant: "bodyLarge",
  },
}

export const Label: Story = {
  args: {
    children: "Example Label Text",
    variant: "label",
  },
}

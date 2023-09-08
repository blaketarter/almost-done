import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const h1 = defineStyle({
  fontSize: "56px",
  fontWeight: "700",
  lineHeight: "110%",
})

const h2 = defineStyle({
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "110%",
})

const body = defineStyle({
  fontSize: "18px",
  fontWeight: "500",
})

const bodyLarge = defineStyle({
  fontSize: "22px",
  fontWeight: "500",
})

const label = defineStyle({
  fontSize: "16px",
  fontWeight: "500",
})

export const headingTheme = defineStyleConfig({
  variants: {
    h1,
    h2,
  },
})

export const textTheme = defineStyleConfig({
  variants: {
    body,
    bodyLarge,
    label,
  },
})

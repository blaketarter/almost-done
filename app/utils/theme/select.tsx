import { selectAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const lightPrimary = definePartsStyle({
  field: {
    background: "trueWhite",
    color: "black.500",

    _hover: {
      background: "white.800",
    },
  },
})

const darkPrimary = definePartsStyle({
  field: {
    background: "black.500",
    color: "white.500",

    _hover: {
      background: "black.800",
    },
  },
  icon: {
    color: "white.500",
  },
})

const brandPrimary = definePartsStyle({
  field: {
    background: "brand.500",
    color: "white.500",

    _hover: {
      background: "brand.100",
    },
  },
  icon: {
    color: "white.500",
  },
})

const baseStyle = definePartsStyle({
  field: {
    borderRadius: 6,
    padding: "8px 20px 8px 20px",
    boxShadow: "0px 4px 4px 0px #00000040",
    background: "trueWhite",
    color: "black.500",

    _hover: {
      background: "white.800",
    },
  },
})

const selectTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    lightPrimary,
    darkPrimary,
    brandPrimary,
  },
})

export default selectTheme

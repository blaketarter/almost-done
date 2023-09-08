import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const lightPrimary = defineStyle({
  background: "white.500",
  color: "black.500",

  _hover: {
    background: "white.800",
  },
})

const darkPrimary = defineStyle({
  background: "black.500",
  color: "white.500",

  _hover: {
    background: "black.800",
  },
})

const brandPrimary = defineStyle({
  background: "brand.500",
  color: "white.500",

  _hover: {
    background: "brand.100",
  },
})

const fobPrimary = defineStyle({
  background: "brand.500",
  color: "white.500",
  height: "52px",
  width: "52px",
  borderRadius: "100%",

  _hover: {
    background: "brand.100",
  },
})

const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 6,
    padding: "8px 20px 8px 20px",
    boxShadow: "0px 4px 4px 0px #00000040",
  },
  variants: {
    lightPrimary,
    darkPrimary,
    brandPrimary,
    fobPrimary,
  },
})

export default buttonTheme

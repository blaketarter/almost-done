import { extendTheme } from "@chakra-ui/react"
import font from "../font"
import buttonTheme from "./buttons"
import { headingTheme, textTheme } from "./typography"

export const colors = {
  white: "#F8F8F8",
  darkWhite: "#EDEDED",
  black: "#3B3640",
  darkBlack: "#0B0A0C",
  purple: "#6955B7",
  lightPurple: "#7E79C9",
}

const theme = extendTheme({
  fonts: {
    heading: font.style.fontFamily,
    body: font.style.fontFamily,
  },
  colors: {
    white: {
      100: colors.white,
      200: colors.white,
      300: colors.white,
      400: colors.white,
      500: colors.white,
      600: colors.white,
      700: colors.white,
      800: colors.darkWhite,
    },
    black: {
      100: colors.black,
      200: colors.black,
      300: colors.black,
      400: colors.black,
      500: colors.black,
      600: colors.black,
      700: colors.black,
      800: colors.darkBlack,
    },
    brand: {
      100: colors.lightPurple,
      200: colors.purple,
      300: colors.purple,
      400: colors.purple,
      500: colors.purple,
      600: colors.purple,
      700: colors.purple,
      800: colors.purple,
    },
  },
  components: {
    Button: buttonTheme,
    Heading: headingTheme,
    Text: textTheme,
  },
})

export default theme

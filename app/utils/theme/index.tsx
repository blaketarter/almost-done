import { extendTheme } from "@chakra-ui/react"
import font from "../font"

const theme = extendTheme({
  fonts: {
    heading: font.style.fontFamily,
    body: font.style.fontFamily,
  },
})

export default theme

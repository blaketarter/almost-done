import { Box, BoxProps } from "@chakra-ui/react"
import { ReactNode } from "react"

interface CardProps extends BoxProps {
  children: ReactNode
}

export default function Card({ children, ...props }: CardProps) {
  return (
    <Box
      background="offWhite"
      boxShadow="2px 3px 4px 0px #00000014"
      padding="14px"
      borderRadius="6px"
      {...props}
    >
      {children}
    </Box>
  )
}

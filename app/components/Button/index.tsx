import { AddIcon } from "@chakra-ui/icons"
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react"
import { ReactNode } from "react"

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
}

export default function Button(props: ButtonProps) {
  return <ChakraButton {...props} />
}

export function LightButton(props: ButtonProps) {
  return <ChakraButton variant="lightPrimary" {...props} />
}

export function DarkButton(props: ButtonProps) {
  return <ChakraButton variant="darkPrimary" {...props} />
}

export function BrandButton(props: ButtonProps) {
  return <ChakraButton variant="brandPrimary" {...props} />
}

export function FobButton({ children, ...props }: ButtonProps) {
  return (
    <ChakraButton variant="fobPrimary" {...props}>
      <AddIcon />
    </ChakraButton>
  )
}

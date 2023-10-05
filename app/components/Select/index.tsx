import {
  SelectProps as ChakraSelectProps,
  Select as ChakraSelect,
} from "@chakra-ui/react"

interface SelectProps extends ChakraSelectProps {}

export default function Select(props: SelectProps) {
  return <ChakraSelect {...props} />
}

export function LightSelect(props: SelectProps) {
  return <ChakraSelect variant="lightPrimary" {...props} />
}

export function DarkSelect(props: SelectProps) {
  return <ChakraSelect variant="darkPrimary" {...props} />
}

export function BrandSelect(props: SelectProps) {
  return <ChakraSelect variant="brandPrimary" {...props} />
}

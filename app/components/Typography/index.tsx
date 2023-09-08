import { Heading, HeadingProps, Text, TextProps } from "@chakra-ui/react"

interface TypographyTextProps extends TextProps {
  variant: "body" | "label" | "bodyLarge"
}

export function TypographyText(props: TypographyTextProps) {
  console.log({ props })
  return <Text {...props} />
}

interface TypographyHeadingProps extends HeadingProps {
  variant: "h1" | "h2"
}

export function TypographyHeading(props: TypographyHeadingProps) {
  return <Heading {...props} />
}

"use client"
import { HStack, Heading } from "@chakra-ui/react"
import ListSelect from "../ListSelect"

export default function Nav() {
  return (
    <nav>
      <HStack>
        <Heading as="h1">Almost Done</Heading>
        <ListSelect />
      </HStack>
    </nav>
  )
}

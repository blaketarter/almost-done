"use client"
import { Box, HStack } from "@chakra-ui/react"
import Nav from "../components/Nav"

export default function Dashboard({
  children,
  todos,
  calendar,
}: {
  children: React.ReactNode
  todos: React.ReactNode
  calendar: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main>
        <HStack w="100%">
          <Box as="section" w="40%">
            {todos}
          </Box>
          <Box as="section" w="60%">
            {calendar}
          </Box>
        </HStack>
        {children}
      </main>
    </>
  )
}

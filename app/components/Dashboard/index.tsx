"use client"
import { Box, HStack } from "@chakra-ui/react"
import TodoLists from "../TodoLists"
import TodoCalendar from "../TodoCalendar"

interface DashboardProps {
  list: string
}

export default function Dashboard({ list }: DashboardProps) {
  return (
    <HStack w="100%">
      <Box as="section" w="40%">
        <TodoLists list={list} />
      </Box>
      <Box as="section" w="60%">
        <TodoCalendar list={list} />
      </Box>
    </HStack>
  )
}

"use client"
import { Box, HStack } from "@chakra-ui/react"
import TodoCalendar from "../TodoCalendar"
import TaskSidebar from "../TaskSidebar"

interface DashboardProps {
  list: string
}

export default function Dashboard({ list }: DashboardProps) {
  return (
    <HStack w="100%" p="30px" gap="30px" alignItems="flex-start" h="100vh">
      <Box as="section" w="calc(100%*1/3)" h="100%" flexShrink="0">
        <TaskSidebar list={list} />
      </Box>
      <Box as="section" w="calc(100%*2/3)" h="100%">
        <TodoCalendar list={list} />
      </Box>
    </HStack>
  )
}

"use client"
import { Box, HStack } from "@chakra-ui/react"
import TodoLists from "../TodoLists"
import TodoCalendar from "../TodoCalendar"
import { TypographyHeading } from "../Typography"

interface DashboardProps {
  list: string
}

export default function Dashboard({ list }: DashboardProps) {
  return (
    <HStack w="100%" p="30px" gap="30px" alignItems="flex-start">
      <Box as="section" w="calc(100%*1/3)">
        <Box
          h="84px"
          mb="22px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <TypographyHeading
            variant="h1"
            as="h1"
            fontWeight="500"
            color="brand.500"
          >
            Almost
            <strong>Done</strong>
          </TypographyHeading>
        </Box>

        <TodoLists list={list} />
      </Box>
      <Box as="section" w="calc(100%*2/3)">
        <TodoCalendar list={list} />
      </Box>
    </HStack>
  )
}

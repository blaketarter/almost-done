"use client"
import { Box, HStack, VStack } from "@chakra-ui/react"
import TodoLists from "../TodoLists"
import TodoCalendar from "../TodoCalendar"
import { TypographyHeading } from "../Typography"
import ListSelect from "../ListSelect"
import Card from "../Card"
import { FobButton } from "../Button"
import { AddIcon } from "@chakra-ui/icons"

interface DashboardProps {
  list: string
}

export default function Dashboard({ list }: DashboardProps) {
  return (
    <HStack w="100%" p="30px" gap="30px" alignItems="flex-start" h="100vh">
      <Box as="section" w="calc(100%*1/3)" h="100%" flexShrink="0">
        <VStack h="100%" alignItems="stretch">
          <Box
            h="84px"
            mb="22px"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexShrink="0"
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
          <Card mb="14px">
            <HStack justifyContent="space-between">
              <ListSelect />
              <FobButton>
                <AddIcon />
              </FobButton>
            </HStack>
          </Card>
          <TodoLists list={list} />
        </VStack>
      </Box>
      <Box as="section" w="calc(100%*2/3)" h="100%">
        <TodoCalendar list={list} />
      </Box>
    </HStack>
  )
}

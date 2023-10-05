import { Box, HStack, VStack } from "@chakra-ui/react"
import { TypographyHeading } from "../Typography"
import Card from "../Card"
import ListSelect from "../ListSelect"
import CreateFlow from "../CreateFlow"
import TodoLists from "../TodoLists"
import { usePathname, useRouter } from "next/navigation"

interface TaskSidebarProps {
  list: string
}

export default function TaskSidebar({ list }: TaskSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
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
          <ListSelect
            value={list}
            onChange={(e) => {
              router.replace(
                `${pathname?.split("?")?.[0] ?? ""}?list=${e.target.value}`,
              )
            }}
          />
          <CreateFlow />
        </HStack>
      </Card>
      <TodoLists list={list} />
    </VStack>
  )
}

import { Box, HStack, Input, VStack } from "@chakra-ui/react"
import { TypographyHeading, TypographyText } from "../Typography"
import { useState } from "react"
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import Card from "../Card"
import { DarkButton } from "../Button"
import { List } from "@/app/types/List"

interface TodoListHeaderProps {
  list: List
  incompleteTodos: number
  onChange?: (updatedList: List) => unknown
  onDelete?: (listToDelete: List) => unknown
}

export default function TodoListHeader({
  list,
  incompleteTodos,
  onChange,
  onDelete,
}: TodoListHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [newText, setNewText] = useState(list.name ?? "")
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <Box
      w="100%"
      position="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <HStack gap="0">
        <Box
          as="span"
          mr="16px"
          h="24px"
          w="24px"
          borderRadius="6px"
          fontSize="18px"
          fontWeight="600"
          display="inline-flex"
          color="white.500"
          background={list.color ? list.color : "brand.500"}
          alignItems="center"
          justifyContent="center"
          flexShrink="0"
        >
          {incompleteTodos}
        </Box>
        {isEditing ? (
          <Input
            autoFocus={true}
            variant="unstyled"
            type="text"
            fontSize="24px"
            fontWeight="600"
            h="30px"
            name="text"
            onFocus={(e) => e.target.select()}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={(e) => {}}
          />
        ) : (
          <TypographyHeading
            variant="h2"
            w="100%"
            as="h3"
            h="24px"
            m="3px 0"
            data-testid={"heading-" + list.name}
          >
            {list.name}
          </TypographyHeading>
        )}
      </HStack>

      <HStack
        justifySelf="flex-end"
        opacity={isEditing || isHovering || isDeleting ? 1 : 0}
        transition=".2s ease"
        userSelect={isEditing || isHovering || isDeleting ? "initial" : "none"}
        position="absolute"
        top="0"
        right="0"
        h="100%"
      >
        {isEditing ? (
          <>
            <CheckIcon
              cursor="pointer"
              onClick={() => {
                onChange?.({ ...list, name: newText })
                setIsEditing(false)
              }}
            />
            <CloseIcon
              cursor="pointer"
              onClick={() => {
                setIsEditing(false)
                setNewText(list.name ?? "")
              }}
            />
          </>
        ) : (
          <>
            <EditIcon onClick={() => setIsEditing(true)} cursor="pointer" />
            <DeleteIcon cursor="pointer" onClick={() => setIsDeleting(true)} />
            <Card
              position="absolute"
              top="36px"
              right="0"
              zIndex="1000"
              background="white"
              transition="width .5s ease, height .25s ease, opacity .2s ease"
              w="160px"
              h={isDeleting ? "192px" : "0px"}
              opacity={isDeleting ? "1" : "0"}
              userSelect={isDeleting ? "auto" : "none"}
              overflow="hidden"
            >
              <VStack alignItems="stretch" gap="24px">
                <TypographyText fontSize="12px" variant="label">
                  Are you sure you want to delete this list?
                </TypographyText>
                <DarkButton p="4px 8px" onClick={() => onDelete?.(list)}>
                  Yes, delete
                </DarkButton>
                <DarkButton onClick={() => setIsDeleting(false)}>
                  No, cancel
                </DarkButton>
              </VStack>
            </Card>
          </>
        )}
      </HStack>
    </Box>
  )
}

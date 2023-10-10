import { Todo } from "@/app/types/Todo"
import { Box, Checkbox, HStack, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { TypographyText } from "../Typography"
import {
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons"
import Card from "../Card"
import { DarkButton } from "../Button"

interface TodoProps {
  todo: Todo
  onChange?: (updatedTodo: Todo) => unknown
  onDelete?: (todo: Todo) => unknown
}
export default function TodoItem({ todo, onChange, onDelete }: TodoProps) {
  const [isEditing, setIsEditing] = useState<"text" | "dueAt" | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [newText, setNewText] = useState(todo.text)
  const [newDueDate, setNewDueDate] = useState(todo.dueAt)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <HStack
      w="100%"
      gap="16px"
      alignItems="flex-start"
      mt="16px"
      opacity={todo.isComplete ? "0.2" : "1"}
      onMouseEnter={!todo.isComplete ? () => setIsHovering(true) : undefined}
      onMouseLeave={() => setIsHovering(false)}
    >
      <VStack w="100%" gap="0px" alignItems="flex-start">
        <HStack gap="16px" w="100%">
          <Checkbox
            aria-label="Complete"
            defaultChecked={todo.isComplete}
            type="checkbox"
            onChange={() => {
              onChange?.({ ...todo, isComplete: !todo.isComplete })
            }}
          />
          {isEditing ? (
            <Input
              autoFocus={isEditing === "text"}
              variant="unstyled"
              type="text"
              fontSize="18px"
              fontWeight="500"
              name="text"
              onFocus={(e) => e.target.select()}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={(e) => {}}
            />
          ) : (
            <TypographyText
              w="100%"
              variant="body"
              textDecoration={todo.isComplete ? "line-through" : "unset"}
            >
              {todo.text}
            </TypographyText>
          )}
          <HStack
            justifySelf="flex-end"
            opacity={
              !todo.isComplete && (isEditing || isHovering || isDeleting)
                ? 1
                : 0
            }
            transition=".2s ease"
            userSelect={
              !todo.isComplete && (isEditing || isHovering || isDeleting)
                ? "initial"
                : "none"
            }
            position="relative"
          >
            {isEditing ? (
              <>
                <CheckIcon
                  cursor="pointer"
                  onClick={() => {
                    onChange?.({ ...todo, text: newText, dueAt: newDueDate })
                    setIsEditing(null)
                  }}
                />
                <CloseIcon
                  cursor="pointer"
                  onClick={() => {
                    setIsEditing(null)
                    setNewDueDate(todo.dueAt)
                    setNewText(todo.text)
                  }}
                />
              </>
            ) : (
              <>
                <EditIcon
                  onClick={() => setIsEditing("text")}
                  cursor={!todo.isComplete ? "pointer" : undefined}
                />
                <DeleteIcon
                  cursor={!todo.isComplete ? "pointer" : undefined}
                  onClick={() => setIsDeleting(true)}
                />
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
                      Are you sure you want to delete this task?
                    </TypographyText>
                    <DarkButton p="4px 8px" onClick={() => onDelete?.(todo)}>
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
        </HStack>
        <Box ml="32px">
          {isEditing === "dueAt" ? (
            <Input
              autoFocus={isEditing === "dueAt"}
              type="date"
              aria-label="Task due date"
              name="dueAt"
              fontSize="12px"
              padding="2px"
              outline="none"
              border="none"
              height="auto"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
          ) : todo.dueAt ? (
            <TypographyText
              variant="label"
              fontSize="12px"
              flexShrink="0"
              p="4px"
              textDecoration={todo.isComplete ? "line-through" : "unset"}
              onClick={() => !todo.isComplete && setIsEditing("dueAt")}
              cursor={todo.isComplete ? "initial" : "pointer"}
            >
              {todo.dueAt} {isEditing ? <CalendarIcon ml="8px" /> : null}
            </TypographyText>
          ) : !todo.isComplete ? (
            <TypographyText
              variant="label"
              fontSize="12px"
              flexShrink="0"
              p="4px"
              cursor={todo.isComplete ? "initial" : "pointer"}
              textDecoration={todo.isComplete ? "line-through" : "unset"}
              onClick={() => !todo.isComplete && setIsEditing("dueAt")}
              opacity="0.2"
            >
              Add due date <CalendarIcon ml="8px" />
            </TypographyText>
          ) : (
            <Box h="26px" />
          )}
        </Box>
      </VStack>
    </HStack>
  )
}

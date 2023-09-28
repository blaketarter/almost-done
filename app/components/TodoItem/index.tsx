import { Todo } from "@/app/types/Todo"
import { Box, Checkbox, HStack, Input, Text } from "@chakra-ui/react"
import { useState } from "react"

interface TodoProps {
  todo: Todo
  onChange?: (updatedTodo: Todo) => unknown
}

export default function TodoItem({ todo, onChange }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <HStack w="100%" gap="16px" alignItems="center" mt="16px">
      <Checkbox
        aria-label="Complete"
        defaultChecked={todo.isComplete}
        type="checkbox"
        onChange={() => {
          onChange?.({ ...todo, isComplete: !todo.isComplete })
        }}
      />
      <Box>
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()

              const data = new FormData(e.target as HTMLFormElement)
              onChange?.({
                ...todo,
                text: (data.get("text") as string) ?? todo.text,
              })
              setIsEditing(false)
            }}
          >
            <Input
              autoFocus
              variant="unstyled"
              type="text"
              defaultValue={todo.text}
              name="text"
              onBlur={(e) => {
                onChange?.({
                  ...todo,
                  text: e.target.value ?? todo.text,
                })
                setIsEditing(false)
              }}
            />
          </form>
        ) : (
          <Text
            textDecoration={todo.isComplete ? "line-through" : "unset"}
            onClick={() => !todo.isComplete && setIsEditing(true)}
          >
            {todo.text}
          </Text>
        )}
      </Box>
    </HStack>
  )
}

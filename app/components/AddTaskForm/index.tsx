import { HStack, Input, VStack } from "@chakra-ui/react"
import { DarkButton } from "../Button"
import ListSelect from "../ListSelect"
import { FormEvent, useCallback, useRef, useState } from "react"
import apiService from "@/app/services/API"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Todo } from "@/app/types/Todo"
import { useCurrentDate } from "@/app/utils/useCalendarDates"
import { format, parse } from "date-fns"

interface AddTaskFormProps {
  onSuccess?: () => unknown
}

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const textRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const createTodoMutation = useMutation({
    mutationFn: apiService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
  const currentDate = useCurrentDate()

  const [list, setList] = useState<string | undefined>(undefined)

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const data = new FormData(e.target as HTMLFormElement)
      const dueAt = parse(
        (data.get("dueAt") as string) ?? "",
        "yyyy-MM-dd",
        currentDate,
      )

      const newTodo: Partial<Todo> = {
        isComplete: false,
        text: (data.get("text") as string) ?? "",
        dueAt: dueAt ? format(dueAt, "yyyy-MM-dd") : undefined,
        list: list,
      }

      createTodoMutation.mutateAsync({ list, body: newTodo }).then(() => {
        if (textRef.current) {
          textRef.current.value = ""
        }
        onSuccess?.()
      })
    },
    [createTodoMutation, currentDate, list, onSuccess],
  )

  return (
    <form onSubmit={onSubmit}>
      <VStack alignItems="stretch" gap="24px">
        <HStack w="100%">
          <Input autoFocus={true} name="text" w="280px" />
          <DarkButton flexGrow="1" type="submit">
            Add
          </DarkButton>
        </HStack>
        <HStack w="100%">
          <Input type="date" name="dueAt" />
          <ListSelect
            defaultToAll={false}
            placeholder="Assign list"
            onChange={(e) => setList(e.target.value)}
          />
        </HStack>
      </VStack>
    </form>
  )
}

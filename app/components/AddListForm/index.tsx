import { HStack, Input, VStack } from "@chakra-ui/react"
import { DarkButton } from "../Button"
import { FormEvent, useCallback, useRef } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiService from "@/app/services/API"
import { List } from "@/app/types/List"
import { colors, getRandomAvailableColor } from "@/app/utils/colors"

interface AddListFormProps {
  onSuccess?: () => unknown
}

export default function AddListForm({ onSuccess }: AddListFormProps) {
  const textRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const createListMutation = useMutation({
    mutationFn: apiService.createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] })
    },
  })
  const { data: lists } = useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: apiService.getLists,
  })

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const data = new FormData(e.target as HTMLFormElement)

      let color: string | undefined = undefined

      if (lists) {
        color = getRandomAvailableColor(
          colors,
          lists.reduce(
            (prev, curr) => (curr.color ? prev.concat(curr.color) : prev),
            [] as Array<string>,
          ),
        )
      }

      const newList: Partial<List> = {
        name: (data.get("text") as string) ?? "",
        color: color,
      }

      createListMutation.mutateAsync({ body: newList }).then(() => {
        if (textRef.current) {
          textRef.current.value = ""
        }
        onSuccess?.()
      })
    },
    [createListMutation, onSuccess, lists],
  )

  return (
    <form onSubmit={onSubmit}>
      <VStack alignItems="stretch" gap="24px">
        <HStack w="100%">
          <Input
            aria-label="List name"
            autoFocus={true}
            w="280px"
            name="text"
            ref={textRef}
          />
          <DarkButton flexGrow="1" type="submit">
            Create
          </DarkButton>
        </HStack>
      </VStack>
    </form>
  )
}

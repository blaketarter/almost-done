"use client"
import { Todo } from "@/app/types/Todo"
import TodoItem from "../TodoItem"
import { Box, Flex, Heading, Input, VStack } from "@chakra-ui/react"
import { FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiFunction from "@/app/services/API"
import Card from "../Card"
import { useCurrentDate } from "@/app/utils/useCalendarDates"

interface TodoListParams {
  list?: string
  todos: Todo[]
  color?: string
}

export default function TodoList({ list, todos, color }: TodoListParams) {
  const currentDate = useCurrentDate()
  const textRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const createTodoMutation = useMutation({
    mutationFn: apiFunction.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
  const updateTodoMutation = useMutation({
    mutationFn: apiFunction.updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const data = new FormData(e.target as HTMLFormElement)

      const newTodo: Partial<Todo> = {
        isComplete: false,
        text: (data.get("text") as string) ?? "",
        createdAt: currentDate.toString(),
      }

      createTodoMutation.mutateAsync({ list, body: newTodo }).then(() => {
        if (textRef.current) {
          textRef.current.value = ""
        }
      })
    },
    [createTodoMutation, list, currentDate],
  )

  const incompleteTodos = useMemo(
    () => todos.filter((todo) => !todo.isComplete).length,
    [todos],
  )

  const onChange = useCallback(
    (updatedTodo: Todo) => {
      updateTodoMutation.mutate({ list, body: updatedTodo })
    },
    [list, updateTodoMutation],
  )

  return (
    <VStack w="100%" mb="34px">
      <Card
        background="white"
        w="100%"
        p="12px"
        position="sticky"
        top="0"
        zIndex="5"
      >
        <Heading w="100%" as="h3" size="lg" data-testid={"heading-" + list}>
          <Box
            as="span"
            mr="16px"
            h="28px"
            w="28px"
            borderRadius="6px"
            fontSize="18px"
            fontWeight="600"
            display="inline-flex"
            color="white.500"
            background={color ? color : "brand.500"}
            alignItems="center"
            justifyContent="center"
            transform="translateY(-4px)"
          >
            {incompleteTodos}
          </Box>
          {list}
        </Heading>
      </Card>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onChange={onChange} />
      ))}
    </VStack>
  )
}

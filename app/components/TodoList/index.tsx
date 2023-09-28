"use client"
import { Todo } from "@/app/types/Todo"
import TodoItem from "../TodoItem"
import { Flex, Heading, Input, VStack } from "@chakra-ui/react"
import { FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiFunction from "@/app/services/API"
import getCurrentDate from "@/app/utils/getCurrentDate"
import Card from "../Card"

interface TodoListParams {
  list?: string
  todos: Todo[]
}

export default function TodoList({ list, todos }: TodoListParams) {
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
        createdAt: getCurrentDate().toString(),
      }

      createTodoMutation.mutateAsync({ list, body: newTodo }).then(() => {
        if (textRef.current) {
          textRef.current.value = ""
        }
      })
    },
    [createTodoMutation, list],
  )

  const onChange = useCallback(
    (updatedTodo: Todo) => {
      updateTodoMutation.mutate({ list, body: updatedTodo })
    },
    [list, updateTodoMutation],
  )

  return (
    <VStack w="100%" mb="34px">
      <Card background="white" w="100%" p="12px">
        <Heading w="100%" as="h3" size="lg" data-testid={"heading-" + list}>
          {list}
        </Heading>
      </Card>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onChange={onChange} />
      ))}
    </VStack>
  )
}

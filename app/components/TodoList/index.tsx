"use client"
import { Todo } from "@/app/types/Todo"
import TodoItem from "../TodoItem"
import { Flex, Heading, Input, VStack } from "@chakra-ui/react"
import { FormEvent, useCallback, useMemo, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTodo } from "@/app/utils/createTodo"
import { updateTodo } from "@/app/utils/updateTodo"

interface TodoListParams {
  list?: string
  todos: Todo[]
}

export default function TodoList({ list, todos }: TodoListParams) {
  const textRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
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
        createdAt: new Date().toString(),
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
    <VStack w="100%">
      <Heading w="100%" as="h3" size="lg">
        {list}
      </Heading>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onChange={onChange} />
      ))}
      <Flex w="100%" align="start">
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            variant="flushed"
            placeholder="Add new item"
            name="text"
            ref={textRef}
          />
        </form>
      </Flex>
    </VStack>
  )
}

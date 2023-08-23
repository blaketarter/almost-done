"use client"
import { Todo } from "@/app/types/Todo"
import TodoItem from "../TodoItem"
import { Flex, Heading, Input, VStack } from "@chakra-ui/react"
import { FormEvent, useCallback, useMemo, useRef, useState } from "react"

interface TodoListParams {
  list?: string
  todos: Todo[]
}

export default function TodoList({ list, todos }: TodoListParams) {
  const [newTodos, addNewTodo] = useState<Todo[]>([])
  const [updatedTodos, addUpdatedTodo] = useState<Todo[]>([])
  const textRef = useRef<HTMLInputElement | null>(null)

  const allTodos = useMemo(() => {
    const unpatchedTodos = todos.concat(newTodos)
    return updatedTodos.reduce((prev, curr) => {
      return prev.map((prevTodo) => (prevTodo.id === curr.id ? curr : prevTodo))
    }, unpatchedTodos)
  }, [newTodos, todos, updatedTodos])

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const data = new FormData(e.target as HTMLFormElement)

      const newTodo: Partial<Todo> = {
        isComplete: false,
        text: (data.get("text") as string) ?? "",
        createdAt: new Date().toString(),
      }

      fetch(`http://localhost:3000/api/lists/${list}/todos`, {
        method: "POST",
        body: JSON.stringify(newTodo),
      })
        .then((res) => res.json())
        .then((addedTodo: Todo) => {
          addNewTodo((state) => [...state, addedTodo])

          if (textRef.current) {
            textRef.current.value = ""
          }
        })
    },
    [list],
  )

  const onChange = useCallback(
    (updatedTodo: Todo) => {
      fetch(`http://localhost:3000/api/lists/${list}/todos`, {
        method: "PATCH",
        body: JSON.stringify(updatedTodo),
      })
        .then((res) => res.json())
        .then((patchedTodo: Todo) => {
          addUpdatedTodo((state) => [...state, patchedTodo])
        })
    },
    [list],
  )

  return (
    <VStack w="100%">
      <Heading w="100%" as="h3" size="lg">
        {list}
      </Heading>
      {allTodos.map((todo) => (
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

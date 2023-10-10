"use client"
import { Todo } from "@/app/types/Todo"
import TodoItem from "../TodoItem"
import { VStack } from "@chakra-ui/react"
import { useCallback, useMemo, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiFunction from "@/app/services/API"
import Card from "../Card"
import { useCurrentDate } from "@/app/utils/useCalendarDates"
import TodoListHeader from "../TodoListHeader"
import { List } from "@/app/types/List"
import { isSameMonth, parse } from "date-fns"
import { TypographyText } from "../Typography"

interface TodoListParams {
  list: List
  todos: Todo[]
  activeDate?: Date
}

export default function TodoList({ list, todos, activeDate }: TodoListParams) {
  const currentDate = useCurrentDate()
  const queryClient = useQueryClient()
  const updateTodoMutation = useMutation({
    mutationFn: apiFunction.updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
  const deleteTodoMutation = useMutation({
    mutationFn: apiFunction.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
  const updateListMutation = useMutation({
    mutationFn: apiFunction.updateList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] })
    },
  })
  const deleteListMutation = useMutation({
    mutationFn: apiFunction.deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] })
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  const onTaskChange = useCallback(
    (updatedTodo: Todo) => {
      updateTodoMutation.mutate({ body: updatedTodo })
    },
    [updateTodoMutation],
  )

  const onTaskDelete = useCallback(
    (todoToDelete: Todo) => {
      deleteTodoMutation.mutate({ id: todoToDelete.id })
    },
    [deleteTodoMutation],
  )

  const onListChange = useCallback(
    (updatedList: List) => {
      updateListMutation.mutate({ body: updatedList })
    },
    [updateListMutation],
  )

  const onListDelete = useCallback(
    (listToDelete: List) => {
      deleteListMutation.mutate({ id: listToDelete.id })
    },
    [deleteListMutation],
  )

  const filteredTodos = todos?.filter((todo) => {
    if (todo.dueAt === undefined) {
      return true
    }

    const dueAt = parse(todo.dueAt ?? "", "yyyy-MM-dd", currentDate)

    if (activeDate !== undefined && isSameMonth(dueAt, activeDate)) {
      return true
    }

    return false
  })

  const incompleteTodos = useMemo(
    () => filteredTodos.filter((todo) => !todo.isComplete).length,
    [filteredTodos],
  )

  const hiddenTodos = todos.length - filteredTodos.length

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
        <TodoListHeader
          list={list}
          incompleteTodos={incompleteTodos}
          onChange={onListChange}
          onDelete={onListDelete}
        />
      </Card>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onChange={onTaskChange}
          onDelete={onTaskDelete}
        />
      ))}
      {hiddenTodos ? (
        <TypographyText
          variant="label"
          fontSize="12px"
          color="black"
          w="100%"
          mt="8px"
          opacity={0.6}
        >
          + {hiddenTodos} task{hiddenTodos !== 1 ? "s" : ""} not due this month
        </TypographyText>
      ) : null}
    </VStack>
  )
}

"use client"
import { Todo } from "@/app/types/Todo"
import { VStack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"
import TodoList from "../TodoList"

interface TodoListsParams {
  list?: string
  todos: Todo[]
}

export default function TodoLists({ list, todos }: TodoListsParams) {
  return list === "all" ? (
    <VStack w="100%">
      {Object.entries(groupBy(todos, "list")).map(([list, todos]) => (
        <TodoList key={list} list={list} todos={todos} />
      ))}
    </VStack>
  ) : (
    <TodoList list={list} todos={todos} />
  )
}

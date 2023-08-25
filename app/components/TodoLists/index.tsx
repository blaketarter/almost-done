"use client"
import { Todo } from "@/app/types/Todo"
import { VStack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"
import TodoList from "../TodoList"
import { useQuery } from "@tanstack/react-query"
import { productionAPIService } from "@/app/services/API"

interface TodoListsParams {
  list?: string
}

export default function TodoLists({ list = "all" }: TodoListsParams) {
  const { isLoading, isError, data, error } = useQuery<Todo[]>({
    queryKey: ["todos", list],
    queryFn: productionAPIService.getTodos,
  })

  return list === "all" ? (
    <VStack w="100%">
      {Object.entries(groupBy(data ?? [], "list")).map(([list, todos]) => (
        <TodoList key={list} list={list} todos={todos} />
      ))}
    </VStack>
  ) : (
    <TodoList list={list} todos={data ?? []} />
  )
}

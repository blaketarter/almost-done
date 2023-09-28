"use client"
import { Todo } from "@/app/types/Todo"
import { VStack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"
import TodoList from "../TodoList"
import { useQuery } from "@tanstack/react-query"
import apiFunction from "@/app/services/API"
import Card from "../Card"

interface TodoListsParams {
  list?: string
}

export default function TodoLists({ list = "all" }: TodoListsParams) {
  const { data } = useQuery<Todo[]>({
    queryKey: ["todos", list],
    queryFn: apiFunction.getTodos,
  })

  return (
    <Card flexBasis="100%">
      {list === "all" ? (
        <VStack w="100%">
          {Object.entries(groupBy(data ?? [], "list")).map(([list, todos]) => (
            <TodoList key={list} list={list} todos={todos} />
          ))}
        </VStack>
      ) : (
        <TodoList list={list} todos={data ?? []} />
      )}
    </Card>
  )
}

"use client"
import { Todo } from "@/app/types/Todo"
import { VStack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"
import TodoList from "../TodoList"
import { useQuery } from "@tanstack/react-query"
import apiService from "@/app/services/API"
import Card from "../Card"
import { List } from "@/app/types/List"
import { isSameMonth, parse } from "date-fns"
import calendarService from "@/app/services/Calendar"
import { useActiveDate, useCurrentDate } from "@/app/utils/useCalendarDates"
import { act } from "react-dom/test-utils"

interface TodoListsParams {
  list?: string
}

export default function TodoLists({ list = "all" }: TodoListsParams) {
  const [activeDate] = useActiveDate()
  const { data } = useQuery<Todo[]>({
    queryKey: ["todos", list],
    queryFn: apiService.getTodos,
  })

  const { data: lists } = useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: apiService.getLists,
  })

  const todos = groupBy(data ?? [], "listId")
  const singleList = lists?.find((x) => x.name === list)

  return (
    <Card flexBasis="100%" overflowY="auto">
      {list === "all" ? (
        <VStack w="100%" flexDirection="column-reverse">
          {(lists ?? [])
            .map((list) => (
              <TodoList
                key={list.id}
                list={list}
                todos={todos[list.id] ?? []}
                activeDate={activeDate}
              />
            ))
            .reverse()}
        </VStack>
      ) : singleList ? (
        <TodoList
          list={singleList}
          todos={data ?? []}
          activeDate={activeDate}
        />
      ) : null}
    </Card>
  )
}

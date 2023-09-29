"use client"
import { Todo } from "@/app/types/Todo"
import { VStack } from "@chakra-ui/react"
import groupBy from "lodash/groupBy"
import TodoList from "../TodoList"
import { useQuery } from "@tanstack/react-query"
import apiService from "@/app/services/API"
import Card from "../Card"
import { List } from "@/app/types/List"
import { useMemo } from "react"
import { isSameMonth, parse } from "date-fns"
import calendarService from "@/app/services/Calendar"
import { useCurrentDate } from "@/app/utils/useCalendarDates"

interface TodoListsParams {
  list?: string
}

export default function TodoLists({ list = "all" }: TodoListsParams) {
  const currentDate = useCurrentDate()
  const { data: activeDate } = useQuery<Date>({
    queryKey: ["activeDate"],
    queryFn: calendarService.getActiveDate,
  })
  const { data } = useQuery<Todo[]>({
    queryKey: ["todos", list],
    queryFn: apiService.getTodos,
  })

  const { data: lists } = useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: apiService.getLists,
  })

  const filteredTodos = data?.filter((todo) => {
    if (todo.dueAt === undefined) {
      return true
    }

    const dueAt = parse(todo.dueAt ?? "", "yyyy-MM-dd", currentDate)

    if (activeDate !== undefined && isSameMonth(dueAt, activeDate)) {
      return true
    }

    return false
  })

  const todos = groupBy(filteredTodos ?? [], "list")
  const listColor = useMemo(
    () => (lists ?? []).find((maybeList) => maybeList.name === list)?.color,
    [lists, list],
  )

  return (
    <Card flexBasis="100%">
      {list === "all" ? (
        <VStack w="100%">
          {(lists ?? []).map((list) => (
            <TodoList
              key={list.name}
              list={list.name}
              color={list.color}
              todos={todos[list.name] ?? []}
            />
          ))}
        </VStack>
      ) : (
        <TodoList list={list} color={listColor} todos={data ?? []} />
      )}
    </Card>
  )
}

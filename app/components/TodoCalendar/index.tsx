"use client"

import { Todo } from "@/app/types/Todo"
import Calendar from "../Calendar"
import { CalendarEvent } from "@/app/types/CalendarEvent"
import { parse } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import apiService from "@/app/services/API"
import { useCurrentDate } from "@/app/utils/useCalendarDates"
import { List } from "@/app/types/List"

interface TodoCalendarProps {
  list?: string
}

export default function TodoCalendar({ list = "all" }: TodoCalendarProps) {
  const { data } = useQuery<Todo[]>({
    queryKey: ["todos", list],
    queryFn: apiService.getTodos,
  })
  const { data: lists } = useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: apiService.getLists,
  })

  const currentDate = useCurrentDate()

  return (
    <Calendar
      events={(data ?? [])
        .filter((todo) => todo.dueAt)
        .filter((todo) => !todo.isComplete)
        .map((todo) => {
          const list = lists?.find((list) => list.id === todo.listId)
          return {
            id: todo.id,
            date: parse(todo.dueAt ?? "", "yyyy-MM-dd", currentDate),
            text: todo.text,
            color: list?.color ?? "brand.500",
            groupTitle: list?.name,
          } as CalendarEvent
        })}
    />
  )
}

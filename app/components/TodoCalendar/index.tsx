"use client"

import { Todo } from "@/app/types/Todo"
import Calendar from "../Calendar"
import { CalendarEvent } from "@/app/types/CalendarEvent"
import { parse } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getTodos } from "@/app/utils/getTodos"

interface TodoCalendarProps {
  list?: string
}

export default function TodoCalendar({ list = "all" }: TodoCalendarProps) {
  const { isLoading, isError, data, error } = useQuery<Todo[]>({
    queryKey: ["todos", list],
    queryFn: getTodos,
  })

  return (
    <Calendar
      events={(data ?? [])
        .filter((todo) => todo.dueAt)
        .map(
          (todo) =>
            ({
              id: todo.id,
              date: parse(todo.dueAt ?? "", "yyyy-MM-dd", new Date()),
            }) as CalendarEvent,
        )}
    />
  )
}

"use client"

import { Todo } from "@/app/types/Todo"
import Calendar from "../Calendar"
import { CalendarEvent } from "@/app/types/CalendarEvent"
import { parse } from "date-fns"

interface TodoCalendarProps {
  todos?: Todo[]
}

export default function TodoCalendar({ todos = [] }: TodoCalendarProps) {
  return (
    <Calendar
      events={todos
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

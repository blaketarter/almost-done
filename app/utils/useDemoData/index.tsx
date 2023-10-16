import { Todo } from "@/app/types/Todo"
import { useCurrentDate } from "../useCalendarDates"
import { addDays, addMonths, format } from "date-fns"
import { List } from "@/app/types/List"
import { colors } from "../colors"
import { useSearchParams } from "next/navigation"

export default function useDemoData() {
  const currentDate = useCurrentDate()
  const params = useSearchParams()

  if (typeof window !== "undefined" && params?.has("demo", "true")) {
    const tasks = JSON.parse(localStorage.getItem("todos") ?? "[]")
    const lists = JSON.parse(localStorage.getItem("lists") ?? "[]")

    if (tasks.length === 0 && lists.length === 0) {
      const demoTasks: Todo[] = [
        {
          id: "1",
          text: "This is an example Task due today",
          isComplete: false,
          dueAt: format(currentDate, "yyyy-MM-dd"),
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "1",
        },
        {
          id: "2",
          text: "This is a completed Task",
          isComplete: true,
          dueAt: format(currentDate, "yyyy-MM-dd"),
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "1",
        },
        {
          id: "3",
          text: "This is an example Task due later",
          isComplete: false,
          dueAt: format(addDays(currentDate, 2), "yyyy-MM-dd"),
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "1",
        },
        {
          id: "4",
          text: "This is a Task on another List",
          isComplete: false,
          dueAt: format(addDays(currentDate, 2), "yyyy-MM-dd"),
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "2",
        },
        {
          id: "5",
          text: "This is a Task due next Month",
          isComplete: false,
          dueAt: format(addMonths(currentDate, 1), "yyyy-MM-dd"),
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "2",
        },
        {
          id: "6",
          text: "This is a Task without a due date",
          isComplete: false,
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "2",
        },
        {
          id: "7",
          text: "This is another example Task due today",
          isComplete: false,
          dueAt: format(currentDate, "yyyy-MM-dd"),
          createdAt: format(currentDate, "yyyy-MM-dd"),
          listId: "1",
        },
      ]

      const demoLists: List[] = [
        {
          id: "1",
          name: "Demo A",
          color: colors[1],
        },
        {
          id: "2",
          name: "Demo B",
          color: colors[11],
        },
      ]

      localStorage.setItem("todos", JSON.stringify(demoTasks))
      localStorage.setItem("lists", JSON.stringify(demoLists))
    }
  }
}

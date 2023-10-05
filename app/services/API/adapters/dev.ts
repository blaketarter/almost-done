import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."
import { List } from "@/app/types/List"
import getCurrentDate from "@/app/utils/getCurrentDate"
import { v4 } from "uuid"
import { format } from "date-fns"

export const DevAPIServiceAdapter: APIServiceAdapter = {
  getTodos: function (list: string): Promise<Todo[]> {
    if (typeof window === "undefined") {
      return Promise.resolve([])
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")

    return Promise.resolve(
      list === "all" ? todos : todos.filter((todo) => todo.list === list),
    )
  },

  createTodo: function ({
    list,
    body,
  }: {
    list?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    const now = getCurrentDate()

    const todo: Todo = {
      id: v4(),
      isComplete: false,
      text: body.text ?? "",
      createdAt: format(now, "yyyy-MM-dd"),
      dueAt: body.dueAt ?? undefined,
      list: list,
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")

    localStorage.setItem("todos", JSON.stringify([...todos, todo]))

    return Promise.resolve(todo)
  },

  updateTodo: function ({
    list,
    body,
  }: {
    list?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    let updatedTodo = undefined

    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]").map(
      (todo: Todo) => {
        if (todo.id === body.id) {
          updatedTodo = { ...todo, ...body }
          return updatedTodo
        }

        return todo
      },
    )

    localStorage.setItem("todos", JSON.stringify(todos))

    if (updatedTodo) {
      return Promise.resolve(updatedTodo)
    }

    return Promise.reject()
  },

  getLists: function (): Promise<List[]> {
    const lists: List[] = JSON.parse(localStorage.getItem("lists") ?? "[]")

    return Promise.resolve(lists)
  },

  createList: function ({ body }: { body: Partial<List> }): Promise<List> {
    const now = getCurrentDate()

    const list: List = {
      id: v4(),
      name: body.name ?? "",
      color: body.color,
      createdAt: format(now, "yyyy-MM-dd"),
    }

    const lists: List[] = JSON.parse(localStorage.getItem("lists") ?? "[]")

    localStorage.setItem("lists", JSON.stringify([...lists, list]))

    return Promise.resolve(list)
  },
}

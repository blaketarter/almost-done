import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."
import { List } from "@/app/types/List"
import getCurrentDate from "@/app/utils/getCurrentDate"
import { randomUUID } from "crypto"

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
      id: randomUUID(),
      isComplete: false,
      text: body.text ?? "",
      createdAt: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
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
}

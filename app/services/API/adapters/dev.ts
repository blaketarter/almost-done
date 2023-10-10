import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."
import { List } from "@/app/types/List"
import getCurrentDate from "@/app/utils/getCurrentDate"
import { v4 } from "uuid"
import { format } from "date-fns"

export const DevAPIServiceAdapter: APIServiceAdapter = {
  getTodos: function (listName: string): Promise<Todo[]> {
    if (typeof window === "undefined") {
      return Promise.resolve([])
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")

    const lists: List[] = JSON.parse(localStorage.getItem("lists") ?? "[]")
    const list: List | undefined = lists.find((x) => x.name === listName)

    return listName !== "all" && !list
      ? Promise.reject()
      : Promise.resolve(
          listName === "all"
            ? todos
            : todos.filter((todo) => todo.listId === list?.id),
        )
  },

  createTodo: function ({
    listName,
    body,
  }: {
    listName?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    const now = getCurrentDate()

    const lists: List[] = JSON.parse(localStorage.getItem("lists") ?? "[]")
    const list: List | undefined = lists.find((x) => x.name === listName)

    const todo: Todo = {
      id: v4(),
      isComplete: false,
      text: body.text ?? "",
      createdAt: format(now, "yyyy-MM-dd"),
      dueAt: body.dueAt ?? undefined,
      listId: list?.id ?? undefined,
    }

    const todos: Todo[] = JSON.parse(localStorage.getItem("todos") ?? "[]")

    localStorage.setItem("todos", JSON.stringify([...todos, todo]))

    return Promise.resolve(todo)
  },

  updateTodo: function ({ body }: { body: Partial<Todo> }): Promise<Todo> {
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

  deleteTodo: function ({ id }: { id: string }): Promise<Todo> {
    let deletedTodo: Todo | undefined = undefined

    const todos: Todo[] = JSON.parse(
      localStorage.getItem("todos") ?? "[]",
    ).filter((todo: Todo) => {
      if (todo.id === id) {
        deletedTodo = todo
      }

      return Boolean(todo.id !== id)
    })

    localStorage.setItem("todos", JSON.stringify(todos))

    if (deletedTodo) {
      return Promise.resolve(deletedTodo)
    }

    return Promise.reject()
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

  updateList: function ({ body }: { body: Partial<List> }): Promise<List> {
    let updatedList = undefined

    const lists: List[] = JSON.parse(localStorage.getItem("lists") ?? "[]").map(
      (list: List) => {
        if (list.id === body.id) {
          updatedList = { ...list, ...body }
          return updatedList
        }

        return list
      },
    )

    localStorage.setItem("lists", JSON.stringify(lists))

    if (updatedList) {
      return Promise.resolve(updatedList)
    }

    return Promise.reject()
  },

  deleteList: function ({ id }: { id: string }): Promise<List> {
    let deletedList: List | undefined = undefined

    const lists: List[] = JSON.parse(
      localStorage.getItem("lists") ?? "[]",
    ).filter((list: List) => {
      if (list.id === id) {
        deletedList = list
      }

      return Boolean(list.id !== id)
    })

    localStorage.setItem("lists", JSON.stringify(lists))

    if (deletedList) {
      const todos: Todo[] = JSON.parse(
        localStorage.getItem("todos") ?? "[]",
      ).filter((todo: Todo) => {
        return Boolean(todo.listId !== id)
      })

      localStorage.setItem("todos", JSON.stringify(todos))

      return Promise.resolve(deletedList)
    }

    return Promise.reject()
  },
}

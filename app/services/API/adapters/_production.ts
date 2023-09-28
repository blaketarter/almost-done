import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."
import { groupBy } from "lodash"
import { List } from "@/app/types/List"

export const ProductionAPIServiceAdapter = {
  getTodos: function (list: string): Promise<Todo[]> {
    return fetch(`http://localhost:3000/api/lists/${list ?? "all"}/todos`, {
      cache: "no-store",
    }).then((res) => res.json())
  },

  createTodo: function ({
    list,
    body,
  }: {
    list?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    return fetch(`http://localhost:3000/api/lists/${list ?? "all"}/todos`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json())
  },

  updateTodo: function ({
    list,
    body,
  }: {
    list?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    return fetch(`http://localhost:3000/api/lists/${list ?? "all"}/todos`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }).then((res) => res.json())
  },

  getLists: function (): Promise<unknown[]> {
    return fetch(`http://localhost:3000/api/lists/all/todos`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((todos) => {
        return ["all", ...Object.keys(groupBy(todos, "list"))]
      })
  },
}

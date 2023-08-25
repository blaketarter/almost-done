import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."
import { groupBy } from "lodash"

export const ProductionAPIServiceAdapter: APIServiceAdapter = {
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

  getLists: function (list: string): Promise<string[]> {
    return fetch(`http://localhost:3000/api/lists/${list ?? "all"}/todos`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((todos) => {
        return ["all", ...Object.keys(groupBy(todos, "list"))]
      })
  },
}

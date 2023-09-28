import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."
import { List } from "@/app/types/List"

export const TestAPIServiceAdapter: APIServiceAdapter = {
  getTodos: function (list: string): Promise<Todo[]> {
    const foos = [
      {
        id: "1",
        isComplete: false,
        text: "Foo 1",
        createdAt: "2023-01-01",
        dueAt: "2023-01-01",
        list: "foo",
      },
      {
        id: "2",
        isComplete: false,
        text: "Foo 2",
        createdAt: "2023-01-01",
        dueAt: "2023-01-01",
        list: "foo",
      },
    ]
    const bars = [
      {
        id: "3",
        isComplete: false,
        text: "Bar 1",
        createdAt: "2023-01-01",
        dueAt: "2023-01-01",
        list: "bar",
      },
    ]
    return Promise.resolve(
      list === "all" ? [...foos, ...bars] : list === "foo" ? foos : bars,
    )
  },

  createTodo: function ({
    list,
    body,
  }: {
    list?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    return Promise.resolve({
      id: "2",
      isComplete: false,
      text: "Foo 2",
      createdAt: "2023-01-01",
      dueAt: "2023-01-01",
      list: "foo",
    })
  },

  updateTodo: function ({
    list,
    body,
  }: {
    list?: string
    body: Partial<Todo>
  }): Promise<Todo> {
    return Promise.resolve({
      id: "2",
      isComplete: false,
      text: "Foo 2",
      createdAt: "2023-01-01",
      dueAt: "2023-01-01",
      list: "foo",
    })
  },

  getLists: function (): Promise<List[]> {
    return Promise.resolve([
      { id: "1", name: "foo", createdAt: "2023-01-01", color: "#FDB62B" },
      { id: "2", name: "bar", createdAt: "2023-01-01", color: "#107DFD" },
    ])
  },
}

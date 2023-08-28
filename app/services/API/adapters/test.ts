import { Todo } from "@/app/types/Todo"
import { APIServiceAdapter } from ".."

export const TestAPIServiceAdapter: APIServiceAdapter = {
  getTodos: function (list: string): Promise<Todo[]> {
    return Promise.resolve([
      {
        id: "1",
        isComplete: false,
        text: "Foo 1",
        createdAt: "2023-08-24",
        dueAt: "2023-08-24",
        list: "foo",
      },
      {
        id: "2",
        isComplete: false,
        text: "Foo 2",
        createdAt: "2023-08-24",
        dueAt: "2023-08-24",
        list: "foo",
      },
    ])
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
      createdAt: "2023-08-24",
      dueAt: "2023-08-24",
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
      createdAt: "2023-08-24",
      dueAt: "2023-08-24",
      list: "foo",
    })
  },

  getLists: function (list: string): Promise<string[]> {
    return Promise.resolve(["foo"])
  },
}

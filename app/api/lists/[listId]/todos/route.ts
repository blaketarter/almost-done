import { NextResponse } from "next/server"
import { List } from "@/app/types/List"
import { Todo } from "@/app/types/Todo"
import { randomUUID } from "crypto"
import getCurrentDate from "@/app/utils/getCurrentDate"

const lists: Record<string, List> = {
  foo: {
    name: "Foo",
    color: "#FDB62B",
    createdAt: "2023-08-24",
  },
  bar: {
    name: "Bar",
    color: "#107DFD",
    createdAt: "2023-08-24",
  },
}

const todos: Record<string, Todo[]> = {
  foo: [
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
    {
      id: "6",
      isComplete: false,
      text: "Foo 3",
      createdAt: "2023-08-24",
      list: "foo",
    },
    {
      id: "7",
      isComplete: false,
      text: "Foo 4",
      createdAt: "2023-08-24",
      list: "foo",
    },
  ],
  bar: [
    {
      id: "3",
      isComplete: false,
      text: "Bar 1",
      createdAt: "2023-08-24",
      dueAt: "2023-08-24",
      list: "bar",
    },
    {
      id: "4",
      isComplete: false,
      text: "Bar 2",
      createdAt: "2023-08-24",
      dueAt: "2023-08-24",
      list: "bar",
    },
    {
      id: "5",
      isComplete: false,
      text: "Bar 3",
      createdAt: "2023-08-24",
      dueAt: "2023-08-24",
      list: "bar",
    },
    {
      id: "8",
      isComplete: false,
      text: "Bar 4",
      createdAt: "2023-08-24",
      list: "bar",
    },
  ],
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { listId: string }
  },
) {
  const listId = params.listId

  const data =
    listId === "all"
      ? Object.keys(todos).flatMap((list) => todos[list])
      : listId in todos
      ? todos[listId]
      : []

  return NextResponse.json(data)
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { listId: string }
  },
) {
  const listId = params.listId
  const body = await request.json()

  const now = getCurrentDate()

  const todo: Todo = {
    id: randomUUID(),
    isComplete: false,
    text: body.text,
    createdAt: now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    dueAt: body.dueAt ?? null,
    list: listId,
  }

  if (!(listId in todos)) {
    todos[listId] = []
  }

  todos[listId].push(todo)

  return NextResponse.json(todo)
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: { listId: string }
  },
) {
  const listId = params.listId
  const body = await request.json()

  if (listId in todos) {
    const todo = todos[listId].find((todo) => todo.id === body.id)

    if (todo) {
      Object.entries(body).forEach(([key, value]) => {
        ;(todo as any)[key] = value
      })
    }

    return NextResponse.json(todo)
  } else {
    return NextResponse.json(body)
  }
}

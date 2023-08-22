import { NextResponse } from "next/server"
import { List } from "@/app/types/List"
import { Todo } from "@/app/types/Todo"

const lists: Record<string, List> = {
  foo: {
    name: "Foo",
    createdAt: new Date().toString(),
  },
  bar: {
    name: "Bar",
    createdAt: new Date().toString(),
  },
}

const todos: Record<string, Todo[]> = {
  foo: [
    {
      isComplete: false,
      text: "Foo 1",
      createdAt: new Date().toString(),
      dueAt: new Date().toString(),
      list: "foo",
    },
    {
      isComplete: false,
      text: "Foo 2",
      createdAt: new Date().toString(),
      dueAt: new Date().toString(),
      list: "foo",
    },
  ],
  bar: [
    {
      isComplete: false,
      text: "Bar 1",
      createdAt: new Date().toString(),
      dueAt: new Date().toString(),
      list: "Bar",
    },
    {
      isComplete: false,
      text: "Bar 2",
      createdAt: new Date().toString(),
      dueAt: new Date().toString(),
      list: "Bar",
    },
    {
      isComplete: false,
      text: "Bar 3",
      createdAt: new Date().toString(),
      dueAt: new Date().toString(),
      list: "Bar",
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

  const todo: Todo = {
    isComplete: false,
    text: body.text,
    createdAt: new Date().toString(),
    dueAt: body.dueAt ?? null,
    list: listId,
  }

  if (!(listId in todos)) {
    todos[listId] = []
  }

  todos[listId].push(todo)

  return NextResponse.json(todo)
}

import { Todo } from "@/app/types/Todo"

export async function createTodo({
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
}

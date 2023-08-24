import { Todo } from "@/app/types/Todo"
import { QueryFunctionContext } from "@tanstack/react-query"

export async function getTodos(context: QueryFunctionContext): Promise<Todo[]> {
  const list = context.queryKey[context.queryKey.length - 1]
  return fetch(`http://localhost:3000/api/lists/${list ?? "all"}/todos`, {
    cache: "no-store",
  }).then((res) => res.json())
}

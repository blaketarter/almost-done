import { Todo } from "@/app/types/Todo"
import { QueryFunctionContext } from "@tanstack/react-query"
import groupBy from "lodash/groupBy"

export async function getLists(
  context: QueryFunctionContext,
): Promise<string[]> {
  const list = context.queryKey[context.queryKey.length - 1]
  return fetch(`http://localhost:3000/api/lists/${list ?? "all"}/todos`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((todos) => {
      return ["all", ...Object.keys(groupBy(todos, "list"))]
    })
}

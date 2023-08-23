import TodoLists from "@/app/components/TodoLists"
import { Todo } from "@/app/types/Todo"

async function getData(list = "all"): Promise<Todo[]> {
  const res = await fetch(`http://localhost:3000/api/lists/${list}/todos`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

interface TodosDahsboardProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function TodosDahsboard({
  searchParams,
}: TodosDahsboardProps) {
  const list = (searchParams?.list ?? "all") as string
  const todos = await getData(list)

  return <TodoLists list={list} todos={todos} />
}

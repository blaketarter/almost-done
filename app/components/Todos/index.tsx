import { Todo } from "@/app/types/Todo"

async function getData(): Promise<Todo[]> {
  const res = await fetch("http://localhost:3000/api/lists/all/todos", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Todos() {
  const res = await getData()

  return (
    <>
      {res.map((todo) => (
        <div key={todo.text}>{todo.text}</div>
      ))}
    </>
  )
}

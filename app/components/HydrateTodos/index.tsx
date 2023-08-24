import getQueryClient from "@/app/utils/getQueryClient"
import { getTodos } from "@/app/utils/getTodos"
import { dehydrate, Hydrate } from "@tanstack/react-query"
import { ReactNode } from "react"

export default async function HydratedTodos({
  children,
  list = "all",
}: {
  children: ReactNode
  list?: string
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["todos", list], getTodos)
  const dehydratedState = dehydrate(queryClient)

  return <Hydrate state={dehydratedState}>{children}</Hydrate>
}

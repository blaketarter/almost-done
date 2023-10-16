import Dashboard from "@/app/components/Dashboard"
import HydratedTodos from "@/app/components/HydrateTodos"

interface DashboardPageProps {
  searchParams?: { list?: string }
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const list = searchParams?.list ?? "all"

  return (
    <HydratedTodos list={list}>
      <Dashboard list={list} />
    </HydratedTodos>
  )
}

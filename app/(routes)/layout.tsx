import Nav from "../components/Nav"

export default function Dashboard({
  children,
  todos,
  calendar,
}: {
  children: React.ReactNode
  todos: React.ReactNode
  calendar: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main>
        <section>{todos}</section>
        <section>{calendar}</section>
        {children}
      </main>
    </>
  )
}

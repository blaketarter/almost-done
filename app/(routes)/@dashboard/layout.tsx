import Nav from "@/app/components/Nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}

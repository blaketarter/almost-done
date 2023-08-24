"use client"

interface AppLayoutProps {
  dashboard: React.ReactNode
}

export default function AppLayout({ dashboard }: AppLayoutProps) {
  return <>{dashboard}</>
}

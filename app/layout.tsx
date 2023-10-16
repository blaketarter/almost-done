import "./globals.css"
import type { Metadata } from "next"
import Providers from "./components/Providers"
import font from "@/app/utils/font"

export const metadata: Metadata = {
  title: "Almost Done | Calendar-centric Task App",
  description:
    "Almost Done is a calendar-centric task app that is simple to use.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

import "./globals.css"
import type { Metadata } from "next"
import Providers from "./components/Providers"
import font from "@/app/utils/font"

export const metadata: Metadata = {
  title: "Todo Calendar App",
  description: "WIP",
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

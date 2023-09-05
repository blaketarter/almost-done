import React from "react"
import type { Preview } from "@storybook/react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChakraProvider } from "@chakra-ui/react"
import font from "../app/utils/font"
import theme from "../app/utils/theme"
import { ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
})

export const Providers = ({
  children,
}: {
  children?: ReactNode
}) => {
  return (
    <div className={font.className}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </div>
  )
}


const preview: Preview = {
  decorators: [
    (Story) => (
      <Providers>
        {Story()}
      </Providers>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview

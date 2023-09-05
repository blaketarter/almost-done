import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RenderOptions, render } from "@testing-library/react"
import { ReactElement, ReactNode } from "react"
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context"
import { ChakraProvider } from "@chakra-ui/react"
import font from "@/app/utils/font"
import theme from "@/app/utils/theme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
})

export type AppRouterContextProviderMockProps = {
  router?: Partial<AppRouterInstance>
  children: React.ReactNode
}

export const AppRouterContextProviderMock = ({
  router = {},
  children,
}: AppRouterContextProviderMockProps): React.ReactNode => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  }
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  )
}

const Providers = ({ children }: { children?: ReactNode }) => {
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

beforeEach(() => {
  queryClient.clear()
})

const customRender = (ui: ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }

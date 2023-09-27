import Dashboard from "./index"
import {
  AppRouterContextProviderMock,
  render,
  screen,
  waitFor,
} from "@/app/utils/testUtils"

describe("Dashboard", () => {
  it("renders", async () => {
    // Arrange
    const list = "all"

    // Act
    render(
      <AppRouterContextProviderMock>
        <Dashboard list="all" />
      </AppRouterContextProviderMock>,
    )

    await waitFor(() => expect(screen.getByText("foo")).toBeInTheDocument())

    // Assert
    expect(screen.getByTestId("heading-foo")).toHaveTextContent("foo")
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
    expect(screen.getByText("January 01, 2023")).toBeInTheDocument()
    expect(screen.getByTestId("events")).toHaveTextContent("3")
  })
})

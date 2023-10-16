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

    await waitFor(() =>
      expect(screen.getByTestId("heading-foo")).toBeInTheDocument(),
    )

    // Assert
    expect(screen.getByTestId("heading-foo")).toHaveTextContent("foo")
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
    expect(screen.getByText("January 01, 2023")).toBeInTheDocument()
    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === "You're almost done with 3 tasks this month",
      ),
    ).toBeInTheDocument()
    expect(screen.getByLabelText("foo events due today")).toHaveTextContent("2")
  })
})

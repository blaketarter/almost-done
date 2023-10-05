import TaskSidebar from "./index"
import {
  AppRouterContextProviderMock,
  render,
  screen,
  waitFor,
} from "@/app/utils/testUtils"

describe("TaskSidebar", () => {
  it("renders", async () => {
    // Arrange
    const list = "all"

    // Act
    render(
      <AppRouterContextProviderMock>
        <TaskSidebar list="all" />
      </AppRouterContextProviderMock>,
    )

    await waitFor(() =>
      expect(screen.getByTestId("heading-foo")).toBeInTheDocument(),
    )

    // Assert
    expect(screen.getByText("all")).toBeInTheDocument()
    expect(screen.getByTestId("heading-foo")).toHaveTextContent("foo")
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
  })
})

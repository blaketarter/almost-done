import Nav from "./index"
import {
  AppRouterContextProviderMock,
  render,
  screen,
  waitFor,
} from "@/app/utils/testUtils"
import userEvent from "@testing-library/user-event"

describe("Nav", () => {
  it("renders", async () => {
    // Arrange
    // Act
    render(
      <AppRouterContextProviderMock>
        <Nav />
      </AppRouterContextProviderMock>,
    )

    // Assert
    expect(screen.getByText("Almost Done")).toBeInTheDocument()
  })

  it("changes list on selection", async () => {
    // Arrange
    const replace = jest.fn()

    // Act
    render(
      <AppRouterContextProviderMock router={{ replace }}>
        <Nav />
      </AppRouterContextProviderMock>,
    )

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
    await userEvent.selectOptions(screen.getByLabelText("List"), "foo")

    // Assert
    expect(replace).toHaveBeenCalledWith("?list=foo")
  })
})

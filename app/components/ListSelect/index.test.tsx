import {
  AppRouterContextProviderMock,
  render,
  screen,
  waitFor,
} from "@/app/utils/testUtils"
import ListSelect from "."
import userEvent from "@testing-library/user-event"

describe("ListSelect", () => {
  it("changes list on selection", async () => {
    // Arrange
    const replace = jest.fn()

    // Act
    render(
      <AppRouterContextProviderMock router={{ replace }}>
        <ListSelect />
      </AppRouterContextProviderMock>,
    )

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
    await userEvent.selectOptions(screen.getByLabelText("List"), "foo")

    // Assert
    expect(replace).toHaveBeenCalledWith("?list=foo")
  })
})

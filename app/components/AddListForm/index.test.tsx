import AddListForm from "./index"
import {
  AppRouterContextProviderMock,
  render,
  screen,
} from "@/app/utils/testUtils"
import userEvent from "@testing-library/user-event"

describe("AddListForm", () => {
  it("renders", async () => {
    // Arrange
    // Act
    render(<AddListForm />)

    // Assert
    expect(screen.getByLabelText("List name")).toBeInTheDocument()
    expect(screen.getByText("Create")).toBeInTheDocument()
  })

  it("calls onSuccess", async () => {
    // Arrange
    const onSuccess = jest.fn()

    // Act
    render(<AddListForm onSuccess={onSuccess} />)

    const input = screen.getByLabelText("List name")
    const button = screen.getByText("Create")

    await userEvent.type(input, "Test List")
    await userEvent.click(button)

    // Assert
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })
})

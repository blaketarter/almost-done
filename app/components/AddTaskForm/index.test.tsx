import AddTaskForm from "./index"
import { render, screen } from "@/app/utils/testUtils"
import userEvent from "@testing-library/user-event"

describe("AddTaskForm", () => {
  it("renders", async () => {
    // Arrange
    // Act
    render(<AddTaskForm />)

    // Assert
    expect(screen.getByLabelText("Task name")).toBeInTheDocument()
    expect(screen.getByLabelText("Task due date")).toBeInTheDocument()
    expect(screen.getByLabelText("Task list")).toBeInTheDocument()
    expect(screen.getByText("Add")).toBeInTheDocument()
  })

  it("calls onSuccess", async () => {
    // Arrange
    const onSuccess = jest.fn()

    // Act
    render(<AddTaskForm onSuccess={onSuccess} />)

    const input = screen.getByLabelText("Task name")
    const button = screen.getByText("Add")
    const select = screen.getByText("Assign list")

    await userEvent.type(input, "Test Task")
    await userEvent.click(select)
    await userEvent.click(screen.getByText("foo"))
    await userEvent.click(button)

    // Assert
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })
})

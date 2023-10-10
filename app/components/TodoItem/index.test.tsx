import TodoItem from "./index"
import { render, screen, waitFor } from "@/app/utils/testUtils"
import userEvent from "@testing-library/user-event"

describe("TodoItem", () => {
  it("renders", () => {
    // Arrange
    const todo = {
      id: "1",
      text: "Foo 1",
      dueAt: "2023-01-01",
      createdAt: "2023-01-01",
      isComplete: false,
    }

    // Act
    render(<TodoItem todo={todo} />)

    // Assert
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
    expect(screen.getByLabelText("Complete")).not.toBeChecked()
  })

  it("renders completed", async () => {
    // Arrange
    const todo = {
      id: "1",
      text: "Foo 1",
      dueAt: "2023-01-01",
      createdAt: "2023-01-01",
      isComplete: true,
    }

    // Act
    render(<TodoItem todo={todo} />)

    // Assert
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
    expect(screen.getByLabelText("Complete")).toBeChecked()
  })

  it.skip("can be edited", async () => {
    // Arrange
    const todo = {
      id: "1",
      text: "Foo 1",
      dueAt: "2023-01-01",
      createdAt: "2023-01-01",
      isComplete: false,
    }
    const onChange = jest.fn()

    // Act
    render(<TodoItem todo={todo} onChange={onChange} />)
    await userEvent.click(screen.getByText("Foo 1"))
    await userEvent.keyboard("Bar 1")

    // Assert
    expect(onChange).toBeCalledWith({
      id: "1",
      text: "Bar 1",
      dueAt: "2023-01-01",
      createdAt: "2023-01-01",
      isComplete: false,
    })
  })
})

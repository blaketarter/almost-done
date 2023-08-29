import TodoList from "./index"
import { render, screen } from "@/app/utils/testUtils"

describe("TodoList", () => {
  it("renders", () => {
    // Arrange
    const list = "foo"
    const todos = [
      {
        id: "1",
        text: "Foo 1",
        dueAt: "2023-01-01",
        createdAt: "2023-01-01",
        isComplete: false,
      },
    ]

    // Act
    render(<TodoList list={list} todos={todos} />)

    // Assert
    expect(screen.getByText("foo")).toBeInTheDocument()
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
  })
})

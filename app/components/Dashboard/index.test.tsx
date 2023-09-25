import Dashboard from "./index"
import { render, screen, waitFor } from "@/app/utils/testUtils"

describe("Dashboard", () => {
  it("renders", async () => {
    // Arrange
    const list = "all"

    // Act
    render(<Dashboard list="all" />)

    await waitFor(() => expect(screen.getByText("foo")).toBeInTheDocument())

    // Assert
    expect(screen.getByText("foo")).toBeInTheDocument()
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
    expect(screen.getByText("January 01, 2023")).toBeInTheDocument()
    expect(screen.getByTestId("events")).toHaveTextContent("3")
  })
})

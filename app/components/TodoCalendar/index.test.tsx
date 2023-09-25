import TodoCalendar from "./index"
import { render, screen, waitFor } from "@/app/utils/testUtils"

describe("TodoCalendar", () => {
  it("renders", () => {
    // Arrange

    // Act
    render(<TodoCalendar />)

    // Assert
    expect(screen.getByText("January 01, 2023")).toBeInTheDocument()
  })

  it("renders events", async () => {
    // Arrange
    const list = "foo"

    // Act
    render(<TodoCalendar list={list} />)

    await waitFor(() =>
      expect(screen.getByTestId("events")).toBeInTheDocument(),
    )

    // Assert
    expect(screen.getByTestId("events")).toHaveTextContent("2")
  })
})

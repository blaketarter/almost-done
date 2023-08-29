import TodoLists from "./index"
import { render, screen, waitFor } from "@/app/utils/testUtils"

describe("TodoLists", () => {
  it("renders", async () => {
    // Arrange
    const list = "all"
    // Act
    render(<TodoLists list={list} />)

    await waitFor(() => expect(screen.getByText("foo")).toBeInTheDocument())

    // Assert
    expect(screen.getByText("foo")).toBeInTheDocument()
    expect(screen.getByText("Foo 1")).toBeInTheDocument()
  })

  it("renders a single list", async () => {
    // Arrange
    const list = "bar"
    // Act
    render(<TodoLists list={list} />)

    await waitFor(() => expect(screen.getByText("bar")).toBeInTheDocument())

    // Assert
    expect(screen.getByText("bar")).toBeInTheDocument()
    expect(screen.queryByText("Foo 1")).not.toBeInTheDocument()
  })
})

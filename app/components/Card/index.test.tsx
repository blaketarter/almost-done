import Card from "./index"
import { render, screen } from "@/app/utils/testUtils"

describe("Card", () => {
  it("renders", async () => {
    // Arrange
    // Act
    render(<Card>Foo</Card>)

    // Assert
    expect(screen.getByText("Foo")).toBeInTheDocument()
  })
})

import Nav from "./index"
import {
  AppRouterContextProviderMock,
  render,
  screen,
} from "@/app/utils/testUtils"

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
})

import getCurrentDate from "@/app/utils/getCurrentDate"
import Calendar from "./index"
import { render, screen } from "@/app/utils/testUtils"
import userEvent from "@testing-library/user-event"

describe("Calendar", () => {
  it("renders", () => {
    // Arrange

    // Act
    render(<Calendar />)

    // Assert
    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.getByText("January 2023")).toBeInTheDocument()
    expect(screen.getByText("Sun")).toBeInTheDocument()
    expect(screen.getByText("Mon")).toBeInTheDocument()
    expect(screen.getByText("Tue")).toBeInTheDocument()
    expect(screen.getByText("Wed")).toBeInTheDocument()
    expect(screen.getByText("Thu")).toBeInTheDocument()
    expect(screen.getByText("Fri")).toBeInTheDocument()
    expect(screen.getByText("Sat")).toBeInTheDocument()
  })

  it("renders events", () => {
    // Arrange
    const events = [
      { id: "1", date: getCurrentDate() },
      { id: "2", date: getCurrentDate() },
    ]

    // Act
    render(<Calendar events={events} />)

    // Assert
    expect(screen.getByTestId("events")).toHaveTextContent("2")
  })

  it("previous month button works", async () => {
    // Arrange
    const events = [
      { id: "1", date: getCurrentDate() },
      { id: "2", date: getCurrentDate() },
    ]

    // Act
    render(<Calendar events={events} />)

    const previous = screen.getByLabelText("Previous Month")

    await userEvent.click(previous)

    // Assert
    expect(screen.getByText("December 2022")).toBeInTheDocument()
  })

  it("next month button works", async () => {
    // Arrange
    const events = [
      { id: "1", date: getCurrentDate() },
      { id: "2", date: getCurrentDate() },
    ]

    // Act
    render(<Calendar events={events} />)

    const next = screen.getByLabelText("Next Month")

    await userEvent.click(next)

    // Assert
    expect(screen.getByText("February 2023")).toBeInTheDocument()
  })

  it("today button works", async () => {
    // Arrange
    const events = [
      { id: "1", date: getCurrentDate() },
      { id: "2", date: getCurrentDate() },
    ]

    // Act
    render(<Calendar events={events} />)

    const next = screen.getByLabelText("Next Month")
    const today = screen.getByText("Today")

    await userEvent.click(next)
    await userEvent.click(today)

    // Assert
    expect(screen.getByText("January 2023")).toBeInTheDocument()
  })
})

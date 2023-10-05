import getCurrentDate from "@/app/utils/getCurrentDate"
import Calendar from "./index"
import { render, screen, waitFor } from "@/app/utils/testUtils"
import userEvent from "@testing-library/user-event"

describe("Calendar", () => {
  it("renders", () => {
    // Arrange

    // Act
    render(<Calendar />)

    // Assert
    expect(screen.getByText("Today")).toBeInTheDocument()
    expect(screen.getByText("January 01, 2023")).toBeInTheDocument()
    expect(screen.getByText("Sunday")).toBeInTheDocument()
    expect(screen.getByText("Monday")).toBeInTheDocument()
    expect(screen.getByText("Tuesday")).toBeInTheDocument()
    expect(screen.getByText("Wednesday")).toBeInTheDocument()
    expect(screen.getByText("Thursday")).toBeInTheDocument()
    expect(screen.getByText("Friday")).toBeInTheDocument()
    expect(screen.getByText("Saturday")).toBeInTheDocument()
  })

  it("renders events", () => {
    // Arrange
    const events = [
      {
        id: "1",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 1",
        groupTitle: "Test Data",
      },
      {
        id: "2",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 2",
        groupTitle: "Test Data",
      },
    ]

    // Act
    render(<Calendar events={events} />)

    // Assert
    expect(
      screen.getByLabelText("Test Data events due today"),
    ).toHaveTextContent("2")
  })

  it("previous month button works", async () => {
    // Arrange
    const events = [
      {
        id: "1",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 1",
        groupTitle: "Test Data",
      },
      {
        id: "2",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 2",
        groupTitle: "Test Data",
      },
    ]

    // Act
    render(<Calendar events={events} />)

    const previous = screen.getByLabelText("Previous Month")

    await userEvent.click(previous)

    // Assert
    expect(screen.getByText("December")).toBeInTheDocument()
  })

  it("next month button works", async () => {
    // Arrange
    const events = [
      {
        id: "1",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 1",
        groupTitle: "Test Data",
      },
      {
        id: "2",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 2",
        groupTitle: "Test Data",
      },
    ]

    // Act
    render(<Calendar events={events} />)

    const next = screen.getByLabelText("Next Month")

    await userEvent.click(next)

    // Assert
    expect(screen.getByText("February")).toBeInTheDocument()
  })

  it("today button works", async () => {
    // Arrange
    const events = [
      {
        id: "1",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 1",
        groupTitle: "Test Data",
      },
      {
        id: "2",
        date: getCurrentDate(),
        color: "#ffffff",
        text: "foo 2",
        groupTitle: "Test Data",
      },
    ]

    // Act
    render(<Calendar events={events} />)

    const next = screen.getByLabelText("Next Month")
    const today = screen.getByText("Today")

    await userEvent.click(next)
    await userEvent.click(today)

    // Assert
    expect(screen.getByText("January")).toBeInTheDocument()
  })
})

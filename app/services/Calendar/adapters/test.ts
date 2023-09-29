import { CalendarServiceAdapter } from ".."

let activeDate = new Date("2023/01/01")

export const TestCalendarServiceAdapter: CalendarServiceAdapter = {
  getCurrentDate: function () {
    return new Date("2023/01/01")
  },
  getActiveDate: function () {
    return activeDate
  },
  setActiveDate: function (nextDate: Date) {
    activeDate = nextDate
    return Promise.resolve(activeDate)
  },
}

import { ProductionCalendarServiceAdapter } from "./adapters/production"
import { TestCalendarServiceAdapter } from "./adapters/test"

export interface CalendarServiceAdapter {
  getCurrentDate: () => Date
  getActiveDate: () => Date
  setActiveDate: (newDate: Date) => Promise<Date>
}

export class CalendarService {
  adapater: CalendarServiceAdapter

  constructor(adapater: CalendarServiceAdapter) {
    this.adapater = adapater

    this.getCurrentDate = this.getCurrentDate.bind(this)
    this.getActiveDate = this.getActiveDate.bind(this)
    this.setActiveDate = this.setActiveDate.bind(this)
  }

  getCurrentDate() {
    return this.adapater.getCurrentDate()
  }

  getActiveDate() {
    return this.adapater.getActiveDate()
  }

  setActiveDate(newDate: Date) {
    return this.adapater.setActiveDate(newDate)
  }
}

export const productionCalendarService = new CalendarService(
  ProductionCalendarServiceAdapter,
)
export const testCalendarService = new CalendarService(
  TestCalendarServiceAdapter,
)

export function getCalendarService(env = process.env.NEXT_PUBLIC_ENV) {
  switch (env) {
    case "production":
      return productionCalendarService
    case "development":
      return productionCalendarService
    case "test":
      return testCalendarService
    default:
      return testCalendarService
  }
}

const DefaultCalendarService = getCalendarService(process.env.NEXT_PUBLIC_ENV)
export default DefaultCalendarService

"use client"

import { CalendarServiceAdapter } from ".."

export const ProductionCalendarServiceAdapter: CalendarServiceAdapter = {
  getCurrentDate: function () {
    return new Date()
  },
  getActiveDate: function () {
    if (typeof window === "undefined") {
      return new Date()
    }

    return new Date(sessionStorage.getItem("activeDate") ?? new Date())
  },
  setActiveDate: function (newDate: Date) {
    sessionStorage.setItem("activeDate", newDate.toString())
    return Promise.resolve(newDate)
  },
}

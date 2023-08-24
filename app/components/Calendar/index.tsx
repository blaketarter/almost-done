"use client"

import {
  format,
  startOfWeek,
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  differenceInWeeks,
} from "date-fns"
import { Fragment, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import classNames from "classnames"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import styles from "./index.module.css"
import { CalendarEvent } from "@/app/types/CalendarEvent"

const getHeader = (
  activeDate: Date,
  setActiveDate: (newActiveDate: Date) => unknown,
) => {
  return (
    <div className="header">
      <div className="todayButton" onClick={() => setActiveDate(new Date())}>
        Today
      </div>
      <ChevronLeftIcon
        className="navIcon"
        onClick={() => setActiveDate(addMonths(activeDate, -1))}
      />
      <ChevronRightIcon
        className="navIcon"
        onClick={() => setActiveDate(addMonths(activeDate, 1))}
      />
      <h2 className="currentMonth">{format(activeDate, "MMMM yyyy")}</h2>
    </div>
  )
}

const getWeekDaysNames = (activeDate: Date) => {
  const weekStartDate = startOfWeek(activeDate)

  return (
    <Grid templateColumns="repeat(7, 1fr)" className="weekContainer">
      {Array.from({ length: 7 }).map((_, day) => {
        const dayName = format(addDays(weekStartDate, day), "E")

        return (
          <GridItem
            key={dayName}
            h="50px"
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="day weekNames"
          >
            {dayName}
          </GridItem>
        )
      })}
    </Grid>
  )
}

const generateDatesForCurrentWeek = (
  date: Date,
  selectedDate: Date,
  activeDate: Date,
  events: CalendarEvent[],
  setSelectedDate: (newSelectedDate: Date) => unknown,
) => {
  const today = new Date()
  return (
    <>
      {Array.from({ length: 7 }).map((_, day) => {
        const currentDate = addDays(date, day)
        const currentDateEvents = events.filter((event) =>
          isSameDay(event.date, currentDate),
        )

        return (
          <GridItem
            h="50px"
            w="50px"
            position="relative"
            key={day}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classNames("day", {
              [styles.inactiveDay]: !isSameMonth(currentDate, activeDate),
              [styles.selectedDay]: isSameDay(currentDate, selectedDate),
              [styles.today]: isSameDay(currentDate, today),
            })}
            onClick={() => setSelectedDate(currentDate)}
          >
            <Box>{format(currentDate, "d")}</Box>
            {currentDateEvents.length ? (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, 100%)"
                background="cornflowerblue"
                h="10px"
                w="10px"
                color="white"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="8px"
              >
                {currentDateEvents.length}
              </Box>
            ) : null}
          </GridItem>
        )
      })}
    </>
  )
}

const getDates = (
  selectedDate: Date,
  activeDate: Date,
  events: CalendarEvent[],
  setSelectedDate: (newSelectedDate: Date) => unknown,
) => {
  const startOfTheSelectedMonth = startOfMonth(activeDate)
  const endOfTheSelectedMonth = endOfMonth(activeDate)
  const startDate = startOfWeek(startOfTheSelectedMonth)
  const endDate = endOfWeek(endOfTheSelectedMonth)

  return (
    <Grid templateColumns="repeat(7, 1fr)" className="weekContainer">
      {Array.from({
        length: differenceInWeeks(endDate, startDate, {
          roundingMethod: "ceil",
        }),
      }).map((_, week) => {
        const currentDate = addDays(startDate, 7 * week)
        return (
          <Fragment key={week}>
            {generateDatesForCurrentWeek(
              currentDate,
              selectedDate,
              activeDate,
              events,
              setSelectedDate,
            )}
          </Fragment>
        )
      })}
    </Grid>
  )
}

interface CalendarProps {
  events?: CalendarEvent[]
}

export default function Calendar({ events = [] }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())

  return (
    <section>
      {getHeader(activeDate, setActiveDate)}
      {getWeekDaysNames(activeDate)}
      {getDates(selectedDate, activeDate, events, setSelectedDate)}
    </section>
  )
}

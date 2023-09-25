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
import { TriangleUpIcon } from "@chakra-ui/icons"
import classNames from "classnames"
import { Box, Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react"
import styles from "./index.module.css"
import { CalendarEvent } from "@/app/types/CalendarEvent"
import getCurrentDate from "@/app/utils/getCurrentDate"
import { LightButton } from "../Button"
import { TypographyHeading, TypographyText } from "../Typography"
import Card from "../Card"

const getHeader = (
  activeDate: Date,
  setActiveDate: (newActiveDate: Date) => unknown,
) => {
  return (
    <HStack spacing="14px">
      <Card h="84px">
        <VStack spacing="0" alignItems="flex-start" h="100%">
          <TypographyText variant="bodyLarge" fontWeight="400">
            Today is <strong>{format(activeDate, "MMMM dd, yyyy")}</strong>
          </TypographyText>
          <TypographyText variant="label" fontWeight="400">
            Almost done with <strong>0</strong> tasks this month!
          </TypographyText>
        </VStack>
      </Card>
      <Card h="84px">
        <HStack spacing="46px" h="100%">
          <LightButton
            padding="0px 14px"
            height="28px"
            margin="0 14px"
            onClick={() => setActiveDate(getCurrentDate())}
          >
            Today
          </LightButton>
          <Flex alignItems="center">
            <TriangleUpIcon
              className="navIcon"
              aria-label="Previous Month"
              transform="rotate(-90deg)"
              height="18px"
              width="18px"
              cursor="pointer"
              onClick={() => setActiveDate(addMonths(activeDate, -1))}
            />
            <TypographyHeading
              variant="h2"
              className="currentMonth"
              display="inline-block"
              margin="0 14px"
            >
              {format(activeDate, "MMMM")}
            </TypographyHeading>
            <TriangleUpIcon
              className="navIcon"
              aria-label="Next Month"
              transform="rotate(90deg)"
              height="18px"
              width="18px"
              cursor="pointer"
              onClick={() => setActiveDate(addMonths(activeDate, 1))}
            />
          </Flex>
        </HStack>
      </Card>
    </HStack>
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
            <TypographyText variant="label" fontSize="14px" fontWeight="400">
              {dayName}
            </TypographyText>
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
  const today = getCurrentDate()
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
            <Box>
              <TypographyText variant="bodyLarge">
                {format(currentDate, "d")}
              </TypographyText>
            </Box>
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
                data-testid="events"
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
  const [selectedDate, setSelectedDate] = useState(getCurrentDate())
  const [activeDate, setActiveDate] = useState(getCurrentDate())

  return (
    <section>
      {getHeader(activeDate, setActiveDate)}
      {getWeekDaysNames(activeDate)}
      {getDates(selectedDate, activeDate, events, setSelectedDate)}
    </section>
  )
}

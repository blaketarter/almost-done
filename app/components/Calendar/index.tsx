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
  events: CalendarEvent[],
  setActiveDate: (newActiveDate: Date) => unknown,
) => {
  const currentDate = getCurrentDate()
  const currentDateEvents = events.filter((event) =>
    isSameMonth(event.date, currentDate),
  )
  return (
    <Flex gap="14px" dir="row" mb="22px">
      <Card h="84px" flexShrink="0" flexBasis="350px">
        <VStack spacing="0" alignItems="flex-start" h="100%">
          <TypographyText variant="bodyLarge" fontWeight="400">
            Today is <strong>{format(currentDate, "MMMM dd, yyyy")}</strong>
          </TypographyText>
          <TypographyText variant="label" fontWeight="400">
            Almost done with <strong>{currentDateEvents.length}</strong> tasks
            this month
          </TypographyText>
        </VStack>
      </Card>
      <Card h="84px" flexBasis="100%">
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
              w="160px"
              textAlign="center"
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
    </Flex>
  )
}

const getWeekDaysNames = (activeDate: Date) => {
  const weekStartDate = startOfWeek(activeDate)

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      className="weekContainer"
      h="22px"
      borderBottomWidth="1px"
      borderBottomColor="lightGrey"
      background="lightGrey"
      gridGap="1px"
    >
      {Array.from({ length: 7 }).map((_, day) => {
        const dayName = format(addDays(weekStartDate, day), "eeee")

        return (
          <GridItem
            key={dayName}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="day weekNames"
            background="offWhite"
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
        const isToday = isSameDay(currentDate, today)

        return (
          <GridItem
            background={isToday ? "offWhite" : "white"}
            position="relative"
            key={day}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classNames("day", {
              [styles.inactiveDay]: !isSameMonth(currentDate, activeDate),
              [styles.selectedDay]: isSameDay(currentDate, selectedDate),
            })}
            onClick={() => setSelectedDate(currentDate)}
          >
            <Box position="absolute" top="8px" left="8px">
              <TypographyText
                variant="bodyLarge"
                fontWeight={isToday ? 600 : 400}
                fontSize="32px"
              >
                {format(currentDate, "d")}
              </TypographyText>
            </Box>
            {currentDateEvents.length ? (
              <Box
                position="absolute"
                bottom="8px"
                right="8px"
                background="brand.500"
                h="18px"
                w="18px"
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
  const numberOfWeeks = differenceInWeeks(endDate, startDate, {
    roundingMethod: "ceil",
  })

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      templateRows={`repeat(${numberOfWeeks}, 1fr)`}
      className="weekContainer"
      h="100%"
      background="lightGrey"
      gridGap="1px"
    >
      {Array.from({
        length: numberOfWeeks,
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
    <VStack h="100%" alignItems="stretch">
      {getHeader(activeDate, events, setActiveDate)}
      <VStack
        borderWidth="2px"
        borderColor="lightGrey"
        borderRadius="6px"
        flexBasis="100%"
        alignItems="stretch"
        gap="0"
      >
        {getWeekDaysNames(activeDate)}
        {getDates(selectedDate, activeDate, events, setSelectedDate)}
      </VStack>
    </VStack>
  )
}

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
import { Fragment } from "react"
import { TriangleUpIcon } from "@chakra-ui/icons"
import { Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react"
import { CalendarEvent } from "@/app/types/CalendarEvent"
import { LightButton } from "../Button"
import { TypographyHeading, TypographyText } from "../Typography"
import Card from "../Card"
import { useActiveDate, useCurrentDate } from "@/app/utils/useCalendarDates"
import CalendarDay from "../CalendarDay"

const getHeader = ({
  activeDate,
  currentDate,
  events,
  setActiveDate,
}: {
  activeDate: Date | undefined
  currentDate: Date
  events: CalendarEvent[]
  setActiveDate: (newActiveDate: Date) => unknown
}) => {
  const currentDateEvents = events.filter((event) =>
    isSameMonth(event.date, currentDate),
  )
  return (
    <Flex gap="14px" dir="row" mb="22px">
      <Card h="84px" flexShrink="0" flexBasis="360px">
        <VStack spacing="0" alignItems="flex-start" h="100%">
          <TypographyText variant="bodyLarge" fontWeight="400">
            Today is <strong>{format(currentDate, "MMMM dd, yyyy")}</strong>
          </TypographyText>
          <TypographyText variant="label" fontWeight="400">
            You&apos;re almost done with{" "}
            <strong>{currentDateEvents.length}</strong> tasks this month
          </TypographyText>
        </VStack>
      </Card>
      <Card h="84px" flexBasis="100%">
        <HStack spacing="46px" h="100%">
          <LightButton
            padding="0px 14px"
            height="28px"
            margin="0 14px"
            onClick={() => setActiveDate(currentDate)}
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
              onClick={
                activeDate
                  ? () => setActiveDate(addMonths(activeDate, -1))
                  : undefined
              }
            />
            <TypographyHeading
              variant="h2"
              className="currentMonth"
              display="inline-block"
              margin="0 14px"
              w="160px"
              textAlign="center"
            >
              {activeDate ? format(activeDate, "MMMM") : null}
            </TypographyHeading>
            <TriangleUpIcon
              className="navIcon"
              aria-label="Next Month"
              transform="rotate(90deg)"
              height="18px"
              width="18px"
              cursor="pointer"
              onClick={
                activeDate
                  ? () => setActiveDate(addMonths(activeDate, 1))
                  : undefined
              }
            />
          </Flex>
        </HStack>
      </Card>
    </Flex>
  )
}

const getWeekDaysNames = ({ currentDate }: { currentDate: Date }) => {
  const weekStartDate = startOfWeek(currentDate)

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

const generateDatesForCurrentWeek = ({
  date,
  currentDate,
  activeDate,
  events,
}: {
  date: Date
  currentDate: Date
  activeDate: Date
  events: CalendarEvent[]
}) => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, day) => {
        const dateToRender = addDays(date, day)
        const dateToRenderEvents = events.filter((event) =>
          isSameDay(event.date, dateToRender),
        )
        const isToday = isSameDay(dateToRender, currentDate)

        return (
          <CalendarDay
            key={format(dateToRender, "yyyy-MM-dd")}
            isToday={isToday}
            date={dateToRender}
            isActive={isSameMonth(dateToRender, activeDate)}
            events={dateToRenderEvents}
          />
        )
      })}
    </>
  )
}

const getDates = ({
  currentDate,
  activeDate,
  events,
}: {
  currentDate: Date
  activeDate: Date
  events: CalendarEvent[]
}) => {
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
        const date = addDays(startDate, 7 * week)
        return (
          <Fragment key={week}>
            {generateDatesForCurrentWeek({
              date,
              currentDate,
              activeDate,
              events,
            })}
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
  const currentDate = useCurrentDate()
  const [activeDate, setActiveDate] = useActiveDate()

  return (
    <VStack h="100%" alignItems="stretch">
      {getHeader({ currentDate, activeDate, events, setActiveDate })}
      <VStack
        borderWidth="2px"
        borderColor="lightGrey"
        borderRadius="6px"
        flexBasis="100%"
        alignItems="stretch"
        gap="0"
      >
        {getWeekDaysNames({ currentDate })}
        {activeDate ? getDates({ currentDate, activeDate, events }) : null}
      </VStack>
    </VStack>
  )
}

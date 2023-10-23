import styles from "./index.module.css"
import { Box, GridItem, HStack } from "@chakra-ui/react"
import classNames from "classnames"
import { format } from "date-fns"
import { TypographyText } from "../Typography"
import groupBy from "lodash/groupBy"
import Tooltip from "../Tooltip"
import CreateFlow from "../CreateFlow"
import { CalendarEvent } from "@/app/types/CalendarEvent"
import { useState } from "react"

interface CalendarProps {
  date: Date
  isToday?: boolean
  isActive?: boolean
  events?: CalendarEvent[]
}

export default function CalendarDay({
  isToday,
  isActive,
  events,
  date,
}: CalendarProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const showCreateFlow = isHovering || isOpen

  return (
    <GridItem
      background={isToday ? "offWhite" : "white"}
      border={isToday ? "1px solid" : "initial"}
      borderColor="brand.500"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={classNames("day", {
        [styles.inactiveDay]: !isActive,
      })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box position="absolute" top="8px" left="8px">
        <TypographyText
          color={isToday ? "brand.500" : undefined}
          variant="bodyLarge"
          fontWeight={isToday ? 600 : 400}
          fontSize="32px"
        >
          {format(date, "d")}
        </TypographyText>
      </Box>
      <Box
        top="50%"
        left="50%"
        transition=".2s ease"
        userSelect={showCreateFlow ? "auto" : "none"}
        opacity={showCreateFlow ? "1" : "0"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CreateFlow
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          hideListFlow={true}
          defaultTaskValues={{ dueAt: format(date, "yyyy-MM-dd") }}
        />
      </Box>
      <HStack position="absolute" bottom="8px" right="8px">
        {events?.length
          ? Object.entries(groupBy(events, "color")).map(
              ([color, eventsToRender]) =>
                eventsToRender.length ? (
                  <Tooltip
                    key={color}
                    text={eventsToRender.reduce(
                      (text, event, i) =>
                        text + (i !== 0 ? "\n" : "") + "• " + event.text,
                      "",
                    )}
                  >
                    <Box
                      aria-label={
                        (eventsToRender[0]?.groupTitle
                          ? eventsToRender[0]?.groupTitle + " events"
                          : "Events") + " due today"
                      }
                      background={color ?? "brand.500"}
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
                      {eventsToRender.length}
                    </Box>
                  </Tooltip>
                ) : null,
            )
          : null}
      </HStack>
    </GridItem>
  )
}

import { Box, VStack } from "@chakra-ui/react"
import { DarkButton, FobButton } from "../Button"
import { AddIcon } from "@chakra-ui/icons"
import Card from "../Card"
import AddTaskForm from "../AddTaskForm"
import AddListForm from "../AddListForm"
import { useState } from "react"

export default function CreateFlow() {
  const [modeSelect, setModeSelect] = useState(false)
  const [mode, setMode] = useState<"task" | "list" | null>(null)

  return (
    <Box position="relative">
      <FobButton
        zIndex="10"
        onClick={() => {
          if (typeof mode === "string") {
            setMode(null)
          } else {
            setModeSelect((state) => !state)
          }
        }}
      >
        <AddIcon
          transition=".5s ease"
          transform={
            modeSelect || typeof mode === "string"
              ? "rotate(135deg)"
              : "rotate(0deg)"
          }
        />
      </FobButton>
      <Card
        position="absolute"
        top="60px"
        left="0"
        zIndex="1000"
        background="white"
        transition="width .5s ease, height .25s ease, opacity .2s ease"
        w={typeof mode === "string" ? "420px" : modeSelect ? "160px" : "160px"}
        h={
          modeSelect || mode === "task"
            ? "132px"
            : mode === "list"
            ? "68px"
            : "0px"
        }
        opacity={modeSelect || typeof mode === "string" ? "1" : "0"}
        userSelect={modeSelect || typeof mode === "string" ? "auto" : "none"}
        overflow="hidden"
      >
        <>
          {modeSelect === true ? (
            <VStack alignItems="stretch" gap="24px">
              <DarkButton
                p="4px 8px"
                onClick={() => {
                  setModeSelect(false)
                  setMode("task")
                }}
              >
                Add Task
              </DarkButton>
              <DarkButton
                onClick={() => {
                  setModeSelect(false)
                  setMode("list")
                }}
              >
                Create List
              </DarkButton>
            </VStack>
          ) : null}
          {mode === "task" ? (
            <AddTaskForm
              onSuccess={() => {
                setMode(null)
              }}
            />
          ) : null}
          {mode === "list" ? (
            <AddListForm
              onSuccess={() => {
                setMode(null)
              }}
            />
          ) : null}
        </>
      </Card>
    </Box>
  )
}

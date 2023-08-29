"use client"
import apiService from "@/app/services/API"
import { Box, HStack, Heading, Select } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Nav() {
  const searchParams = useSearchParams()
  const list = searchParams?.get("list") ?? "all"

  const router = useRouter()
  const pathname = usePathname()

  const { data } = useQuery<string[]>({
    queryKey: ["lists", "all"],
    queryFn: apiService.getLists,
  })

  return (
    <nav>
      <HStack>
        <Heading as="h1">Almost Done</Heading>
        <Box w="200px">
          <Select
            aria-label="List"
            defaultValue={list}
            onChange={(e) => {
              router.replace(
                `${pathname?.split("?")?.[0] ?? ""}?list=${e.target.value}`,
              )
            }}
          >
            {data?.length ? (
              data.map((list) => (
                <option key={list} value={list}>
                  {list}
                </option>
              ))
            ) : (
              <option key={list} value={list}>
                {list}
              </option>
            )}
          </Select>
        </Box>
      </HStack>
    </nav>
  )
}

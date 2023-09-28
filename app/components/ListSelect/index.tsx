import apiService from "@/app/services/API"
import { List } from "@/app/types/List"
import { Box, Select } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function ListSelect() {
  const searchParams = useSearchParams()
  const list = searchParams?.get("list") ?? "all"

  const router = useRouter()
  const pathname = usePathname()

  const { data } = useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: apiService.getLists,
  })

  return (
    <Box w="200px">
      <Select
        variant="darkPrimary"
        aria-label="List"
        defaultValue={list}
        onChange={(e) => {
          router.replace(
            `${pathname?.split("?")?.[0] ?? ""}?list=${e.target.value}`,
          )
        }}
      >
        <option key="option-all" value="all" data-testid="option-all">
          all
        </option>
        {data?.length ? (
          data.map((list) => (
            <option
              key={list.name}
              value={list.name}
              data-testid={"option-" + list.name}
            >
              {list.name}
            </option>
          ))
        ) : (
          <option key={list} value={list}>
            {list}
          </option>
        )}
      </Select>
    </Box>
  )
}

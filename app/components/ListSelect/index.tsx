import apiService from "@/app/services/API"
import { List } from "@/app/types/List"
import { Box, SelectProps } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { DarkSelect } from "../Select"

interface ListSelectProps extends SelectProps {
  defaultToAll?: boolean
  placeholder?: string
}

export default function ListSelect({
  defaultToAll = true,
  placeholder,
  ...props
}: ListSelectProps) {
  const { data } = useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: apiService.getLists,
  })

  return (
    <Box w="200px">
      <DarkSelect aria-label="List" {...props}>
        {defaultToAll ? (
          <option key="option-all" value="all" data-testid="option-all">
            All
          </option>
        ) : (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
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
        ) : props.defaultValue ? (
          <option key={String(props.defaultValue)} value={props.defaultValue}>
            {props.defaultValue}
          </option>
        ) : props.value ? (
          <option key={String(props.value)} value={props.value}>
            {props.value}
          </option>
        ) : null}
      </DarkSelect>
    </Box>
  )
}

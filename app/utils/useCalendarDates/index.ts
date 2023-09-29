import calendarService from "@/app/services/Calendar"
import getCurrentDate from "../getCurrentDate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useCurrentDate() {
  const { data: currentDate } = useQuery<Date>({
    queryKey: ["currentDate"],
    queryFn: calendarService.getCurrentDate,
    initialData: getCurrentDate(),
  })

  return currentDate
}

export function useActiveDate() {
  const queryClient = useQueryClient()

  const { data: activeDate } = useQuery<Date>({
    queryKey: ["activeDate"],
    queryFn: calendarService.getActiveDate,
    initialData: calendarService.getActiveDate(),
  })

  const { mutate: setActiveDate } = useMutation({
    mutationFn: calendarService.setActiveDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeDate"] })
    },
  })

  return [activeDate, setActiveDate] as const
}
